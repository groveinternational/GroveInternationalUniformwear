import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Grove International',
  description: 'Built on quality, driven by purpose. Learn about Grove International.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION */}
      <section className="bg-[#0B1F3A] py-20">
        <div className="max-w-[1280px] mx-auto px-10 flex flex-col items-center text-center">
          <h1 className="text-white text-[40px] md:text-[56px] font-bold leading-tight">
            About Grove International
          </h1>
          <p className="text-white/70 text-[18px] md:text-[20px] mt-4 font-medium">
            Built on quality, driven by purpose
          </p>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="bg-white py-24">
        <div className="max-w-[1280px] mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* LEFT: Text */}
          <div className="flex flex-col">
            <h2 className="text-[40px] font-semibold text-text mb-6">Our Story</h2>
            <div className="space-y-4 text-[#6B7280] text-[16px] leading-[1.8]">
              <p>
                Founded on the principle that students deserve uniforms that are as resilient as they are comfortable, Grove International has grown to become a leading manufacturer of premium school apparel. We recognized a gap in the market for high-quality, ethically produced uniforms that truly reflect the prestige of the institutions they represent.
              </p>
              <p>
                Over the years, we have partnered with hundreds of schools to deliver bespoke uniform programs. By controlling our entire supply chain—from sourcing the finest raw materials to precision stitching in our modern facilities—we ensure that every garment bearing the Grove name stands up to the daily rigors of student life while maintaining a sharp, professional appearance.
              </p>
            </div>
          </div>
          
          {/* RIGHT: Image Placeholder */}
          <div className="w-full aspect-[4/3] bg-[#F0F2F5] rounded-[8px] flex items-center justify-center border border-[#E5E7EB]">
            <span className="text-[#6B7280] font-medium text-sm">Image Placeholder</span>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="bg-[#F8F9FB] py-24">
        <div className="max-w-[1280px] mx-auto px-10">
          <h2 className="text-[40px] font-semibold text-text text-center mb-16">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Value 1 */}
            <div className="bg-white p-8 rounded-[8px] border border-[#E5E7EB] shadow-sm flex flex-col items-center text-center">
              <div className="w-[64px] h-[64px] bg-[#0B1F3A] rounded-[16px] flex items-center justify-center text-white mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-[28px] font-semibold text-text mb-3">Quality</h3>
              <p className="text-[#6B7280] text-[16px] leading-[1.6]">
                We never compromise on materials or craftsmanship. Our garments are meticulously designed to endure and maintain their excellence over time.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white p-8 rounded-[8px] border border-[#E5E7EB] shadow-sm flex flex-col items-center text-center">
              <div className="w-[64px] h-[64px] bg-[#0B1F3A] rounded-[16px] flex items-center justify-center text-white mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <h3 className="text-[28px] font-semibold text-text mb-3">Integrity</h3>
              <p className="text-[#6B7280] text-[16px] leading-[1.6]">
                Honesty and transparency guide every decision we make. We are committed to ethical manufacturing and sustainable business practices.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-8 rounded-[8px] border border-[#E5E7EB] shadow-sm flex flex-col items-center text-center">
              <div className="w-[64px] h-[64px] bg-[#0B1F3A] rounded-[16px] flex items-center justify-center text-white mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-[28px] font-semibold text-text mb-3">Partnership</h3>
              <p className="text-[#6B7280] text-[16px] leading-[1.6]">
                We view our clients as true partners. By listening closely to their needs, we deliver tailored solutions that exceed expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
