import type { Metadata } from "next";
import Navbar from "@/components/site/Navbar";

export const metadata: Metadata = {
  title: "CRM de Leads",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-slate-50">
      <Navbar solid />
      <main>{children}</main>
    </div>
  );
}
