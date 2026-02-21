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
    icon: "/faveicon.ico",
  },
};

const GTM_ID = "GTM-TWVQRZBM";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
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
