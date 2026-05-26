import { prisma } from '@/lib/prisma';
import ProductForm from '@/components/admin/ProductForm';
import { createProduct } from '@/lib/actions/products';

export const dynamic = 'force-dynamic';

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">Add New Product</h2>
      </div>
      <ProductForm action={createProduct} categories={categories} />
    </div>
  );
}
