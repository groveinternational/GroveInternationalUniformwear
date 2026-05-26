import { prisma } from '@/lib/prisma';
import CategoryManager from '@/components/admin/CategoryManager';
import { createCategory, updateCategory, deleteCategory } from '@/lib/actions/categories';

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: 'asc' },
    include: {
      _count: {
        select: { products: true }
      }
    }
  });

  return (
    <div className="max-w-7xl mx-auto">
      <CategoryManager 
        categories={categories} 
        createAction={createCategory}
        updateAction={updateCategory}
        deleteAction={deleteCategory}
      />
    </div>
  );
}
