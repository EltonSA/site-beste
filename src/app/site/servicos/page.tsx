import Container from "@/components/site/Container";
import Section from "@/components/site/Section";
import CTA from "@/components/site/CTA";
import Badge from "@/components/site/Badge";

const services = [
  {
    title: "Automação e Integrações",
    items: [
      "n8n / Make / Zapier",
      "Bitrix24, CRM e pipelines",
      "WhatsApp, e-mail, formulários e rotinas",
      "Integrações com bancos de dados e APIs",
    ],
  },
  {
    title: "IA para atendimento e operação",
    items: [
      "Chatbots com base de conhecimento (RAG)",
      "Agentes para triagem e classificação",
      "Respostas com anexos (PDF, GIF, docs)",
      "Monitoramento e melhoria por métricas",
    ],
  },
  {
    title: "Sites e Landing Pages",
    items: [
      "Next.js + SEO + performance",
      "Design minimalista e tech premium",
      "Integração com CRM e automação de leads",
      "Páginas por oferta e teste A/B (quando fizer sentido)",
    ],
  },
  {
    title: "Micro-SaaS / MVP",
    items: [
      "Login, permissões, painel admin",
      "Assinaturas e cobrança (Stripe)",
      "Banco de dados (Postgres/Supabase)",
      "Deploy + observabilidade",
    ],
  },
];

export default function ServicosPage() {
  return (
    <>
      <Section className="pt-32 pb-20">
        <Container>
          <div className="space-y-6 mb-16">
            <Badge>Serviços</Badge>
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-zinc-900">
              O que a{" "}
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                Beste Web
              </span>{" "}
              entrega
            </h1>
            <p className="text-xl leading-relaxed text-zinc-600 max-w-3xl">
              Escolha um pacote ou montamos uma solução sob medida para o seu negócio.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {services.map((s, index) => (
              <div
                key={s.title}
                className="group relative overflow-hidden rounded-3xl glass border border-white/30 p-8 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h2 className="text-2xl font-bold text-zinc-900 mb-6">{s.title}</h2>
                <ul className="space-y-3 text-zinc-600">
                  {s.items.map((i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-orange-500 mt-2 flex-shrink-0"></span>
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}
