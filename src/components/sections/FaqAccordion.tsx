"use client";
import data from "@/content/faq.json";
import { useState } from "react";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <h2 className="tib-main-title text-[color:var(--text-primary)] mb-8">Frequently asked questions</h2>
      <div className="divide-y divide-white/30 rounded-2xl bg-white/40 backdrop-blur-xl ring-1 ring-white/30 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)]">
        {data.map((item, idx) => {
          const isOpen = openIndex === idx;
          const buttonId = `faq-btn-${idx}`;
          const panelId = `faq-panel-${idx}`;
          return (
            <div key={item.q}>
              <button
                id={buttonId}
                aria-controls={panelId}
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left px-6 py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-primary)]"
              >
                <span className="block tib-section-title text-[color:var(--text-primary)]">{item.q}</span>
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className="px-6 pb-6 tib-body-md text-[color:var(--text-secondary)]"
              >
                {item.a}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


