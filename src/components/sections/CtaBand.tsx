export default function CtaBand() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="rounded-2xl bg-white/40 backdrop-blur-xl ring-1 ring-white/30 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-[color:var(--text-primary)]">Ready to get your quote?</h3>
          <p className="mt-2 text-[color:var(--text-secondary)]">It’s fast, friendly, and free.</p>
        </div>
        <a
          href="/contact"
          className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-base font-medium text-[color:var(--text-primary)] bg-[color:var(--brand-primary)] ring-1 ring-white/30 hover:opacity-95"
        >
          Get my quote
        </a>
      </div>
    </section>
  );
}


