'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CategoryWithCount {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  _count: {
    products: number;
  };
}

interface CategoryManagerProps {
  categories: CategoryWithCount[];
  createAction: (formData: FormData) => Promise<{ error?: string; success?: boolean }>;
  updateAction: (id: string, formData: FormData) => Promise<{ error?: string; success?: boolean }>;
  deleteAction: (id: string) => Promise<{ error?: string; success?: boolean }>;
}

export default function CategoryManager({ categories, createAction, updateAction, deleteAction }: CategoryManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryWithCount | null>(null);
  
  // Form state
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Auto-generate slug
  useEffect(() => {
    if (!editingCategory) {
      setSlug(name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  }, [name, editingCategory]);

  const openModal = (category?: CategoryWithCount) => {
    setError('');
    if (category) {
      setEditingCategory(category);
      setName(category.name);
      setSlug(category.slug);
      setImage(category.image || '');
    } else {
      setEditingCategory(null);
      setName('');
      setSlug('');
      setImage('');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    setError('');
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setImage(data.secure_url);
    } catch (err) {
      setError('Error uploading image');
    } finally {
      setUploading(false);
      e.target.value = ''; // reset input
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('slug', slug);
    if (image) formData.append('image', image);

    let res;
    if (editingCategory) {
      res = await updateAction(editingCategory.id, formData);
    } else {
      res = await createAction(formData);
    }

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      setLoading(false);
      closeModal();
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the category "${name}"?`)) {
      const res = await deleteAction(id);
      if (res?.error) {
        alert(res.error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">Categories</h2>
        <button 
          onClick={() => openModal()}
          className="bg-[#0B1F3A] text-white px-4 py-2 rounded-md font-medium hover:bg-[#081629] transition-colors"
        >
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="h-48 relative bg-gray-100 flex-shrink-0">
              {category.image ? (
                <Image src={category.image} alt={category.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
              )}
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-[16px] font-semibold text-text">{category.name}</h3>
                <p className="text-sm text-text-muted mt-1">{category._count.products} Products</p>
              </div>
              <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-gray-50">
                <button 
                  onClick={() => openModal(category)}
                  className="p-2 text-gray-500 hover:text-secondary bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                  title="Edit Category"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
                <button 
                  onClick={() => handleDelete(category.id, category.name)}
                  className="p-2 text-gray-500 hover:text-red-600 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                  title="Delete Category"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
        {categories.length === 0 && (
          <div className="col-span-full py-12 text-center bg-white rounded-lg border border-gray-100 text-text-muted">
            No categories found.
          </div>
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-lg font-semibold text-text">
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-text mb-1">Name *</label>
                <input 
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1">Slug *</label>
                <input 
                  required 
                  value={slug} 
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Image</label>
                <div className="flex items-start space-x-4">
                  <div className="w-24 h-24 relative bg-gray-50 border rounded-md overflow-hidden flex-shrink-0">
                    {image ? (
                      <Image src={image} alt="Preview" fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="inline-block bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors">
                      {uploading ? 'Uploading...' : 'Choose Image'}
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className="hidden" 
                        disabled={uploading}
                      />
                    </label>
                    <p className="text-xs text-text-muted mt-2">
                      Upload a high-quality image representing this category.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 mt-6 border-t flex justify-end space-x-3">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="px-4 py-2 border rounded-md font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading || uploading}
                  className="bg-[#0B1F3A] hover:bg-[#081629] text-white px-4 py-2 rounded-md font-medium disabled:opacity-70 transition-colors"
                >
                  {loading ? 'Saving...' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
