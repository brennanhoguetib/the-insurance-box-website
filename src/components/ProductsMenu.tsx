"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

// We read products at build-time via a serialized prop to avoid fs in client.
type ProductLite = { slug: string; name: string; summary: string };

export default function ProductsMenu({ products }: { products: ProductLite[] }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target) && buttonRef.current && !buttonRef.current.contains(target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <div className="relative group z-[60]">
      <button
        ref={buttonRef}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="px-3 py-2 rounded-lg hover:bg-white/40 focus-visible:ring-2 focus-visible:ring-[color:var(--brand-primary)] text-[15px] font-medium tracking-[0.01em]"
      >
        Products
      </button>
      {(open) && (
        <div
          ref={menuRef}
          role="menu"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="absolute left-0 mt-2 w-[min(90vw,720px)] rounded-2xl bg-white ring-1 ring-black/10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.25)] p-5 grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              role="menuitem"
              className="group flex items-start gap-4 rounded-xl p-4 hover:bg-black/[.035] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-primary)]"
            >
              <span
                aria-hidden
                className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--brand-primary)] text-[color:var(--text-primary)] shadow-[0_8px_18px_-10px_rgba(0,0,0,0.25)]"
              >
                ●
              </span>
              <span className="flex-1">
                <span className="block text-[15px] font-medium tracking-[0.005em] text-[color:var(--text-primary)]">{p.name}</span>
                <span className="block text-[14px] leading-5 text-[color:var(--text-secondary)]">{p.summary}</span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}


