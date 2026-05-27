import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  slug: string;
  images: string[];
  fabric: string | null;
  colors: string[];
  sizes: string[];
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-[8px] overflow-hidden group hover:shadow-md transition-shadow duration-200 border border-[#E5E7EB] flex flex-col h-full">
      <div className="aspect-[4/5] bg-[#F0F2F5] relative overflow-hidden flex-shrink-0">
        {product.images && product.images.length > 0 ? (
          <Image 
            src={product.images[0]} 
            alt={product.name} 
            fill 
            className="object-cover group-hover:scale-[1.02] transition-transform duration-300" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-4 text-center">
            <span className="text-[#6B7280] font-medium">{product.name}</span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h3 className="text-[15px] font-semibold text-text line-clamp-2">{product.name}</h3>
          {product.fabric && (
            <p className="text-[13px] text-[#6B7280] truncate mt-0.5">{product.fabric}</p>
          )}
          
          {product.colors && product.colors.length > 0 && (
            <div className="flex flex-wrap gap-[6px] mt-2">
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
            <div className="flex flex-wrap gap-1 mt-2">
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
        </div>

        <Link 
          href={`/shop/${product.slug}`}
          className="mt-2 w-full h-[38px] border border-[#0B1F3A] text-[#0B1F3A] rounded-[6px] font-medium text-[14px] flex items-center justify-center hover:bg-[#0B1F3A] hover:text-white transition-colors"
        >
          Send Inquiry
        </Link>
      </div>
    </div>
  );
}
