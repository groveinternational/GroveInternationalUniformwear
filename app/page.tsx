import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [categories, featuredProducts] = await Promise.all([
    prisma.category.findMany({
      orderBy: { createdAt: 'asc' },
    }),
    prisma.product.findMany({
      where: { featured: true },
      take: 4,
      orderBy: { createdAt: 'desc' },
    })
  ]);

  return (
    <div className="flex flex-col w-full">
      
      {/* HERO SECTION */}
      <section className="w-full min-h-[600px] bg-[#0B1F3A] flex items-center">
        <div className="max-w-[1280px] mx-auto w-full px-10 py-16 flex flex-col md:flex-row items-center gap-12">
          {/* LEFT (60%) */}
          <div className="w-full md:w-[60%] flex flex-col">
            <span className="text-[#C8A96B] text-[12px] font-medium tracking-[0.15em] uppercase mb-4">
              PREMIUM UNIFORM SOLUTIONS
            </span>
            <h1 className="text-white text-[40px] md:text-[56px] font-bold leading-[1.15]">
              Uniforms Built for Institutions, Designed for Excellence
            </h1>
            <p className="text-white/70 text-[18px] mt-5 max-w-xl leading-relaxed">
              Grove International delivers premium quality school uniforms for educational institutions. Durable fabrics, precise fits, and custom solutions.
            </p>
            <div className="flex items-center gap-4 mt-9">
              <Link 
                href="/shop"
                className="bg-white text-[#0B1F3A] h-[48px] px-7 rounded-md font-medium text-[15px] flex items-center justify-center tracking-[0.02em] hover:bg-gray-100 transition-colors"
              >
                Browse Catalog
              </Link>
              <Link 
                href="/bulk-inquiry"
                className="bg-transparent border border-white text-white h-[48px] px-7 rounded-md font-medium text-[15px] flex items-center justify-center tracking-[0.02em] hover:bg-white/10 transition-colors"
              >
                Bulk Inquiry
              </Link>
            </div>
          </div>
          
          {/* RIGHT (40%) */}
          <div className="w-full md:w-[40%]">
            <div className="w-full aspect-[4/5] bg-white/5 border border-white/20 rounded-[8px] flex flex-col items-center justify-center">
              <p className="text-white/30 font-medium">Product Image</p>
              <p className="text-white/30 text-sm mt-1">AI mockup coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="bg-white py-24" id="categories">
        <div className="max-w-[1280px] mx-auto px-10">
          <div className="text-center mb-12">
            <h2 className="text-[40px] font-semibold text-text">Shop by Category</h2>
            <p className="text-[#6B7280] text-[18px] mt-3">
              Everything your institution needs, all in one place
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((cat) => (
              <Link 
                key={cat.id} 
                href={`/shop?category=${cat.slug}`}
                className="bg-white border border-[#E5E7EB] rounded-[8px] p-8 md:px-6 md:py-8 flex flex-col items-center justify-center hover:border-[#1D3D73] hover:shadow-md transition-all duration-200"
              >
                <div className="w-[64px] h-[64px] rounded-[16px] bg-[#F0F2F5] flex items-center justify-center overflow-hidden relative">
                  {cat.image ? (
                    <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                  ) : (
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  )}
                </div>
                <span className="text-[16px] font-semibold text-text mt-4 text-center">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="bg-[#F8F9FB] py-24">
        <div className="max-w-[1280px] mx-auto px-10">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-[40px] font-semibold text-text leading-none">Featured Products</h2>
            <Link href="/shop" className="text-[#1D3D73] text-[14px] font-medium hover:underline mb-1">
              View All
            </Link>
          </div>

          {featuredProducts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-[#6B7280] text-lg">Featured products coming soon</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-[8px] overflow-hidden group hover:shadow-md transition-shadow duration-200 border border-[#E5E7EB]">
                  <div className="aspect-[4/5] bg-[#F0F2F5] relative overflow-hidden">
                    {product.images && product.images.length > 0 ? (
                      <Image 
                        src={product.images[0]} 
                        alt={product.name} 
                        fill 
                        className="object-cover group-hover:scale-102 transition-transform duration-300" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-4 text-center">
                        <span className="text-[#6B7280] font-medium">{product.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col gap-3">
                    <div>
                      <h3 className="text-[15px] font-semibold text-text truncate">{product.name}</h3>
                      {product.fabric && (
                        <p className="text-[13px] text-[#6B7280] truncate mt-0.5">{product.fabric}</p>
                      )}
                    </div>
                    
                    {product.colors && product.colors.length > 0 && (
                      <div className="flex flex-wrap gap-[6px]">
                        {product.colors.map((color: string, i: number) => (
                          <div 
                            key={i} 
                            className="w-[14px] h-[14px] rounded-full border border-gray-200 bg-gray-100"
                            title={color}
                          />
                        ))}
                      </div>
                    )}

                    {product.sizes && product.sizes.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {product.sizes.slice(0, 4).map((size: string, i: number) => (
                          <span key={i} className="px-1.5 py-0.5 bg-[#F0F2F5] text-text text-[12px] font-medium rounded-full">
                            {size}
                          </span>
                        ))}
                        {product.sizes.length > 4 && (
                          <span className="px-1.5 py-0.5 text-[#6B7280] text-[12px] font-medium">
                            +{product.sizes.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                    <Link 
                      href={`/shop/${product.slug}`}
                      className="mt-2 w-full h-[38px] border border-[#0B1F3A] text-[#0B1F3A] rounded-[6px] font-medium text-[14px] flex items-center justify-center hover:bg-[#0B1F3A] hover:text-white transition-colors"
                    >
                      Send Inquiry
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* WHY GROVE INTERNATIONAL SECTION */}
      <section className="bg-white py-24">
        <div className="max-w-[1280px] mx-auto px-10">
          <h2 className="text-[40px] font-semibold text-text text-center">Why Choose Grove International</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              {
                title: 'Premium Fabrics',
                desc: 'We source only the highest quality materials designed for durability and daily comfort.',
              },
              {
                title: 'Precise Stitching',
                desc: 'Expert craftsmanship ensures our uniforms hold up to the rigors of school life year after year.',
              },
              {
                title: 'Custom Solutions',
                desc: 'We tailor designs, logos, and color palettes to perfectly match your institution\'s unique branding.',
              },
              {
                title: 'Bulk Ready',
                desc: 'Optimized production lines guarantee timely delivery for massive institutional orders.',
              }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-[48px] h-[48px] rounded-lg bg-[#0B1F3A] flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-[18px] font-semibold text-text mt-4">{feature.title}</h3>
                <p className="text-[14px] text-[#6B7280] leading-[1.6] mt-2">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BULK ORDER CTA SECTION */}
      <section className="bg-[#0B1F3A] py-20">
        <div className="max-w-[640px] mx-auto px-10 flex flex-col items-center text-center">
          <span className="text-[#C8A96B] text-[12px] font-medium tracking-[0.15em] uppercase mb-3">
            FOR SCHOOLS & INSTITUTIONS
          </span>
          <h2 className="text-white text-[32px] md:text-[40px] font-semibold leading-tight">
            Looking for Custom Uniform Solutions?
          </h2>
          <p className="text-white/70 text-[16px] mt-4 leading-relaxed">
            We work directly with schools to deliver uniform programs that fit your brand and budget.
          </p>
          <Link 
            href="/bulk-inquiry"
            className="mt-8 bg-[#C8A96B] text-[#0B1F3A] h-[48px] px-8 rounded-[6px] font-medium text-[15px] flex items-center justify-center tracking-[0.02em] hover:bg-[#D4B97B] transition-colors"
          >
            Submit a Bulk Inquiry
          </Link>
        </div>
      </section>

    </div>
  );
}
