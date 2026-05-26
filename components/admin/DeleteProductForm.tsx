'use client';

export default function DeleteProductForm({ 
  action, 
  id 
}: { 
  action: (id: string) => Promise<void>; 
  id: string 
}) {
  const handleDelete = (e: React.FormEvent) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      e.preventDefault();
    }
  };

  return (
    <form action={action.bind(null, id)} onSubmit={handleDelete} className="inline-block">
      <button type="submit" className="text-red-600 hover:text-red-800 font-medium text-sm">
        Delete
      </button>
    </form>
  );
}
