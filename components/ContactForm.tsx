'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const contactSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  school: z.string().min(1, 'School / Organisation is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.enum(['General Inquiry', 'Product Inquiry', 'Bulk Order', 'Other']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors }, setError } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const validData = contactSchema.parse(data);
      
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: validData.fullName,
          email: validData.email,
          phone: validData.phone,
          schoolName: validData.school,
          message: validData.subject + ': ' + validData.message
        })
      });

      if (!response.ok) {
        setSubmitError('Something went wrong. Please try again or contact us directly.');
        return;
      }
      
      setIsSuccess(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((err) => {
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
      <div className="bg-green-50 border border-green-200 rounded-[8px] p-8 text-center flex flex-col items-center">
        <div className="w-[64px] h-[64px] bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-[24px] font-semibold text-green-800 mb-2">Message Sent!</h3>
        <p className="text-green-700 text-[16px]">
          Thank you for getting in touch. We will get back to you shortly.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="mt-8 text-green-700 font-medium hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
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
        <label className="block text-[14px] font-medium text-text mb-1.5">School / Organisation *</label>
        <input 
          {...register('school')}
          className="w-full px-4 py-3 border border-[#E5E7EB] rounded-[6px] focus:ring-2 focus:ring-[#0B1F3A]/20 focus:border-[#0B1F3A] outline-none transition-all"
        />
        {errors.school && <p className="text-red-500 text-[13px] mt-1.5">{errors.school.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[14px] font-medium text-text mb-1.5">Email *</label>
          <input 
            type="email"
            {...register('email')}
            className="w-full px-4 py-3 border border-[#E5E7EB] rounded-[6px] focus:ring-2 focus:ring-[#0B1F3A]/20 focus:border-[#0B1F3A] outline-none transition-all"
          />
          {errors.email && <p className="text-red-500 text-[13px] mt-1.5">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-[14px] font-medium text-text mb-1.5">Phone</label>
          <input 
            type="tel"
            {...register('phone')}
            className="w-full px-4 py-3 border border-[#E5E7EB] rounded-[6px] focus:ring-2 focus:ring-[#0B1F3A]/20 focus:border-[#0B1F3A] outline-none transition-all"
          />
          {errors.phone && <p className="text-red-500 text-[13px] mt-1.5">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-[14px] font-medium text-text mb-1.5">Subject *</label>
        <select 
          {...register('subject')}
          className="w-full px-4 py-3 border border-[#E5E7EB] rounded-[6px] focus:ring-2 focus:ring-[#0B1F3A]/20 focus:border-[#0B1F3A] outline-none transition-all bg-white"
        >
          <option value="General Inquiry">General Inquiry</option>
          <option value="Product Inquiry">Product Inquiry</option>
          <option value="Bulk Order">Bulk Order</option>
          <option value="Other">Other</option>
        </select>
        {errors.subject && <p className="text-red-500 text-[13px] mt-1.5">{errors.subject.message}</p>}
      </div>

      <div>
        <label className="block text-[14px] font-medium text-text mb-1.5">Message *</label>
        <textarea 
          {...register('message')}
          className="w-full min-h-[120px] px-4 py-3 border border-[#E5E7EB] rounded-[6px] focus:ring-2 focus:ring-[#0B1F3A]/20 focus:border-[#0B1F3A] outline-none transition-all"
        />
        {errors.message && <p className="text-red-500 text-[13px] mt-1.5">{errors.message.message}</p>}
      </div>

        {submitError && (
          <div className="bg-red-50 text-red-500 p-4 rounded-[6px] text-[14px] font-medium border border-red-100">
            {submitError}
          </div>
        )}

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full h-[48px] bg-[#0B1F3A] text-white rounded-[6px] font-medium text-[15px] tracking-[0.02em] hover:bg-[#081629] transition-colors disabled:opacity-70 flex items-center justify-center"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
    </form>
  );
}
