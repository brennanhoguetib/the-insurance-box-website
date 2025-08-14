import GlassCard from "@/components/ui/GlassCard";

export const metadata = {
  title: "About Us | The Insurance Box",
  description:
    "We put customers first with clear guidance, top‑carrier comparisons, and enrollment help at no extra cost.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <header className="max-w-3xl">
        <h1 className="tib-main-title text-[color:var(--text-primary)]">
          About The Insurance Box
        </h1>
        <p className="mt-4 tib-subheader-text text-[color:var(--text-secondary)]">
          Insurance made simple. We guide you in plain English, compare top carriers, and help you enroll—at
          no extra cost.
        </p>
      </header>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <h2 className="tib-section-title text-[color:var(--text-primary)]">Why we’re different</h2>
          <ul className="mt-3 list-disc pl-5 tib-body-md text-[color:var(--text-secondary)]">
            <li>Clear, plain‑English explanations</li>
            <li>Top‑rated carrier comparisons</li>
            <li>Guidance tailored to your needs</li>
          </ul>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="tib-section-title text-[color:var(--text-primary)]">Customer‑first promise</h2>
          <ul className="mt-3 list-disc pl-5 tib-body-md text-[color:var(--text-secondary)]">
            <li>No pressure—ever</li>
            <li>Keep your doctors and prescriptions where possible</li>
            <li>Friendly help before, during, and after enrollment</li>
          </ul>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="tib-section-title text-[color:var(--text-primary)]">How we’re paid</h2>
          <p className="mt-3 tib-body-md text-[color:var(--text-secondary)]">
            Our help is free. If you enroll, the carrier may pay us a standard commission. We never accept
            payment to recommend one plan over another.
          </p>
        </GlassCard>
      </div>

      <GlassCard className="p-6 mt-12">
        <h2 className="tib-section-title text-[color:var(--text-primary)]">States & licenses</h2>
        <p className="mt-3 tib-body-md text-[color:var(--text-secondary)]">
          Serving clients nationwide. A detailed list of states and license numbers will be published prior to
          launch.
        </p>
      </GlassCard>

      <div className="mt-12">
        <a
          href="/contact"
          className="tib-btn-primary inline-flex items-center justify-center rounded-xl px-5 py-3 text-[color:var(--text-primary)] bg-[color:var(--brand-primary)] ring-1 ring-white/30 hover:opacity-95"
        >
          Get started
        </a>
      </div>
    </section>
  );
}


