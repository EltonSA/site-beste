import { ArrowRight } from "lucide-react";
import Container from "./Container";
import LogoMark from "./LogoMark";
import { ButtonLink, WhatsAppIcon } from "@/components/ui/Button";
import { WHATSAPP_URL } from "@/lib/site";

export default function CTA({
  title = "Pronto para colocar seu atendimento no automático?",
  description = "Conte como funciona seu atendimento hoje. Devolvemos um diagnóstico gratuito com os fluxos que mais vão gerar resultado — com escopo, prazo e investimento.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-royal-600 px-6 py-14 sm:px-12 sm:py-20 lg:px-20">
          <div className="absolute inset-0 bg-grid-dark opacity-70" aria-hidden="true" />
          <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-brand-blue/40 blur-[90px]" aria-hidden="true" />
          <div className="absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-brand-orange/35 blur-[90px]" aria-hidden="true" />
          <LogoMark className="pointer-events-none absolute -right-10 -bottom-6 hidden h-auto w-[380px] opacity-[0.18] lg:block" />

          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem] text-balance">
              {title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">{description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contato" variant="white" size="lg">
                Quero automatizar
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href={WHATSAPP_URL} external variant="ghost-dark" size="lg">
                <WhatsAppIcon />
                Chamar no WhatsApp
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
