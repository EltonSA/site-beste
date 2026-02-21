import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="relative border-t border-zinc-200/50 bg-white/50 backdrop-blur-sm">
      <div className="mx-auto grid max-w-7xl gap-8 sm:gap-10 md:gap-12 px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-12 md:grid-cols-3">
        <div className="space-y-3 sm:space-y-4">
          <Logo />
          <p className="text-xs sm:text-sm leading-relaxed text-zinc-600 max-w-xs">
            Automação, IA e desenvolvimento para escalar negócios com tecnologia inteligente.
          </p>
        </div>

        <div className="text-sm">
          <div className="font-bold text-zinc-900 mb-3 sm:mb-4">Mapa do site</div>
          <div className="grid gap-2 sm:gap-3">
            <Link href="/servicos" className="text-zinc-600 transition-colors hover:text-blue-600 font-medium">
              Serviços
            </Link>
            <Link href="/cases" className="text-zinc-600 transition-colors hover:text-blue-600 font-medium">
              Cases
            </Link>
            <Link href="/indicacoes" className="text-zinc-600 transition-colors hover:text-blue-600 font-medium">
              Indica Beste
            </Link>
            <Link href="/contato" className="text-zinc-600 transition-colors hover:text-blue-600 font-medium">
              Contato
            </Link>
          </div>
        </div>

        <div className="text-sm">
          <div className="font-bold text-zinc-900 mb-3 sm:mb-4">Contato</div>
          <div className="grid gap-2 sm:gap-3">
            <a
              href="https://wa.me/5541984706670?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20servi%C3%A7os%20da%20Beste%20Web."
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 transition-colors hover:text-blue-600 font-medium"
            >
              WhatsApp: (41) 98470-6670
            </a>
            <a
              href="mailto:contato@besteweb.com.br"
              className="text-zinc-600 transition-colors hover:text-blue-600 font-medium"
            >
              E-mail: contato@besteweb.com.br
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-200/50 bg-zinc-50/30 backdrop-blur-sm py-4 sm:py-6 text-center text-xs text-zinc-500 px-4">
        © {new Date().getFullYear()} Beste Web. Todos os direitos reservados.
      </div>
    </footer>
  );
}
