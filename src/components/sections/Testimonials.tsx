import GlassCard from "@/components/ui/GlassCard";
import data from "@/content/testimonials.json";

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <h2 className="tib-main-title text-[color:var(--text-primary)] mb-8">
        What clients say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((t) => (
          <GlassCard key={t.name} className="p-6 h-full">
            <p className="tib-body-md text-[color:var(--text-primary)]">“{t.quote}”</p>
            <p className="mt-4 tib-label-md-caps text-[color:var(--text-secondary)]">{t.name}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}


