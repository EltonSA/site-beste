"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/servicos", label: "Serviços" },
  { href: "/cases", label: "Cases" },
  { href: "/indicacoes", label: "Indica Beste" },
  { href: "/contato", label: "Contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Fechar menu mobile ao redimensionar para desktop
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-white/20 shadow-lg shadow-black/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-12">
        <Logo />

        {/* Desktop Menu */}
        <div className="hidden items-center gap-6 lg:gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-zinc-700 transition-all duration-300 hover:text-blue-600 relative group"
            >
              {l.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          <Link
            href="/entrar"
            className="relative overflow-hidden rounded-full !bg-gradient-to-r !from-blue-600 !via-blue-500 !to-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Entrar</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-zinc-700 hover:bg-zinc-100 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute inset-x-0 top-full glass border-b border-white/20 shadow-lg bg-white/95 backdrop-blur-lg">
          <div className="px-4 py-6 space-y-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-zinc-700 hover:text-blue-600 transition-colors py-2"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/entrar"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center rounded-full !bg-gradient-to-r !from-blue-600 !via-blue-500 !to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40"
            >
              Entrar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
