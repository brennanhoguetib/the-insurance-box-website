import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function GlassCard({ children, className = "" }: Props) {
  return (
    <div
      className={`rounded-2xl bg-white/40 backdrop-blur-xl ring-1 ring-white/30 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)] ${className}`}
    >
      {children}
    </div>
  );
}


