'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProductDetailsInteractive({ 
  productName,
  colors,
  sizes
}: { 
  productName: string;
  colors: string[];
  sizes: string[];
}) {
  const [selectedColor, setSelectedColor] = useState<string | null>(colors.length > 0 ? colors[0] : null);
  const [selectedSize, setSelectedSize] = useState<string | null>(sizes.length > 0 ? sizes[0] : null);
  const [quantity, setQuantity] = useState<number>(1);

  const incrementQty = () => setQuantity(prev => (prev < 99 ? prev + 1 : prev));
  const decrementQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : prev));

  // Build inquiry URL
  const inquiryUrl = new URLSearchParams();
  inquiryUrl.set('product', productName);
  if (selectedColor) inquiryUrl.set('color', selectedColor);
  if (selectedSize) inquiryUrl.set('size', selectedSize);
  inquiryUrl.set('qty', quantity.toString());

  return (
    <div className="flex flex-col">
      
      {/* Colors */}
      {colors && colors.length > 0 && (
        <div className="mb-5">
          <h3 className="text-[14px] font-medium text-text mb-2.5">Available Colors</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors border ${
                  selectedColor === color
                    ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                    : 'bg-white text-text border-[#E5E7EB] hover:border-[#0B1F3A]'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}
      {sizes && sizes.length > 0 && (
        <div>
          <h3 className="text-[14px] font-medium text-text mb-2.5 mt-5">Select Size</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-[44px] h-[44px] rounded-[6px] text-[14px] font-medium transition-colors border flex items-center justify-center ${
                  selectedSize === size
                    ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                    : 'bg-white text-text border-[#E5E7EB] hover:border-[#0B1F3A]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="mt-5">
        <h3 className="text-[14px] font-medium text-text mb-2.5">Quantity</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-[#E5E7EB] rounded-[6px] overflow-hidden">
            <button 
              onClick={decrementQty}
              className="w-[36px] h-[36px] flex items-center justify-center text-text hover:bg-gray-50 transition-colors"
            >
              -
            </button>
            <div className="w-[48px] h-[36px] flex items-center justify-center text-[15px] font-medium border-x border-[#E5E7EB]">
              {quantity}
            </div>
            <button 
              onClick={incrementQty}
              className="w-[36px] h-[36px] flex items-center justify-center text-text hover:bg-gray-50 transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#E5E7EB] my-6" />

      {/* Primary CTA */}
      <Link
        href={`/bulk-inquiry?${inquiryUrl.toString()}`}
        className="w-full h-[52px] bg-[#0B1F3A] text-white rounded-[6px] font-medium text-[15px] flex items-center justify-center hover:bg-[#081629] transition-colors"
      >
        Send Inquiry
      </Link>

      <div className="mt-4 text-center">
        <Link href="/contact" className="text-[#1D3D73] text-[14px] font-medium hover:underline">
          Need bulk pricing? Contact us &rarr;
        </Link>
      </div>

    </div>
  );
}
