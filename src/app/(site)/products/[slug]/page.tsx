import Link from "next/link";
import type { Metadata } from "next";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import { productBreadcrumbJsonLd } from "@/lib/seo";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Not found" };
  return {
    title: product.seo.title,
    description: product.seo.description,
  };
}

export default function ProductDetailPage({ params }: Params) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="text-2xl font-semibold text-[color:var(--text-primary)]">Not found</h1>
        <Link href="/products" className="underline">Back to products</Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productBreadcrumbJsonLd(product.name, product.slug)) }}
      />
      <div className="max-w-3xl">
        <h1 className="tib-main-title text-[color:var(--text-primary)]">{product.name}</h1>
        <p className="mt-4 tib-subhead text-[color:var(--text-secondary)]">{product.hero}</p>
      </div>
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="tib-section-title text-[color:var(--text-primary)]">Who needs this and why?</h2>
          <ul className="mt-4 list-disc pl-6 tib-body-md text-[color:var(--text-secondary)]">
            {product.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="tib-section-title text-[color:var(--text-primary)]">Learn more</h2>
          <ul className="mt-4 space-y-2 tib-body-sm">
            {product.resources.map((r) => (
              <li key={r.label}>
                <a className="underline" href={r.url} target="_blank" rel="noreferrer">
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-12">
        <Link
          href="/contact"
          className="tib-btn-primary inline-flex items-center justify-center rounded-xl px-5 py-3 text-[color:var(--text-primary)] bg-[color:var(--brand-primary)] ring-1 ring-white/30 hover:opacity-95"
        >
          Get started
        </Link>
      </div>
    </section>
  );
}


