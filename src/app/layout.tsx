import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "The Insurance Box",
  description: "Insurance made simple. Compare top plans, get plain-English explanations, and enroll with no extra cost.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
