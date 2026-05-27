'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function ShopSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || 'newest';

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('sort', e.target.value);
    router.push(`/shop?${current.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-[14px] text-text-muted">Sort by:</label>
      <select 
        id="sort"
        value={currentSort}
        onChange={handleSortChange}
        className="text-[14px] font-medium text-text bg-transparent border-none outline-none focus:ring-0 cursor-pointer p-0 pr-4"
      >
        <option value="newest">Newest First</option>
        <option value="name-asc">Name A-Z</option>
        <option value="name-desc">Name Z-A</option>
        <option value="price-asc">Price Low-High</option>
      </select>
    </div>
  );
}
