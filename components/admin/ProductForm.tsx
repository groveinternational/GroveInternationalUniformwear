'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductFormProps {
  action: (formData: FormData) => Promise<void>;
  initialData?: any;
  categories: any[];
}

const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38'];

export default function ProductForm({ action, initialData, categories }: ProductFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [sizes, setSizes] = useState<string[]>(initialData?.sizes || []);
  const [colors, setColors] = useState<string[]>(initialData?.colors || []);
  const [colorInput, setColorInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  // Auto-generate slug from name if empty or editing name initially
  useEffect(() => {
    if (!initialData) {
      setSlug(name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  }, [name, initialData]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    if (images.length >= 5) {
      alert('You can only upload up to 5 images.');
      return;
    }
    
    setUploading(true);
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.details || 'Upload failed');
      }
      const data = await res.json();
      setImages((prev) => [...prev, data.secure_url]);
    } catch (error: any) {
      alert('Error uploading image: ' + error.message);
      console.error(error);
    } finally {
      setUploading(false);
      e.target.value = ''; // reset input
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const toggleSize = (size: string) => {
    setSizes((prev) => 
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleAddColor = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newColor = colorInput.trim();
      if (newColor && !colors.includes(newColor)) {
        setColors([...colors, newColor]);
        setColorInput('');
      }
    }
  };

  const removeColor = (color: string) => {
    setColors(colors.filter((c) => c !== color));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    // Let the form naturally submit using action={action}, but we just set loading state
  };

  return (
    <form action={action} onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold border-b pb-2">Basic Info</h3>
          
          <div>
            <label className="block text-sm font-medium text-text mb-1">Product Name *</label>
            <input 
              name="name" 
              required 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text mb-1">Slug *</label>
            <input 
              name="slug" 
              required 
              value={slug} 
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">Category *</label>
            <select 
              name="categoryId" 
              required 
              defaultValue={initialData?.categoryId || ''}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="" disabled>Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">Description</label>
            <textarea 
              name="description" 
              rows={4}
              defaultValue={initialData?.description || ''}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">Fabric</label>
            <input 
              name="fabric" 
              defaultValue={initialData?.fabric || ''}
              placeholder="e.g. 100% Cotton"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Gender</label>
              <select 
                name="gender" 
                defaultValue={initialData?.gender || 'All'}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="Boys">Boys</option>
                <option value="Girls">Girls</option>
                <option value="Unisex">Unisex</option>
                <option value="All">All</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text mb-1">Price</label>
              <input 
                type="number" 
                name="price" 
                step="0.01"
                defaultValue={initialData?.price || ''}
                placeholder="Leave empty to hide price"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <input 
              type="checkbox" 
              name="isFeatured" 
              id="isFeatured"
              defaultChecked={initialData?.isFeatured || false}
              className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
            />
            <label htmlFor="isFeatured" className="text-sm font-medium text-text">Featured Product</label>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold border-b pb-2">Details & Media</h3>
          
          <div>
            <label className="block text-sm font-medium text-text mb-2">Images (Max 5)</label>
            <div className="flex gap-4 flex-wrap mb-3">
              {images.map((url, i) => (
                <div key={i} className="relative w-24 h-24 border rounded-md overflow-hidden group">
                  <Image src={url} alt="preview" fill className="object-cover" />
                  <button 
                    type="button" 
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
              {images.length < 5 && (
                <label className="w-24 h-24 border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="text-2xl text-gray-400">+</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                </label>
              )}
            </div>
            {uploading && <p className="text-sm text-primary">Uploading image...</p>}
            <input type="hidden" name="images" value={JSON.stringify(images)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Sizes</label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {AVAILABLE_SIZES.map(size => (
                <label key={size} className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded border cursor-pointer hover:bg-gray-100">
                  <input 
                    type="checkbox" 
                    checked={sizes.includes(size)} 
                    onChange={() => toggleSize(size)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium">{size}</span>
                </label>
              ))}
            </div>
            <input type="hidden" name="sizes" value={JSON.stringify(sizes)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">Colors</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {colors.map(color => (
                <span key={color} className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                  {color}
                  <button type="button" onClick={() => removeColor(color)} className="ml-2 text-gray-500 hover:text-red-500">&times;</button>
                </span>
              ))}
            </div>
            <input 
              type="text" 
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              onKeyDown={handleAddColor}
              placeholder="Type color and press Enter"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <input type="hidden" name="colors" value={JSON.stringify(colors)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">SKU</label>
            <input 
              name="sku" 
              defaultValue={initialData?.sku || ''}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t flex items-center justify-end space-x-4">
        <Link href="/admin/products" className="px-6 py-2 border rounded-md hover:bg-gray-50 font-medium">
          Cancel
        </Link>
        <button 
          type="submit" 
          disabled={loading || uploading}
          className="px-6 py-2 bg-[#0B1F3A] hover:bg-[#081629] text-white rounded-md font-medium disabled:opacity-70 transition-colors"
        >
          {loading ? 'Saving...' : 'Save Product'}
        </button>
      </div>
    </form>
  );
}
