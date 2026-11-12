import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Beste Web — Automação de WhatsApp, IA e Processos",
    template: "%s • Beste Web",
  },
  description:
    "A Beste Web cria automações de WhatsApp, agentes de IA e integrações que atendem, qualificam leads, agendam e alimentam seu CRM 24 horas por dia.",
  metadataBase: new URL("https://besteweb.com.br"),
  openGraph: {
    title: "Beste Web — Automação de WhatsApp, IA e Processos",
    description:
      "Seu WhatsApp vendendo e atendendo no automático, com IA e integrações ao seu CRM.",
    type: "website",
    locale: "pt_BR",
    siteName: "Beste Web",
    images: ["/og/og-default.png"],
  },
  icons: {
    icon: "/faveicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#08133a",
};

const GTM_ID = "GTM-TWVQRZBM";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
