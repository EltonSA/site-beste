import type { Metadata } from "next";
import { Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";
import Container from "@/components/site/Container";
import Section from "@/components/site/Section";
import PageHero from "@/components/site/PageHero";
import ContactForm from "@/components/site/ContactForm";
import { WhatsAppIcon } from "@/components/ui/Button";
import { SITE, WHATSAPP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Beste Web e agende um diagnóstico gratuito para automação, IA, sites ou micro-SaaS.",
};

const HOURS = [
  ["Segunda a sexta", "9h – 18h"],
  ["Sábado", "9h – 13h"],
  ["Domingo", "Fechado"],
];

export default async function ContatoPage({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  const params = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Contato"
        title={
          <>
            Vamos <span className="hl">conversar</span>
          </>
        }
        description="Envie os detalhes do seu projeto. Retornamos com um diagnóstico inicial e uma proposta personalizada."
      />

      <Section className="bg-slate-50 pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="-mt-10 grid gap-6 sm:-mt-14 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_30px_60px_-30px_rgb(8_19_58/0.3)] sm:p-10">
              {params?.ok === "1" && (
                <div className="mb-8 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <div>
                    <div className="font-semibold">Mensagem enviada com sucesso!</div>
                    <div className="text-sm text-emerald-800">Nossa equipe entrará em contato em breve.</div>
                  </div>
                </div>
              )}
              <h2 className="text-2xl font-bold text-navy-900">Conte sobre o seu projeto</h2>
              <p className="mt-2 text-slate-600">Leva menos de 2 minutos. Respondemos pessoalmente.</p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            <aside className="space-y-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-3xl bg-navy-950 p-6 text-white transition-colors hover:bg-navy-900"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] text-white">
                  <WhatsAppIcon className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
                    Resposta mais rápida
                  </span>
                  <span className="mt-1 block text-lg font-semibold">{SITE.phoneDisplay}</span>
                  <span className="block text-sm text-white/60 group-hover:text-white/80">Chamar no WhatsApp →</span>
                </span>
              </a>

              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-royal-50 text-royal-600">
                      <Mail className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">E-mail</span>
                      <a href={`mailto:${SITE.email}`} className="mt-0.5 block break-all font-semibold text-navy-900 hover:text-royal-600">
                        {SITE.email}
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-royal-50 text-royal-600">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Localização</span>
                      <span className="mt-0.5 block font-semibold text-navy-900">{SITE.location}</span>
                      <span className="block text-sm text-slate-500">Atendimento remoto em todo o Brasil</span>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-navy-900">
                  <Clock className="h-4 w-4 text-royal-600" />
                  Horário de atendimento
                </div>
                <dl className="mt-4 space-y-2.5 text-sm">
                  {HOURS.map(([d, h]) => (
                    <div key={d} className="flex justify-between border-b border-dashed border-slate-200 pb-2.5 last:border-0 last:pb-0">
                      <dt className="text-slate-600">{d}</dt>
                      <dd className="font-semibold text-navy-900">{h}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
