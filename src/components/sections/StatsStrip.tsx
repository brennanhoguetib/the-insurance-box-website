import stats from "@/content/stats.json";

export default function StatsStrip() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="rounded-2xl bg-white/40 backdrop-blur-xl ring-1 ring-white/30 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)]">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/30">
          <div className="p-6">
            <p className="tib-label-md-caps text-[color:var(--text-secondary)]">Policies placed</p>
            <p className="tib-num-lg text-[color:var(--text-primary)]">{stats.policiesPlaced}</p>
          </div>
          <div className="p-6">
            <p className="tib-label-md-caps text-[color:var(--text-secondary)]">States served</p>
            <p className="tib-num-lg text-[color:var(--text-primary)]">{stats.statesServed}</p>
          </div>
          <div className="p-6">
            <p className="tib-label-md-caps text-[color:var(--text-secondary)]">Support</p>
            <p className="tib-num-lg text-[color:var(--text-primary)]">{stats.supportAvailability}</p>
          </div>
        </div>
      </div>
    </section>
  );
}


