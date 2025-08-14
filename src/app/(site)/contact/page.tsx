"use client";
import { useEffect, useRef, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { contactSchema } from "@/lib/validation/contact";

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const startRef = useRef<number>(Date.now());

  useEffect(() => {
    startRef.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      zip: String(formData.get("zip") || ""),
      interests: Array.from(formData.getAll("interests")).map(String),
      message: String(formData.get("message") || ""),
      consent: Boolean(formData.get("consent")),
      honey: String(formData.get("honey") || ""),
      ttfb: Date.now() - startRef.current,
      source: document.referrer || "",
    };
    const parse = contactSchema.safeParse(payload);
    if (!parse.success) {
      alert(parse.error.issues[0]?.message || "Please check your inputs");
      return;
    }
    try {
      setSubmitting(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.ok) {
        setSuccess(true);
        form.reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <header className="max-w-3xl">
        <h1 className="tib-main-title text-[color:var(--text-primary)]">Get your quote</h1>
        <p className="mt-3 tib-subhead text-[color:var(--text-secondary)]">We’ll reach out shortly with friendly, no‑pressure help.</p>
      </header>
      <GlassCard className="mt-8 p-6 md:p-8">
        {success ? (
          <p className="tib-body-lg text-[color:var(--text-primary)]">Thanks! Your request was received. We’ll be in touch soon.</p>
        ) : (
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="honey" className="hidden" aria-hidden defaultValue="" />
            <div>
              <label className="tib-input-label text-[color:var(--text-primary)]" htmlFor="name">Name</label>
              <input id="name" name="name" className="mt-1 w-full rounded-lg border border-black/10 bg-white/80 px-3 py-2 tib-input-text" required />
            </div>
            <div>
              <label className="tib-input-label text-[color:var(--text-primary)]" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" className="mt-1 w-full rounded-lg border border-black/10 bg-white/80 px-3 py-2 tib-input-text" required />
            </div>
            <div>
              <label className="tib-input-label text-[color:var(--text-primary)]" htmlFor="phone">Phone</label>
              <input id="phone" name="phone" className="mt-1 w-full rounded-lg border border-black/10 bg-white/80 px-3 py-2 tib-input-text" required />
            </div>
            <div>
              <label className="tib-input-label text-[color:var(--text-primary)]" htmlFor="zip">ZIP</label>
              <input id="zip" name="zip" pattern="\d{5}" className="mt-1 w-full rounded-lg border border-black/10 bg-white/80 px-3 py-2 tib-input-text" required />
            </div>
            <div className="md:col-span-2">
              <span className="tib-input-label text-[color:var(--text-primary)]">Coverage interests</span>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {["Life Insurance","Health Insurance","Medicare","Long-Term Care","Disability Insurance","Annuities","Financial Advisement"].map((p) => (
                  <label key={p} className="flex items-center gap-2 rounded-lg border border-black/10 bg-white/60 px-3 py-2">
                    <input type="checkbox" name="interests" value={p} />
                    <span className="tib-body-sm text-[color:var(--text-primary)]">{p}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="tib-input-label text-[color:var(--text-primary)]" htmlFor="message">Message (optional)</label>
              <textarea id="message" name="message" rows={4} className="mt-1 w-full rounded-lg border border-black/10 bg-white/80 px-3 py-2 tib-body-sm" />
            </div>
            <div className="md:col-span-2 flex items-start gap-2">
              <input id="consent" name="consent" type="checkbox" required />
              <label htmlFor="consent" className="tib-body-sm text-[color:var(--text-secondary)]">
                I agree to be contacted about my options. Our help is free. If you enroll, the carrier may pay us a standard
                commission. We never accept payment to recommend one plan over another.
              </label>
            </div>
            <div className="md:col-span-2 mt-2">
              <button disabled={submitting} className="tib-btn-primary inline-flex items-center justify-center rounded-xl px-5 py-3 text-[color:var(--text-primary)] bg-[color:var(--brand-primary)] ring-1 ring-white/30 hover:opacity-95">
                {submitting ? "Sending..." : "Submit"}
              </button>
            </div>
          </form>
        )}
      </GlassCard>
    </section>
  );
}


