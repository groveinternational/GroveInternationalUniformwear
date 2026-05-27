'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Category {
  id: string;
  name: string;
  slug: string;
}

const GENDERS = ['Boys', 'Girls', 'Unisex', 'All'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38'];
const COLORS = ['White', 'Navy', 'Grey', 'Black', 'Sky Blue', 'Maroon'];

export default function ShopFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Expanded states
  const [expanded, setExpanded] = useState({
    category: true,
    gender: true,
    size: true,
    color: true,
  });

  const toggleSection = (section: keyof typeof expanded) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleFilterChange = (key: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const existing = current.get(key)?.split(',') || [];
    
    if (existing.includes(value)) {
      const filtered = existing.filter(v => v !== value);
      if (filtered.length > 0) {
        current.set(key, filtered.join(','));
      } else {
        current.delete(key);
      }
    } else {
      existing.push(value);
      current.set(key, existing.join(','));
    }
    
    router.push(`/shop?${current.toString()}`, { scroll: false });
  };

  const clearAll = () => {
    router.push('/shop');
  };

  const isChecked = (key: string, value: string) => {
    const existing = searchParams.get(key)?.split(',') || [];
    return existing.includes(value);
  };

  const FilterSection = ({ title, sectionKey, children }: any) => (
    <div className="py-5 border-b border-[#E5E7EB]">
      <button 
        className="w-full flex items-center justify-between font-medium text-text"
        onClick={() => toggleSection(sectionKey)}
      >
        <span>{title}</span>
        <svg 
          className={`w-5 h-5 text-gray-400 transition-transform ${expanded[sectionKey as keyof typeof expanded] ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded[sectionKey as keyof typeof expanded] && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-[18px] font-semibold text-text">Filters</h2>
        {(searchParams.toString().length > 0) && (
          <button 
            onClick={clearAll}
            className="text-[#1D3D73] text-[14px] font-medium hover:underline"
          >
            Clear All
          </button>
        )}
      </div>

      <FilterSection title="Category" sectionKey="category">
        <div className="space-y-3">
          {categories.map(cat => (
            <label key={cat.id} className="flex items-center space-x-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={isChecked('category', cat.slug)}
                onChange={() => handleFilterChange('category', cat.slug)}
                className="w-4 h-4 text-[#0B1F3A] border-gray-300 rounded focus:ring-[#0B1F3A]"
              />
              <span className="text-[14px] text-text-muted">{cat.name}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Gender" sectionKey="gender">
        <div className="space-y-3">
          {GENDERS.map(g => (
            <label key={g} className="flex items-center space-x-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={isChecked('gender', g)}
                onChange={() => handleFilterChange('gender', g)}
                className="w-4 h-4 text-[#0B1F3A] border-gray-300 rounded focus:ring-[#0B1F3A]"
              />
              <span className="text-[14px] text-text-muted">{g}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Size" sectionKey="size">
        <div className="grid grid-cols-3 gap-2">
          {SIZES.map(size => (
            <label key={size} className="flex items-center space-x-2 cursor-pointer bg-gray-50 px-2 py-2 rounded border border-gray-100 hover:bg-gray-100">
              <input 
                type="checkbox" 
                checked={isChecked('size', size)}
                onChange={() => handleFilterChange('size', size)}
                className="w-3.5 h-3.5 text-[#0B1F3A] border-gray-300 rounded focus:ring-[#0B1F3A]"
              />
              <span className="text-[13px] text-text-muted">{size}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Color" sectionKey="color">
        <div className="space-y-3">
          {COLORS.map(color => (
            <label key={color} className="flex items-center space-x-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={isChecked('color', color)}
                onChange={() => handleFilterChange('color', color)}
                className="w-4 h-4 text-[#0B1F3A] border-gray-300 rounded focus:ring-[#0B1F3A]"
              />
              <span className="text-[14px] text-text-muted">{color}</span>
            </label>
          ))}
        </div>
      </FilterSection>

    </div>
  );
}
