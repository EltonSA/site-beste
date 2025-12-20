import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Beste Web — Automação, IA e Desenvolvimento",
    template: "%s • Beste Web",
  },
  description:
    "Agência de tecnologia focada em automação, integrações com inteligência artificial, sites e micro-SaaS.",
  metadataBase: new URL("https://besteweb.com.br"),
  openGraph: {
    title: "Beste Web — Automação, IA e Desenvolvimento",
    description:
      "Automação, integrações com IA, desenvolvimento de sites e micro-SaaS.",
    type: "website",
    images: ["/og/og-default.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
