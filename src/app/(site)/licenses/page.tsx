export const metadata = {
  title: "States & Licenses | The Insurance Box",
  description: "Licensing and states served information.",
};

import LicensesClient from "./LicensesClient";

export default function LicensesPage() {
  const demoStates = ["CA", "TX", "FL", "NY", "IL", "AZ", "NC"]; // placeholder
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <h1 className="tib-main-title text-[color:var(--text-primary)]">States & Licenses</h1>
      <p className="mt-4 tib-body-lg text-[color:var(--text-secondary)]">
        Serving clients nationwide. Detailed licenses and state information will be published prior to launch.
      </p>
      <div className="mt-8">
        {/* Interactive US map with highlighted states */}
        <LicensesClient states={demoStates} />
      </div>
      <div className="mt-8 tib-body-sm text-[color:var(--text-secondary)]">
        <span className="tib-section-title text-[color:var(--text-primary)]">Currently licensed (demo):</span>
        <ul className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {demoStates.map((s) => (
            <li key={s} className="rounded-lg border border-black/10 px-3 py-2 bg-white/60">{s}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}


