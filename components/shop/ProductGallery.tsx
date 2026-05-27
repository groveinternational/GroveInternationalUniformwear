'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProductGallery({ images, productName }: { images: string[], productName: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Fallback if no images
  if (!images || images.length === 0) {
    return (
      <div className="w-full">
        <div className="aspect-[4/5] bg-[#F0F2F5] rounded-[8px] overflow-hidden flex items-center justify-center border border-[#E5E7EB]">
          <span className="text-[#6B7280] font-medium text-lg px-6 text-center">{productName}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Image */}
      <div className="aspect-[4/5] bg-[#F0F2F5] rounded-[8px] overflow-hidden border border-[#E5E7EB] relative">
        <Image 
          src={images[selectedIndex]} 
          alt={`${productName} - Image ${selectedIndex + 1}`} 
          fill 
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {images.slice(0, 4).map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-[80px] h-[80px] rounded-[6px] overflow-hidden flex-shrink-0 transition-all ${
                selectedIndex === idx 
                  ? 'border-[2px] border-[#0B1F3A]' 
                  : 'border-[2px] border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <Image 
                src={img} 
                alt={`Thumbnail ${idx + 1}`} 
                fill 
                className="object-cover" 
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
