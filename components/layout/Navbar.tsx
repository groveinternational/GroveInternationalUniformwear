'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Products', href: '/shop' },
    { name: 'Categories', href: '/shop#categories' },
    { name: 'About', href: '/about' },
    { name: 'Bulk Orders', href: '/bulk-inquiry' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href.includes('#')) {
      return pathname === href.split('#')[0];
    }
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#E5E7EB]">
      <div className="max-w-[1280px] mx-auto px-10 h-[72px] flex items-center justify-between">
        {/* LEFT: Wordmark */}
        <Link href="/" className="flex flex-col">
          <span className="text-[#0B1F3A] font-bold tracking-wide leading-none text-xl">
            GROVE
          </span>
          <span className="text-[#6B7280] font-normal text-xs leading-none mt-1">
            INTERNATIONAL
          </span>
        </Link>

        {/* CENTER: Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-[15px] font-medium h-[72px] flex items-center border-b-2 transition-all duration-200 ${
                isActive(link.href) && !link.href.includes('#')
                  ? 'border-[#C8A96B] text-[#0B1F3A]'
                  : 'border-transparent text-[#6B7280] hover:text-[#0B1F3A] hover:border-[#C8A96B]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* RIGHT: Search & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button className="text-[#6B7280] hover:text-[#0B1F3A] transition-colors p-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          <button 
            className="md:hidden text-[#6B7280] hover:text-[#0B1F3A] p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#E5E7EB] absolute w-full left-0 shadow-md">
          <div className="flex flex-col px-10 py-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[15px] font-medium text-[#6B7280] hover:text-[#0B1F3A] py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
