import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#0B1F3A] pt-16">
      <div className="max-w-[1280px] mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
          {/* COL 1 */}
          <div className="flex flex-col">
            <Image src="/logo.png" alt="Grove International Logo" width={180} height={180} className="object-contain" />
            <div className="flex flex-col mt-6">
              <span className="text-white font-bold tracking-wide leading-none text-2xl">
                GROVE
              </span>
              <span className="text-white/80 font-normal text-sm leading-none mt-1">
                INTERNATIONAL
              </span>
            </div>
            <p className="text-white/60 text-[14px] mt-2 leading-relaxed">
              Premium School Uniform Solutions
            </p>
          </div>

          {/* COL 2 */}
          <div>
            <h4 className="text-white/80 font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Products', 'About', 'Bulk Orders', 'Contact'].map((link) => (
                <li key={link}>
                  <Link 
                    href={
                      link === 'Home' ? '/' : 
                      link === 'Products' ? '/shop' :
                      link === 'Bulk Orders' ? '/bulk-inquiry' :
                      `/${link.toLowerCase().replace(' ', '-')}`
                    }
                    className="text-white/60 hover:text-white transition-colors text-[15px]"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3 */}
          <div>
            <h4 className="text-white/80 font-semibold mb-6">Categories</h4>
            <ul className="space-y-4">
              {['Shirts', 'Trousers', 'Blazers', 'Sportswear', 'Accessories', 'Winterwear'].map((cat) => (
                <li key={cat}>
                  <Link 
                    href={`/shop?category=${cat.toLowerCase()}`}
                    className="text-white/60 hover:text-white transition-colors text-[15px]"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 4 */}
          <div>
            <h4 className="text-white/80 font-semibold mb-6">Contact</h4>
            <ul className="space-y-4 text-white/60 text-[15px]">
              <li>
                <a href="mailto:info@groveinternational.com" className="hover:text-white transition-colors">
                  info@groveinternational.com
                </a>
              </li>
              <li>
                <a href="tel:+910000000000" className="hover:text-white transition-colors">
                  +91 00000 00000
                </a>
              </li>
              <li>India</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-[13px]">
            © {new Date().getFullYear()} Grove International
          </p>
          <div className="flex items-center gap-4 text-white/50 text-[13px]">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
