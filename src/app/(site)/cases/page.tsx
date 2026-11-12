import type { Metadata } from "next";
import Container from "@/components/site/Container";
import Section from "@/components/site/Section";
import PageHero from "@/components/site/PageHero";
import CaseCard from "@/components/site/CaseCard";
import CTA from "@/components/site/CTA";
import { CASES } from "@/content/cases";

export const metadata: Metadata = {
  title: "Cases",
  description: "Micro-SaaS, automações e sites desenvolvidos pela Beste Web, com resultados mensuráveis para nossos clientes.",
};

export default function CasesPage() {
  const groups = [
    { title: "Micro-SaaS de atendimento", items: CASES.filter((c) => c.type === "Micro-SaaS"), cols: "md:grid-cols-2" },
    { title: "Sites e landing pages", items: CASES.filter((c) => c.type === "Site"), cols: "md:grid-cols-2 lg:grid-cols-3" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Cases de sucesso"
        title={
          <>
            Resultados que <span className="hl">transformam</span> negócios
          </>
        }
        description="Sistemas e sites que geraram resultados mensuráveis para nossos clientes — em atendimento, vendas e operação."
      />

      <Section className="bg-slate-50">
        <Container>
          <div className="space-y-20">
            {groups.map((g) => (
              <div key={g.title}>
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">{g.title}</h2>
                  <span className="h-px flex-1 bg-slate-200" />
                  <span className="text-sm font-medium text-slate-500">{g.items.length} projetos</span>
                </div>
                <div className={`mt-8 grid gap-5 ${g.cols}`}>
                  {g.items.map((c) => (
                    <CaseCard key={c.id} item={c} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTA title="Seu projeto pode ser o próximo case." />
    </>
  );
}
