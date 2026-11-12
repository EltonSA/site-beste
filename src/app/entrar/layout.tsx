import type { Metadata } from "next";
import Navbar from "@/components/site/Navbar";

export const metadata: Metadata = {
  title: "Área do cliente",
  robots: { index: false, follow: false },
};

export default function EntrarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-b from-royal-50 via-white to-white">
      <div className="absolute inset-0 bg-dots-light mask-fade-b" aria-hidden="true" />
      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-brand-blue/20 blur-[110px]" aria-hidden="true" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-brand-orange/15 blur-[110px]" aria-hidden="true" />
      <Navbar />
      <main className="relative">{children}</main>
    </div>
  );
}
