import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PublicLayoutWrapper from "@/components/layout/PublicLayoutWrapper";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "Grove International Uniformwear",
  description: "Premium uniformwear",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-background text-text`}>
        <PublicLayoutWrapper navbar={<Navbar />} footer={<Footer />}>
          {children}
        </PublicLayoutWrapper>
      </body>
    </html>
  );
}
