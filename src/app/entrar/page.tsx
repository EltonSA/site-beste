"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/site/Container";
import Section from "@/components/site/Section";
import Badge from "@/components/site/Badge";
import { LogIn, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Verificar se já está autenticado
    fetch("/api/auth/check")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          router.push("/dashboard");
        }
      });
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(data.message || "Credenciais inválidas");
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section className="pt-16 md:pt-1 pb-16 md:pb-40 min-h-screen flex items-center">
      <Container>
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Badge>Área Restrita</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 mt-4">
              Entrar no{" "}
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                CRM
              </span>
            </h1>
            <p className="text-zinc-600 mt-3">
              Acesse o painel de controle de leads
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="glass rounded-3xl p-8 shadow-xl border border-white/30 space-y-6"
          >
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
                className="w-full rounded-2xl border border-zinc-200 bg-white/80 px-4 py-3.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full rounded-2xl border border-zinc-200 bg-white/80 px-4 py-3.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full group relative overflow-hidden rounded-2xl !bg-gradient-to-r !from-blue-600 !via-blue-500 !to-orange-500 px-8 py-4 font-semibold text-white shadow-2xl shadow-blue-500/30 transition-all duration-300 hover:shadow-3xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <LogIn className="w-5 h-5" />
                {loading ? "Entrando..." : "Entrar"}
              </span>
            </button>
          </form>
        </div>
      </Container>
    </Section>
  );
}

