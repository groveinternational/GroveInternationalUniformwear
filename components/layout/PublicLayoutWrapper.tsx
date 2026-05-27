'use client';

import { usePathname } from 'next/navigation';

export default function PublicLayoutWrapper({ 
  children,
  navbar,
  footer
}: { 
  children: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {navbar}
      <main className="flex-1">{children}</main>
      {footer}
    </div>
  );
}
