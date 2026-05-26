'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createCategory(formData: FormData) {
  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const image = formData.get('image') as string | null;

  if (!name || !slug) {
    return { error: 'Name and slug are required' };
  }

  try {
    await prisma.category.create({
      data: {
        name,
        slug,
        image: image || null,
      },
    });
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error) {
    console.error('Error creating category:', error);
    return { error: 'Failed to create category' };
  }
}

export async function updateCategory(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const image = formData.get('image') as string | null;

  if (!name || !slug) {
    return { error: 'Name and slug are required' };
  }

  try {
    await prisma.category.update({
      where: { id },
      data: {
        name,
        slug,
        image: image || null,
      },
    });
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error) {
    console.error('Error updating category:', error);
    return { error: 'Failed to update category' };
  }
}

export async function deleteCategory(id: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true }
        }
      }
    });

    if (!category) {
      return { error: 'Category not found' };
    }

    if (category._count.products > 0) {
      return { error: `Cannot delete category. It currently has ${category._count.products} products attached.` };
    }

    await prisma.category.delete({
      where: { id },
    });
    
    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error) {
    console.error('Error deleting category:', error);
    return { error: 'Failed to delete category' };
  }
}
