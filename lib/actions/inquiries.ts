'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getInquiries(status?: string) {
  try {
    const where = status && status !== 'ALL' ? { status: status as any } : {};
    
    const inquiries = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        product: {
          select: { name: true }
        }
      }
    });
    
    return inquiries;
  } catch (error) {
    console.error('Failed to fetch inquiries:', error);
    return [];
  }
}

export async function updateInquiryStatus(id: string, status: 'PENDING' | 'REVIEWED' | 'CLOSED') {
  try {
    await prisma.inquiry.update({
      where: { id },
      data: { status }
    });
    
    revalidatePath('/admin/inquiries');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Failed to update inquiry status:', error);
    return { error: 'Failed to update status' };
  }
}
