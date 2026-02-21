import Container from "@/components/site/Container";
import Section from "@/components/site/Section";
import Badge from "@/components/site/Badge";
import ContactForm from "../site/contato/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";

export default async function ContatoPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const params = await searchParams;
  return (
    <>
      <Section className="pt-16 md:pt-10 pb-16 md:pb-20">
        <Container>
          <div className="space-y-6 mb-16">
            <Badge>Contato</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900">
              Vamos{" "}
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                conversar
              </span>
            </h1>
            <p className="text-lg sm:text-xl leading-relaxed text-zinc-600 max-w-3xl">
              Envie os detalhes do seu projeto e a Beste Web retorna com um diagnóstico inicial e proposta personalizada.
            </p>
          </div>

          {params?.ok === "1" && (
            <div className="mb-8 rounded-2xl border border-green-200 bg-green-50 p-6 text-green-800 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                  ✓
                </div>
                <div>
                  <div className="font-semibold text-lg">Mensagem enviada com sucesso!</div>
                  <div className="text-sm">Entraremos em contato em breve.</div>
                </div>
              </div>
            </div>
          )}

          <div className="grid gap-8 md:gap-12 lg:grid-cols-2 lg:items-start">
            {/* Formulário */}
            <div>
              <ContactForm />
            </div>

            {/* Informações de Contato */}
            <div className="space-y-8">
              <div className="glass rounded-3xl p-8 shadow-xl border border-white/30">
                <h2 className="text-2xl font-bold text-zinc-900 mb-6">Informações de Contato</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-1">E-mail</div>
                      <a
                        href="mailto:contato@besteweb.com.br"
                        className="text-lg font-semibold text-zinc-900 hover:text-blue-600 transition-colors"
                      >
                        contato@besteweb.com.br
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-1">WhatsApp</div>
                      <a
                        href="https://wa.me/5541984706670?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20servi%C3%A7os%20da%20Beste%20Web."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-zinc-900 hover:text-green-600 transition-colors"
                      >
                        (41) 99830-6017
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-1">Localização</div>
                      <div className="text-lg font-semibold text-zinc-900">
                        Curitiba, PR - Brasil
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card de Horário */}
              <div className="glass rounded-3xl p-8 shadow-xl border border-white/30">
                <h3 className="text-xl font-bold text-zinc-900 mb-4">Horário de Atendimento</h3>
                <div className="space-y-2 text-zinc-600">
                  <div className="flex justify-between">
                    <span>Segunda a Sexta</span>
                    <span className="font-semibold text-zinc-900">9h - 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábado</span>
                    <span className="font-semibold text-zinc-900">9h - 13h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingo</span>
                    <span className="font-semibold text-zinc-900">Fechado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

