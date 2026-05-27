import { prisma } from '@/lib/prisma';
import ShopFilters from '@/components/shop/ShopFilters';
import ShopSort from '@/components/shop/ShopSort';
import ProductCard from '@/components/shop/ProductCard';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const page = parseInt(searchParams.page || '1', 10);
  const pageSize = 12;
  const skip = (page - 1) * pageSize;

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });

  // Build Prisma Where Clause
  const where: any = {};

  if (searchParams.category) {
    where.category = {
      slug: { in: searchParams.category.split(',') }
    };
  }

  if (searchParams.gender) {
    where.gender = { in: searchParams.gender.split(',') };
  }

  if (searchParams.size) {
    where.sizes = { hasSome: searchParams.size.split(',') };
  }

  if (searchParams.color) {
    where.colors = { hasSome: searchParams.color.split(',') };
  }

  // Build Prisma OrderBy Clause
  let orderBy: any = { createdAt: 'desc' };
  switch (searchParams.sort) {
    case 'name-asc':
      orderBy = { name: 'asc' };
      break;
    case 'name-desc':
      orderBy = { name: 'desc' };
      break;
    case 'price-asc':
      orderBy = { price: 'asc' };
      break;
    case 'newest':
    default:
      orderBy = { createdAt: 'desc' };
      break;
  }

  const [products, totalCount] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: pageSize,
    }),
    prisma.product.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  // Helper to construct pagination URLs
  const getPageUrl = (newPage: number) => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    params.set('page', newPage.toString());
    return `/shop?${params.toString()}`;
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* PAGE HEADER */}
      <div className="bg-[#F8F9FB] border-b border-[#E5E7EB] py-12">
        <div className="max-w-[1280px] mx-auto px-10">
          <h1 className="text-[40px] font-bold text-[#0B1F3A]">Shop Uniforms</h1>
          <p className="text-[#6B7280] text-[16px] mt-2">
            Browse our complete collection of premium uniformwear.
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-10 mt-12 flex flex-col md:flex-row gap-12 items-start">
        {/* LEFT SIDEBAR */}
        <aside className="w-full md:w-[280px] flex-shrink-0">
          <ShopFilters categories={categories} />
        </aside>

        {/* RIGHT MAIN AREA */}
        <main className="flex-1 w-full">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-[#E5E7EB] gap-4">
            <span className="text-[14px] text-text-muted font-medium">
              Showing {totalCount} product{totalCount !== 1 ? 's' : ''}
            </span>
            <ShopSort />
          </div>

          {/* Product Grid */}
          {products.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="w-[64px] h-[64px] bg-[#F0F2F5] rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-[18px] font-semibold text-text mb-2">No products found</h3>
              <p className="text-[#6B7280] text-[15px] mb-6 max-w-sm">
                We couldn't find any products matching your current filters.
              </p>
              <Link 
                href="/shop" 
                className="text-[#1D3D73] font-medium hover:underline flex items-center gap-1"
              >
                Clear all filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product as any} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-4 border-t border-[#E5E7EB] pt-8">
              {page > 1 ? (
                <Link 
                  href={getPageUrl(page - 1)}
                  className="px-4 py-2 border border-[#E5E7EB] rounded-[6px] text-[14px] font-medium text-text hover:bg-gray-50 transition-colors"
                >
                  Previous
                </Link>
              ) : (
                <span className="px-4 py-2 border border-[#E5E7EB] rounded-[6px] text-[14px] font-medium text-gray-300 cursor-not-allowed">
                  Previous
                </span>
              )}
              
              <span className="text-[14px] font-medium text-text-muted">
                Page {page} of {totalPages}
              </span>

              {page < totalPages ? (
                <Link 
                  href={getPageUrl(page + 1)}
                  className="px-4 py-2 border border-[#E5E7EB] rounded-[6px] text-[14px] font-medium text-text hover:bg-gray-50 transition-colors"
                >
                  Next
                </Link>
              ) : (
                <span className="px-4 py-2 border border-[#E5E7EB] rounded-[6px] text-[14px] font-medium text-gray-300 cursor-not-allowed">
                  Next
                </span>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
