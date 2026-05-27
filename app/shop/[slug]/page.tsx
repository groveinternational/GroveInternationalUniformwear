import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import ProductGallery from '@/components/shop/ProductGallery';
import ProductDetailsInteractive from '@/components/shop/ProductDetailsInteractive';
import ProductAccordion from '@/components/shop/ProductAccordion';
import ProductCard from '@/components/shop/ProductCard';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });

  if (!product) {
    return (
      <div className="bg-white min-h-[60vh] flex flex-col items-center justify-center text-center px-10">
        <h1 className="text-[32px] font-bold text-[#0B1F3A] mb-4">Product Not Found</h1>
        <p className="text-[#6B7280] text-[16px] mb-8">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link 
          href="/shop"
          className="bg-[#0B1F3A] text-white px-8 h-[48px] rounded-[6px] flex items-center justify-center font-medium hover:bg-[#081629] transition-colors"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    take: 4,
    orderBy: { createdAt: 'desc' },
  });

  const accordionItems = [
    {
      label: 'Fabric Composition',
      content: product.fabric || '—'
    },
    {
      label: 'Available Sizes',
      content: product.sizes && product.sizes.length > 0 ? product.sizes.join(', ') : '—'
    },
    {
      label: 'Care Instructions',
      content: 'Machine wash cold, tumble dry low. Do not bleach. Iron on low heat if needed.'
    }
  ];

  return (
    <div className="bg-white pb-24">
      {/* MAIN CONTENT */}
      <div className="max-w-[1280px] mx-auto px-10 pt-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-[8%] items-start">
          
          {/* LEFT (55%) */}
          <div className="w-full lg:w-[55%]">
            <ProductGallery images={product.images || []} productName={product.name} />
          </div>

          {/* RIGHT (45%) */}
          <div className="w-full lg:w-[45%] flex flex-col">
            {/* Breadcrumb */}
            <nav className="flex items-center text-[13px] text-[#6B7280] mb-2 font-medium">
              <Link href="/shop" className="hover:text-[#1D3D73] transition-colors">Shop</Link>
              <span className="mx-2">/</span>
              <Link href={`/shop?category=${product.category.slug}`} className="hover:text-[#1D3D73] transition-colors">
                {product.category.name}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-[#1E1E1E] truncate">{product.name}</span>
            </nav>

            <h1 className="text-[32px] font-bold text-[#1E1E1E] leading-tight mb-3">
              {product.name}
            </h1>

            {product.fabric && (
              <span className="inline-flex items-center px-3 py-1 bg-[#F0F2F5] border border-[#E5E7EB] rounded-full text-[13px] text-[#6B7280] font-medium w-fit">
                {product.fabric}
              </span>
            )}

            <div className="w-full h-[1px] bg-[#E5E7EB] my-6" />

            <ProductDetailsInteractive 
              productName={product.name} 
              colors={product.colors || []} 
              sizes={product.sizes || []} 
            />

            <ProductAccordion items={accordionItems} />
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 border-t border-[#E5E7EB] pt-16">
            <h3 className="text-[28px] font-semibold text-text mb-8">You may also like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(rp => (
                <ProductCard key={rp.id} product={rp as any} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
