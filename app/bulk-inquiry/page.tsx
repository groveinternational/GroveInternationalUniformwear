import { Metadata } from 'next';
import BulkInquiryForm from '@/components/BulkInquiryForm';

export const metadata: Metadata = {
  title: 'Bulk Uniform Inquiry | Grove International',
  description: 'Submit a bulk uniform inquiry for your school or institution.',
};

export default function BulkInquiryPage() {
  return (
    <div className="bg-[#F8F9FB] min-h-screen py-20 px-10">
      <div className="max-w-[720px] mx-auto flex flex-col">
        
        {/* HEADER */}
        <div className="text-center mb-10 flex flex-col items-center">
          <span className="text-[#C8A96B] text-[12px] font-medium tracking-[0.15em] uppercase mb-3">
            FOR SCHOOLS & INSTITUTIONS
          </span>
          <h1 className="text-[32px] md:text-[40px] font-bold text-[#0B1F3A] leading-tight">
            Bulk Uniform Inquiry
          </h1>
          <p className="text-[#6B7280] text-[16px] mt-4 max-w-lg mx-auto">
            Fill in the form below and our team will get back to you within 24 hours.
          </p>
        </div>

        {/* FORM */}
        <BulkInquiryForm />

      </div>
    </div>
  );
}
