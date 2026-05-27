'use client';

import { useState } from 'react';

export default function ProductAccordion({ items }: { items: { label: string; content: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // first item open by default

  const toggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <div className="w-full flex flex-col mt-6 border-t border-[#E5E7EB]">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="border-b border-[#E5E7EB]">
            <button
              onClick={() => toggle(idx)}
              className="w-full py-4 flex items-center justify-between text-left focus:outline-none"
            >
              <span className="text-[15px] font-medium text-text">{item.label}</span>
              <svg 
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && (
              <div className="pb-4 text-[14px] text-[#6B7280] leading-relaxed pr-8">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
