"use client";

export default function Card({
  icon,
  title,
  desc,
  delay = "0",
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay?: string;
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-3xl glass border border-white/30 p-8 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-fadeInUp"
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Gradiente de fundo animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Ícone com gradiente */}
      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-orange-500 text-white shadow-lg shadow-blue-500/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
        {icon}
      </div>
      
      <h3 className="relative z-10 mt-6 text-xl font-bold text-zinc-900">{title}</h3>
      <p className="relative z-10 mt-3 text-sm leading-relaxed text-zinc-600">{desc}</p>
      
      {/* Efeito de brilho no hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </div>
  );
}
