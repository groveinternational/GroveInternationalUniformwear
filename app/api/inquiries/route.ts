import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { resend } from '@/lib/resend';
import { confirmationEmail } from '@/lib/emails/confirmationEmail';
import { adminNotificationEmail } from '@/lib/emails/adminNotificationEmail';

const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  phone: z.string().optional(),
  schoolName: z.string().optional(),
  message: z.string().min(1, 'Message must be provided'),
  productId: z.string().optional(),
  quantity: z.number().positive().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Validation
    const validationResult = inquirySchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // 2. Save to Inquiry table via Prisma
    const newInquiry = await prisma.inquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        schoolName: data.schoolName,
        message: data.message,
        productId: data.productId,
        quantity: data.quantity,
      },
    });

    // 3. Send Emails
    const adminEmail = process.env.ADMIN_EMAIL;
    // TODO: Change to company domain once DNS verified in Resend dashboard
    const fromAddress = 'Grove International <onboarding@resend.dev>';

    try {
      // User confirmation
      await resend.emails.send({
        from: fromAddress,
        to: data.email,
        subject: 'We received your inquiry — Grove International',
        html: confirmationEmail(data),
      });

      // Admin notification
      if (adminEmail) {
        await resend.emails.send({
          from: fromAddress,
          to: adminEmail,
          subject: `New Inquiry: ${data.name} — ${data.schoolName || 'General'}`,
          html: adminNotificationEmail(data),
        });
      }
    } catch (emailError) {
      console.error('Failed to send emails via Resend:', emailError);
      // We do not throw here to avoid failing the request if email sending fails
    }

    // 4. Return success response
    return NextResponse.json(
      { success: true, id: newInquiry.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
