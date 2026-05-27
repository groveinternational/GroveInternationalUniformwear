'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const inquirySchema = z.object({
  fullName: z.string().min(1, 'Full Name is required'),
  school: z.string().min(1, 'School / Institution Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone Number is required'),
  products: z.string().min(1, 'Please specify the products you require'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  notes: z.string().optional(),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

export default function BulkInquiryForm() {
  const searchParams = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Pre-fill form from query params
  const initialProductName = searchParams.get('product');
  const initialColor = searchParams.get('color');
  const initialSize = searchParams.get('size');
  const initialQty = searchParams.get('qty');

  let defaultProductsText = '';
  let defaultQuantity = 1;

  if (initialProductName) {
    const qtyStr = initialQty ? `${initialQty}x ` : '';
    const colorStr = initialColor ? `${initialColor} ` : '';
    const sizeStr = initialSize ? `Size ${initialSize}` : '';
    defaultProductsText = `${qtyStr}${colorStr}${initialProductName} ${sizeStr}`.trim();
    if (initialQty && !isNaN(parseInt(initialQty))) {
      defaultQuantity = parseInt(initialQty);
    }
  }

  const { register, handleSubmit, formState: { errors }, setError } = useForm<InquiryFormData>({
    defaultValues: {
      products: defaultProductsText,
      quantity: defaultQuantity,
    }
  });

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const validData = inquirySchema.parse(data);
      
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: validData.fullName,
          email: validData.email,
          phone: validData.phone,
          schoolName: validData.school,
          message: validData.products + 
                   (validData.notes ? '\n\n' + validData.notes : ''),
          quantity: validData.quantity
        })
      });

      if (!response.ok) {
        setSubmitError('Something went wrong. Please try again or contact us directly.');
        return;
      }
      
      setIsSuccess(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          if (err.path[0]) {
            setError(err.path[0] as any, { type: 'manual', message: err.message });
          }
        });
      } else {
        setSubmitError('Something went wrong. Please try again or contact us directly.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white border border-[#E5E7EB] rounded-[8px] p-10 shadow-sm flex flex-col items-center text-center">
        <div className="w-[64px] h-[64px] bg-[#0B1F3A] text-white rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-[24px] font-semibold text-text mb-2">Inquiry Submitted Successfully</h2>
        <p className="text-[#6B7280] text-[16px] mb-8">
          We will contact you within 24 hours.
        </p>
        <Link 
          href="/"
          className="text-[#1D3D73] font-medium hover:underline"
        >
          Back to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[8px] p-8 md:p-10 shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-[14px] font-medium text-text mb-1.5">Full Name *</label>
          <input 
            {...register('fullName')}
            className="w-full px-4 py-3 border border-[#E5E7EB] rounded-[6px] focus:ring-2 focus:ring-[#0B1F3A]/20 focus:border-[#0B1F3A] outline-none transition-all"
          />
          {errors.fullName && <p className="text-red-500 text-[13px] mt-1.5">{errors.fullName.message}</p>}
        </div>

        <div>
          <label className="block text-[14px] font-medium text-text mb-1.5">School / Institution Name *</label>
          <input 
            {...register('school')}
            className="w-full px-4 py-3 border border-[#E5E7EB] rounded-[6px] focus:ring-2 focus:ring-[#0B1F3A]/20 focus:border-[#0B1F3A] outline-none transition-all"
          />
          {errors.school && <p className="text-red-500 text-[13px] mt-1.5">{errors.school.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[14px] font-medium text-text mb-1.5">Email Address *</label>
            <input 
              type="email"
              {...register('email')}
              className="w-full px-4 py-3 border border-[#E5E7EB] rounded-[6px] focus:ring-2 focus:ring-[#0B1F3A]/20 focus:border-[#0B1F3A] outline-none transition-all"
            />
            {errors.email && <p className="text-red-500 text-[13px] mt-1.5">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-[14px] font-medium text-text mb-1.5">Phone Number *</label>
            <input 
              type="tel"
              {...register('phone')}
              className="w-full px-4 py-3 border border-[#E5E7EB] rounded-[6px] focus:ring-2 focus:ring-[#0B1F3A]/20 focus:border-[#0B1F3A] outline-none transition-all"
            />
            {errors.phone && <p className="text-red-500 text-[13px] mt-1.5">{errors.phone.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-[14px] font-medium text-text mb-1.5">Products Required *</label>
          <textarea 
            {...register('products')}
            placeholder="e.g. 50x White Shirts Size M, 30x Navy Blazers Size L"
            className="w-full min-h-[100px] px-4 py-3 border border-[#E5E7EB] rounded-[6px] focus:ring-2 focus:ring-[#0B1F3A]/20 focus:border-[#0B1F3A] outline-none transition-all resize-y"
          />
          {errors.products && <p className="text-red-500 text-[13px] mt-1.5">{errors.products.message}</p>}
        </div>

        <div>
          <label className="block text-[14px] font-medium text-text mb-1.5">Estimated Quantity *</label>
          <input 
            type="number"
            min="1"
            {...register('quantity', { valueAsNumber: true })}
            className="w-full px-4 py-3 border border-[#E5E7EB] rounded-[6px] focus:ring-2 focus:ring-[#0B1F3A]/20 focus:border-[#0B1F3A] outline-none transition-all"
          />
          {errors.quantity && <p className="text-red-500 text-[13px] mt-1.5">{errors.quantity.message}</p>}
        </div>

        <div>
          <label className="block text-[14px] font-medium text-text mb-1.5">Additional Notes (Optional)</label>
          <textarea 
            {...register('notes')}
            className="w-full min-h-[80px] px-4 py-3 border border-[#E5E7EB] rounded-[6px] focus:ring-2 focus:ring-[#0B1F3A]/20 focus:border-[#0B1F3A] outline-none transition-all resize-y"
          />
        </div>

        {submitError && (
          <div className="bg-red-50 text-red-500 p-4 rounded-[6px] text-[14px] font-medium border border-red-100">
            {submitError}
          </div>
        )}

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full h-[52px] bg-[#0B1F3A] text-white rounded-[6px] font-medium text-[15px] tracking-[0.02em] hover:bg-[#081629] transition-colors disabled:opacity-70 flex items-center justify-center mt-4"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
        </button>
      </form>
    </div>
  );
}
