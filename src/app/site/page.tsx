import Link from "next/link";
import { ArrowRight, Bot, Cpu, Zap, LayoutTemplate } from "lucide-react";
import Container from "@/components/site/Container";
import Section from "@/components/site/Section";
import Card from "@/components/site/Card";
import CTA from "@/components/site/CTA";
import Badge from "@/components/site/Badge";

export default function HomePage() {
  return (
    <>
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge>Automação</Badge>
                <Badge>Integrações com IA</Badge>
                <Badge>Sites & Micro-SaaS</Badge>
              </div>

              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Construímos sistemas que <span className="text-blue-600">vendem</span>,{" "}
                <span className="text-orange-500">atendem</span> e{" "}
                <span className="text-blue-600">operam</span> sozinhos.
              </h1>

              <p className="text-lg text-zinc-600">
                A Beste Web entrega automações, integrações com inteligência artificial,
                desenvolvimento de sites e micro-SaaS com foco em resultado e velocidade.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contato"
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3 text-white shadow-sm hover:from-blue-700 hover:to-blue-800"
                >
                  Agendar diagnóstico <ArrowRight className="ml-2 h-4 w-4" />
                </Link>

                <Link
                  href="/cases"
                  className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-zinc-900 shadow-sm hover:border-orange-300 hover:bg-orange-50"
                >
                  Ver cases
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 text-sm text-zinc-600">
                <div>
                  <div className="text-2xl font-semibold text-zinc-900">+100</div>
                  <div>fluxos/integrações</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-zinc-900">IA</div>
                  <div>RAG, bots, agentes</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-zinc-900">MVP</div>
                  <div>micro-SaaS rápido</div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card
                icon={<Zap className="h-5 w-5" />}
                title="Automação"
                desc="n8n, Make, Bitrix, WhatsApp, pipelines e tarefas sem fricção."
              />
              <Card
                icon={<Bot className="h-5 w-5" />}
                title="IA aplicada"
                desc="Chatbots, atendimento, base de conhecimento, workflows inteligentes."
              />
              <Card
                icon={<LayoutTemplate className="h-5 w-5" />}
                title="Sites premium"
                desc="Landing pages rápidas, SEO, performance e conversão."
              />
              <Card
                icon={<Cpu className="h-5 w-5" />}
                title="Micro-SaaS"
                desc="MVP com login, cobrança, painel e métricas."
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="grid gap-6 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm lg:grid-cols-3">
            <div>
              <h2 className="text-xl font-semibold">Processo claro</h2>
              <p className="mt-2 text-zinc-600">
                Diagnóstico → Proposta → Implementação → Otimização contínua.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Entrega rápida</h3>
              <p className="mt-2 text-zinc-600">
                Primeiro valor em dias — depois evoluímos com segurança.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Foco em ROI</h3>
              <p className="mt-2 text-zinc-600">
                Menos tarefas manuais, mais previsibilidade, mais escala.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}
