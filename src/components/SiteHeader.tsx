import Link from "next/link";
import Image from "next/image";
import ProductsMenu from "@/components/ProductsMenu";
import { getProductsLite } from "@/lib/products";
import MobileNav from "@/components/MobileNav";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-[70] border-b border-white/20 bg-[color:var(--surface)]/70 backdrop-blur-xl supports-[backdrop-filter]:bg-[color:var(--surface)]/60">
      <div className="mx-auto max-w-7xl px-6 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/the-insurance-box-logo.png" alt="The Insurance Box" width={96} height={18} priority />
          </Link>
          <div className="flex-1 flex items-center justify-center">
            <nav aria-label="Main" className="hidden md:flex items-center gap-4 text-[15px] font-medium tracking-[0.01em] text-[color:var(--text-primary)]">
              <ProductsMenu products={getProductsLite()} />
              <Link className="hover:opacity-80 px-3 py-2 rounded-lg" href="/about">About</Link>
              <Link className="hover:opacity-80 px-3 py-2 rounded-lg" href="/contact">Contact</Link>
            </nav>
          </div>
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-[color:var(--text-primary)] bg-[color:var(--brand-primary)]/80 ring-1 ring-white/30 hover:bg-[color:var(--brand-primary)]"
            >
              Get started
            </Link>
          </div>
          <MobileNav products={getProductsLite()} />
        </div>
      </div>
      {/* Slightly stronger blue tint overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[color:var(--brand-primary)]/20" />
    </header>
  );
}


