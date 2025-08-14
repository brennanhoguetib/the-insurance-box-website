"use client";
import Link from "next/link";
import { useState } from "react";

type ProductLite = { slug: string; name: string; summary: string };

export default function MobileNav({ products }: { products: ProductLite[] }) {
  const [open, setOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  return (
    <div className="md:hidden">
      <button
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="px-3 py-2 rounded-lg hover:bg-white/40"
      >
        ☰
      </button>
      {open && (
        <div className="absolute left-0 right-0 mt-2 mx-4 rounded-2xl bg-white p-4 ring-1 ring-black/10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)] z-[80]">
          <nav className="flex flex-col gap-2">
            <button
              className="px-3 py-2 rounded-lg text-left hover:bg-black/[.04]"
              aria-expanded={showProducts}
              onClick={() => setShowProducts((v) => !v)}
            >
              Products
            </button>
            {showProducts && (
              <div className="grid grid-cols-1 gap-1">
                {products.map((p) => (
                  <Link key={p.slug} href={`/products/${p.slug}`} className="px-3 py-2 rounded-lg hover:bg-black/[.04]">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-sm text-[color:var(--text-secondary)]">{p.summary}</div>
                  </Link>
                ))}
              </div>
            )}
            <Link href="/about" className="px-3 py-2 rounded-lg hover:bg-black/[.04]">About</Link>
            <Link href="/contact" className="px-3 py-2 rounded-lg hover:bg-black/[.04]">Contact</Link>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-[color:var(--text-primary)] bg-[color:var(--brand-primary)] ring-1 ring-black/5 hover:opacity-95"
              >
                Get started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}


