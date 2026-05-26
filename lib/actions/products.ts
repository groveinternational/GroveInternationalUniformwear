'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const categoryId = formData.get('categoryId') as string;
  const description = formData.get('description') as string | null;
  const fabric = formData.get('fabric') as string | null;
  const gender = formData.get('gender') as string | null;
  const priceRaw = formData.get('price');
  const price = priceRaw ? parseFloat(priceRaw as string) : null;
  const isFeatured = formData.get('isFeatured') === 'on';
  const sku = formData.get('sku') as string | null;
  
  const images = JSON.parse(formData.get('images') as string || '[]');
  const sizes = JSON.parse(formData.get('sizes') as string || '[]');
  const colors = JSON.parse(formData.get('colors') as string || '[]');

  await prisma.product.create({
    data: {
      name,
      slug,
      categoryId,
      description,
      fabric,
      gender,
      price,
      isFeatured,
      sku,
      images,
      sizes,
      colors,
    },
  });

  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const categoryId = formData.get('categoryId') as string;
  const description = formData.get('description') as string | null;
  const fabric = formData.get('fabric') as string | null;
  const gender = formData.get('gender') as string | null;
  const priceRaw = formData.get('price');
  const price = priceRaw ? parseFloat(priceRaw as string) : null;
  const isFeatured = formData.get('isFeatured') === 'on';
  const sku = formData.get('sku') as string | null;
  
  const images = JSON.parse(formData.get('images') as string || '[]');
  const sizes = JSON.parse(formData.get('sizes') as string || '[]');
  const colors = JSON.parse(formData.get('colors') as string || '[]');

  await prisma.product.update({
    where: { id },
    data: {
      name,
      slug,
      categoryId,
      description,
      fabric,
      gender,
      price,
      isFeatured,
      sku,
      images,
      sizes,
      colors,
    },
  });

  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: { id },
  });
  revalidatePath('/admin/products');
}
