import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/20 bg-surface/60 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-10 grid gap-6 md:grid-cols-2 tib-body-sm text-[color:var(--text-secondary)]">
        <p className="tib-body-sm">
          Our help is free. If you enroll, the carrier may pay us a standard commission. We never accept
          payment to recommend one plan over another.
        </p>
        <nav className="flex items-center gap-6 justify-start md:justify-end tib-label-md-caps text-[color:var(--text-primary)]">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/licenses">Licenses</Link>
        </nav>
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-8 tib-body-xs text-[color:var(--text-secondary)]">
        © {new Date().getFullYear()} The Insurance Box
      </div>
    </footer>
  );
}


