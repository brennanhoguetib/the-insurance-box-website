import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";

type Props = {
  slug: string;
  name: string;
  summary: string;
};

export default function ProductCard({ slug, name, summary }: Props) {
  return (
    <Link href={`/products/${slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-primary)] rounded-2xl">
      <GlassCard className="p-6 h-full hover:opacity-95 transition">
        <h3 className="text-lg font-semibold text-[color:var(--text-primary)]">{name}</h3>
        <p className="mt-2 text-[color:var(--text-secondary)]">{summary}</p>
        <span className="mt-4 inline-block text-sm text-[color:var(--text-primary)]">Learn more →</span>
      </GlassCard>
    </Link>
  );
}


