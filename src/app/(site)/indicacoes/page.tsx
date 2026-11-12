import type { Metadata } from "next";
import { Mail, Globe, Scale, Calculator, ShieldCheck } from "lucide-react";
import Container from "@/components/site/Container";
import Section from "@/components/site/Section";
import PageHero from "@/components/site/PageHero";
import { WhatsAppIcon } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Indica Beste",
  description: "Parceiros de confiança indicados pela Beste Web nas áreas de advocacia e contabilidade.",
};

const partners = [
  {
    category: "Advocacia",
    icon: Scale,
    name: "Dra. Lidiane Perdigão",
    phone: "55 92 9479-8502",
    email: "lidiane_perdigao@yahoo.com.br",
    site: null as string | null,
  },
  {
    category: "Contábil",
    icon: Calculator,
    name: "Audicor — Auditoria e Contabilidade SS",
    phone: "48 9193-6126",
    email: "contato@audicor.com.br",
    site: null as string | null,
  },
  {
    category: "Contábil",
    icon: Calculator,
    name: "Share — Contabilidade",
    phone: "(53) 3302-6397",
    email: "escritoriocontabilmarcosamir@outlook.com",
    site: null as string | null,
  },
];

export default function IndicaBestePage() {
  return (
    <>
      <PageHero
        eyebrow="Indica Beste"
        title={
          <>
            Parceiros <span className="hl">indicados</span>
          </>
        }
        description="Profissionais e empresas que conhecemos de perto e recomendamos com confiança."
      />

      <Section className="bg-slate-50">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((p) => {
              const Icon = p.icon;
              return (
                <article key={p.name} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal-50 text-royal-600">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{p.category}</span>
                  </div>
                  <h2 className="mt-6 text-xl font-bold leading-snug text-navy-900">{p.name}</h2>

                  <ul className="mt-6 space-y-3 border-t border-slate-100 pt-6 text-sm">
                    <li>
                      <a
                        href={`https://wa.me/${p.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-slate-700 hover:text-royal-600"
                      >
                        <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25D366]" />
                        {p.phone}
                      </a>
                    </li>
                    <li>
                      <a href={`mailto:${p.email}`} className="flex items-center gap-3 break-all text-slate-700 hover:text-royal-600">
                        <Mail className="h-4 w-4 shrink-0 text-slate-400" />
                        {p.email}
                      </a>
                    </li>
                    {p.site && (
                      <li>
                        <a
                          href={p.site}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-slate-700 hover:text-royal-600"
                        >
                          <Globe className="h-4 w-4 shrink-0 text-slate-400" />
                          {p.site}
                        </a>
                      </li>
                    )}
                  </ul>
                </article>
              );
            })}
          </div>

          <div className="mt-12 flex flex-col items-start gap-5 rounded-3xl border border-slate-200 bg-white p-8 sm:flex-row sm:items-center sm:p-10">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-royal-600 text-white">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-navy-900">Parceiros de confiança</h2>
              <p className="mt-1.5 leading-relaxed text-slate-600">
                Indicamos apenas profissionais que conhecemos pessoalmente. Se você precisa de serviços de advocacia ou
                contabilidade, pode contar com eles.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
