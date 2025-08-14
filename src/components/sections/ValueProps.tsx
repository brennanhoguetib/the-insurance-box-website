import GlassCard from "@/components/ui/GlassCard";

const items = [
  {
    title: "Plain-English guidance",
    body: "We explain your options clearly so you can choose with confidence.",
  },
  {
    title: "Compare top carriers",
    body: "We shop top-rated companies to find plans that fit your needs.",
  },
  {
    title: "Enroll with confidence",
    body: "We help you apply and stay on track—at no extra cost to you.",
  },
];

export default function ValueProps() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <h2 className="tib-main-title text-[color:var(--text-primary)] mb-8">
        Why The Insurance Box?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <GlassCard key={item.title} className="p-6">
            <h3 className="tib-section-title text-[color:var(--text-primary)]">
              {item.title}
            </h3>
            <p className="mt-2 tib-body-md text-[color:var(--text-secondary)]">{item.body}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}


