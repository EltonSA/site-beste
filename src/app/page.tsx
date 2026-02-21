import Link from "next/link";
import { ArrowRight, Bot, Cpu, Zap, LayoutTemplate, Sparkles } from "lucide-react";
import Container from "@/components/site/Container";
import Section from "@/components/site/Section";
import Card from "@/components/site/Card";
import CTA from "@/components/site/CTA";
import Badge from "@/components/site/Badge";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ChatSimulation from "@/components/site/ChatSimulation";
import Chatbot from "@/components/site/Chatbot";

export default function HomePage() {
  return (
    <div className="min-h-dvh relative">
      {/* Background gradiente sutil */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 -z-20"></div>
      
      {/* Padrão de pontos decorativo */}
      <div className="fixed inset-0 -z-10 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>
      
      <Navbar />
      <main className="pt-14 sm:pt-16 md:pt-20">
        {/* Hero Section Moderna */}
        <Section className="pt-2 sm:pt-4 md:pt-8 pb-10 sm:pb-14 md:pb-20 overflow-hidden relative">
          {/* Background decorativo animado */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-orange-500/5 rounded-full blur-3xl animate-rotate-slow"></div>
          </div>

          <Container>
            <div className="grid gap-8 sm:gap-10 md:gap-12 lg:gap-16 lg:grid-cols-2 lg:items-center relative z-10">
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <div className="animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
                    <Badge>Automação</Badge>
                  </div>
                  <div className="animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
                    <Badge>Integrações com IA</Badge>
                  </div>
                  <div className="animate-slide-in-left" style={{ animationDelay: "0.3s" }}>
                    <Badge>Sites & Micro-SaaS</Badge>
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-zinc-900 leading-[1.15]">
                  Sistemas que{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 bg-clip-text text-transparent animate-gradient">
                      vendem
                    </span>
                    <Sparkles className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 text-orange-500 animate-pulse animate-wiggle" />
                  </span>
                  ,{" "}
                  <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                    atendem
                  </span>{" "}
                  e{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    operam
                  </span>{" "}
                  sozinhos.
                </h1>

                <p className="text-base sm:text-lg md:text-xl leading-relaxed text-zinc-600 max-w-2xl text-balance">
                  Transformamos processos manuais em sistemas inteligentes. Automação, IA e desenvolvimento que geram resultados reais.
                </p>

                <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center">
                  <Link
                    href="/contato"
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 px-6 py-3.5 sm:px-8 sm:py-4 font-semibold text-white shadow-2xl shadow-blue-500/30 transition-all duration-300 hover:shadow-3xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] text-center text-sm sm:text-base"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Agendar diagnóstico
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1 shrink-0" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>

                  <Link
                    href="/cases"
                    className="group rounded-2xl border-2 border-zinc-200 bg-white/80 backdrop-blur-sm px-6 py-3.5 sm:px-8 sm:py-4 font-semibold text-zinc-900 shadow-lg transition-all duration-300 hover:border-orange-300 hover:bg-orange-50/50 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] text-center text-sm sm:text-base"
                  >
                    Ver cases
                  </Link>
                </div>

                {/* Stats modernos */}
                <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 pt-8 sm:pt-10 md:pt-12 border-t border-zinc-200/50">
                  <div className="space-y-0.5 sm:space-y-1 group text-center sm:text-left">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block">+100</div>
                    <div className="text-xs sm:text-sm font-medium text-zinc-500">fluxos/integrações</div>
                  </div>
                  <div className="space-y-0.5 sm:space-y-1 group text-center sm:text-left">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block animate-pulse-glow">IA</div>
                    <div className="text-xs sm:text-sm font-medium text-zinc-500">RAG, bots, agentes</div>
                  </div>
                  <div className="space-y-0.5 sm:space-y-1 group text-center sm:text-left">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block">MVP</div>
                    <div className="text-xs sm:text-sm font-medium text-zinc-500">micro-SaaS rápido</div>
                  </div>
                </div>
              </div>

              {/* Cards Grid Moderno */}
              <div className="grid gap-3 sm:gap-4 md:gap-6 sm:grid-cols-2 lg:gap-6">
                <div className="animate-bounce-slow" style={{ animationDelay: "0s" }}>
                  <Card
                    icon={<Zap className="h-6 w-6 animate-pulse-glow" />}
                    title="Automação"
                    desc="n8n, Make, Bitrix, WhatsApp, pipelines e tarefas sem fricção."
                    delay="0"
                  />
                </div>
                <div className="animate-bounce-slow" style={{ animationDelay: "0.5s" }}>
                  <Card
                    icon={<Bot className="h-6 w-6 animate-pulse-glow" />}
                    title="IA aplicada"
                    desc="Chatbots, atendimento, base de conhecimento, workflows inteligentes."
                    delay="100"
                  />
                </div>
                <div className="animate-bounce-slow" style={{ animationDelay: "1s" }}>
                  <Card
                    icon={<LayoutTemplate className="h-6 w-6 animate-pulse-glow" />}
                    title="Sites premium"
                    desc="Landing pages rápidas, SEO, performance e conversão."
                    delay="200"
                  />
                </div>
                <div className="animate-bounce-slow" style={{ animationDelay: "1.5s" }}>
                  <Card
                    icon={<Cpu className="h-6 w-6 animate-pulse-glow" />}
                    title="Micro-SaaS"
                    desc="MVP com login, cobrança, painel e métricas."
                    delay="300"
                  />
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Seção de Processo Moderna */}
        <Section className="pt-0">
          <Container>
            <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-14 shadow-2xl border border-white/20">
              <div className="grid gap-8 sm:gap-10 lg:grid-cols-3">
                <div className="space-y-3 sm:space-y-4 group animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-bounce-slow">
                    1
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">Processo claro</h2>
                  <p className="text-sm sm:text-base leading-relaxed text-zinc-600">
                    Diagnóstico → Proposta → Implementação → Otimização contínua.
                  </p>
                </div>
                <div className="space-y-3 sm:space-y-4 group animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg shadow-orange-500/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-bounce-slow" style={{ animationDelay: "0.5s" }}>
                    2
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-900">Entrega rápida</h3>
                  <p className="text-sm sm:text-base leading-relaxed text-zinc-600">
                    Primeiro valor em dias — depois evoluímos com segurança.
                  </p>
                </div>
                <div className="space-y-3 sm:space-y-4 group animate-slide-in-left" style={{ animationDelay: "0.3s" }}>
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-bounce-slow" style={{ animationDelay: "1s" }}>
                    3
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-900">Foco em ROI</h3>
                  <p className="text-sm sm:text-base leading-relaxed text-zinc-600">
                    Menos tarefas manuais, mais previsibilidade, mais escala.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Seção de Simulação de Chat com IA */}
        <Section className="pt-0">
          <Container>
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 mt-2 sm:mt-4 mb-2 sm:mb-4 px-1">
                Veja como nossa{" "}
                <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                  IA conversa
                </span>{" "}
                com seus clientes
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-zinc-600 max-w-2xl mx-auto px-2">
                Simulação real de como um chatbot inteligente atende e qualifica leads automaticamente.
              </p>
            </div>
            <ChatSimulation />
          </Container>
        </Section>

        <CTA />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
