"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { NAV_LINKS } from "@/lib/site";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * Header fixo claro. Transparente no topo e branco com blur ao rolar.
 * Use `solid` em páginas que precisam do fundo desde o início (ex.: /dashboard).
 */
export default function Navbar({ solid = false }: { solid?: boolean }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Fecha o menu mobile ao trocar de rota
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  const filled = solid || scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        filled
          ? "border-b border-slate-200/80 bg-white/90 shadow-[0_1px_12px_-6px_rgb(8_19_58/0.15)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-[72px] lg:px-8">
        <Logo tone="light" />

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  active ? "bg-navy-900/5 text-navy-900" : "text-slate-600 hover:text-navy-900",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/entrar" className="px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-navy-900">
            Entrar
          </Link>
          <Link href="/contato" className={buttonClasses("dark", "md")}>
            Quero automatizar
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 rounded-lg p-2 text-navy-900 md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="space-y-1 px-4 py-4">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "block rounded-xl px-4 py-3 text-base font-semibold",
                  pathname === l.href ? "bg-slate-100 text-navy-900" : "text-slate-700 hover:bg-slate-50",
                )}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/entrar" className="block rounded-xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50">
              Área do cliente
            </Link>
            <div className="pt-3">
              <Link href="/contato" className={buttonClasses("dark", "lg", "w-full")}>
                Quero automatizar
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
