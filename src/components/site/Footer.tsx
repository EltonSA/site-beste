import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="relative border-t border-zinc-200/50 bg-white/50 backdrop-blur-sm">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-8 lg:px-12 md:grid-cols-3">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm leading-relaxed text-zinc-600 max-w-xs">
            Automação, IA e desenvolvimento para escalar negócios com tecnologia inteligente.
          </p>
        </div>

        <div className="text-sm">
          <div className="font-bold text-zinc-900 mb-4">Mapa do site</div>
          <div className="grid gap-3">
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
          <div className="font-bold text-zinc-900 mb-4">Contato</div>
          <div className="grid gap-3">
            <a
              href="https://wa.me/5541998306017"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 transition-colors hover:text-blue-600 font-medium"
            >
              WhatsApp: (41) 99830-6017
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

      <div className="border-t border-zinc-200/50 bg-zinc-50/30 backdrop-blur-sm py-6 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Beste Web. Todos os direitos reservados.
      </div>
    </footer>
  );
}
