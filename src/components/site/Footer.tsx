import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import Logo from "./Logo";
import Container from "./Container";
import { SITE, WHATSAPP_URL } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/Button";

const columns = [
  {
    title: "Automação",
    links: [
      { href: "/servicos#whatsapp", label: "Automação de WhatsApp" },
      { href: "/servicos#ia", label: "Agentes de IA" },
      { href: "/servicos#integracoes", label: "Integrações e CRM" },
      { href: "/servicos#processos", label: "Processos internos" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { href: "/cases", label: "Cases" },
      { href: "/indicacoes", label: "Indica Beste" },
      { href: "/contato", label: "Contato" },
      { href: "/entrar", label: "Área do cliente" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-brand opacity-60" aria-hidden="true" />
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              Automação de WhatsApp, agentes de IA e integrações para empresas que querem vender e atender mais, sem
              aumentar a equipe.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10"
            >
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
              Fale com a gente no WhatsApp
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">{col.title}</div>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/70 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">Contato</div>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
                  <WhatsAppIcon className="h-4 w-4 shrink-0" />
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 break-all hover:text-white">
                  <Mail className="h-4 w-4 shrink-0" />
                  {SITE.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                {SITE.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Beste Web. Todos os direitos reservados.</span>
          <span>Feito com tecnologia própria em Curitiba.</span>
        </div>
      </Container>
    </footer>
  );
}
