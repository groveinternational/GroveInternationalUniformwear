import { prisma } from '@/lib/prisma';
import ProductForm from '@/components/admin/ProductForm';
import { updateProduct } from '@/lib/actions/products';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id: params.id },
    }),
    prisma.category.findMany({
      orderBy: { name: 'asc' },
    }),
  ]);

  if (!product) {
    notFound();
  }

  // Pre-bind the server action with the product ID
  const updateProductWithId = updateProduct.bind(null, product.id);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">Edit Product</h2>
      </div>
      <ProductForm action={updateProductWithId} initialData={product} categories={categories} />
    </div>
  );
}
