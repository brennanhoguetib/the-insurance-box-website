import Link from "next/link";
import ValueProps from "@/components/sections/ValueProps";
import Testimonials from "@/components/sections/Testimonials";
import StatsStrip from "@/components/sections/StatsStrip";
import FaqAccordion from "@/components/sections/FaqAccordion";
import CtaBand from "@/components/sections/CtaBand";
export default function Home() {
  return (
    <section className="relative isolate">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="tib-hero-title text-[color:var(--text-primary)]">Insurance made simple.</h1>
          <p className="mt-6 tib-body-lg tib-subheader-text text-[color:var(--text-secondary)]">
            Compare top plans, get plain-English explanations, and enroll with no extra cost.
          </p>
          {/* JSON-LD: Organization */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'The Insurance Box',
                url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
                logo: (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000') + '/the-insurance-box-logo.png',
              }),
            }}
          />
          <div className="mt-10 flex items-center gap-4">
            <Link
              href="/contact"
              className="tib-btn-primary inline-flex items-center justify-center rounded-xl px-5 py-3 text-[color:var(--text-primary)] bg-[color:var(--brand-primary)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)] ring-1 ring-white/30 hover:opacity-95"
            >
              Get my quote
            </Link>
            <button
              className="tib-btn-secondary inline-flex items-center justify-center rounded-xl px-5 py-3 text-[color:var(--text-primary)] bg-white/40 backdrop-blur-xl ring-1 ring-white/30 hover:bg-white/50"
            >
              Browse products
            </button>
          </div>
        </div>
      </div>
      {/* Sections */}
      <ValueProps />
      <Testimonials />
      <StatsStrip />
      <FaqAccordion />
      <CtaBand />
    </section>
  );
}
