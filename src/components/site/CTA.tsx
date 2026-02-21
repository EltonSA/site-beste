import Link from "next/link";
import Container from "@/components/site/Container";
import { Sparkles } from "lucide-react";
import { WHATSAPP_URL } from "@/components/site/WhatsAppButton";

export default function CTA() {
  return (
    <section className="py-10 sm:py-14 md:py-20 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-orange-50/30 to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>

      <Container>
        <div className="relative glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-2xl border border-white/20 overflow-hidden">
          {/* Decoração de fundo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-orange-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 animate-pulse shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wider">Pronto para começar?</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-zinc-900 mb-3 sm:mb-4">
              Quer um{" "}
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                diagnóstico rápido?
              </span>
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-zinc-600 mb-6 sm:mb-8 max-w-2xl">
              Me diga o que você quer automatizar ou construir — eu te devolvo um plano objetivo e executável.
            </p>

            <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:flex-wrap">
              <Link
                href="/contato"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 px-6 py-3.5 sm:px-8 sm:py-4 font-semibold text-white shadow-2xl shadow-blue-500/30 transition-all duration-300 hover:shadow-3xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] text-center text-sm sm:text-base"
              >
                <span className="relative z-10">Falar com a Beste Web</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3.5 sm:px-8 sm:py-4 font-semibold text-white shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#25D366]/40 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 sm:h-5 sm:w-5 shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
              <Link
                href="/servicos"
                className="group rounded-2xl border-2 border-zinc-200 bg-white/80 backdrop-blur-sm px-6 py-3.5 sm:px-8 sm:py-4 font-semibold text-zinc-900 shadow-lg transition-all duration-300 hover:border-orange-300 hover:bg-orange-50/50 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] text-center text-sm sm:text-base"
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
