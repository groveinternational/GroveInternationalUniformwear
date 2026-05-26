import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { deleteProduct } from '@/lib/actions/products';
import DeleteProductForm from '@/components/admin/DeleteProductForm';

export const dynamic = 'force-dynamic';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || '1');
  const limit = 10;
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      skip,
      take: limit,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.product.count(),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <input 
          type="text" 
          placeholder="Search products..." 
          className="px-4 py-2 border border-gray-200 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <Link 
          href="/admin/products/new"
          className="bg-[#0B1F3A] text-white px-4 py-2 rounded-md font-medium hover:bg-[#081629] transition-colors"
        >
          Add New Product
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-text-muted">
              <th className="px-6 py-3 font-medium">Image</th>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Price</th>
              <th className="px-6 py-3 font-medium">Featured</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-text-muted">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((p) => {
                const imageUrl = (p.images as string[])?.[0];
                return (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      {imageUrl ? (
                        <div className="w-[60px] h-[60px] relative rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                          <Image src={imageUrl} alt={p.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-[60px] h-[60px] bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center text-gray-400 text-xs">
                          No Img
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-text">{p.name}</td>
                    <td className="px-6 py-4 text-text-muted">{p.category?.name || '—'}</td>
                    <td className="px-6 py-4 text-text-muted">{p.price ? `$${p.price.toFixed(2)}` : '—'}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        p.isFeatured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {p.isFeatured ? 'Featured' : 'Standard'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <Link href={`/admin/products/edit/${p.id}`} className="text-secondary hover:text-secondary-light font-medium text-sm">
                        Edit
                      </Link>
                      <DeleteProductForm action={deleteProduct} id={p.id} />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4">
          {page > 1 ? (
            <Link href={`/admin/products?page=${page - 1}`} className="px-4 py-2 border border-gray-200 rounded-md bg-white hover:bg-gray-50 text-sm font-medium">
              Previous
            </Link>
          ) : (
            <button disabled className="px-4 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-400 text-sm font-medium cursor-not-allowed">
              Previous
            </button>
          )}
          <span className="text-sm text-text-muted">
            Page {page} of {totalPages}
          </span>
          {page < totalPages ? (
            <Link href={`/admin/products?page=${page + 1}`} className="px-4 py-2 border border-gray-200 rounded-md bg-white hover:bg-gray-50 text-sm font-medium">
              Next
            </Link>
          ) : (
            <button disabled className="px-4 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-400 text-sm font-medium cursor-not-allowed">
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
}
