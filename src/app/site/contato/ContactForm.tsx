"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const services = [
  "Automação de processos",
  "Integrações com IA",
  "Desenvolvimento de sites",
  "Micro-SaaS",
  "Chatbot e atendimento",
  "Integração de sistemas",
  "Outro",
];

export default function ContactForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
          service: formData.get("service"),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Limpa o formulário
        (e.target as HTMLFormElement).reset();
        router.push("/contato?ok=1");
        router.refresh();
      } else {
        setError(result.message || "Erro ao enviar formulário. Tente novamente.");
      }
    } catch (err) {
      setError("Erro ao enviar formulário. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-6 rounded-3xl glass border border-white/30 p-8 lg:p-10 shadow-xl"
    >
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-semibold text-zinc-900">
          Nome / Empresa <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          required
          placeholder="Seu nome ou nome da empresa"
          className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-3.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-semibold text-zinc-900">
          E-mail <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="seu@email.com"
          className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-3.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="phone" className="text-sm font-semibold text-zinc-900">
          WhatsApp <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          placeholder="(41) 99999-9999"
          className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-3.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="service" className="text-sm font-semibold text-zinc-900">
          Qual serviço você precisa? <span className="text-red-500">*</span>
        </label>
        <select
          id="service"
          name="service"
          required
          className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-3.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
        >
          <option value="">Selecione um serviço</option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-semibold text-zinc-900">
          Mensagem / Descrição do produto <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="Descreva seu projeto, necessidades ou dúvidas..."
          className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-3.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
        />
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="relative overflow-hidden rounded-2xl !bg-gradient-to-r !from-blue-600 !via-blue-500 !to-orange-500 px-8 py-4 font-semibold text-white shadow-2xl shadow-blue-500/30 transition-all duration-300 hover:shadow-3xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="relative z-10 block">
          {isSubmitting ? "Enviando..." : "Enviar mensagem"}
        </span>
      </button>
    </form>
  );
}
