import Link from "next/link";
import Container from "@/components/site/Container";
import { Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-orange-50/30 to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>

      <Container>
        <div className="relative glass rounded-3xl p-12 lg:p-16 shadow-2xl border border-white/20 overflow-hidden">
          {/* Decoração de fundo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-orange-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-orange-500 animate-pulse" />
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Pronto para começar?</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 mb-4">
              Quer um{" "}
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                diagnóstico rápido?
              </span>
            </h2>
            
            <p className="text-lg leading-relaxed text-zinc-600 mb-8 max-w-2xl">
              Me diga o que você quer automatizar ou construir — eu te devolvo um plano objetivo e executável.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/contato"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 px-8 py-4 font-semibold text-white shadow-2xl shadow-blue-500/30 transition-all duration-300 hover:shadow-3xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10">Falar com a Beste Web</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                href="/servicos"
                className="group rounded-2xl border-2 border-zinc-200 bg-white/80 backdrop-blur-sm px-8 py-4 font-semibold text-zinc-900 shadow-lg transition-all duration-300 hover:border-orange-300 hover:bg-orange-50/50 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                Ver serviços
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
