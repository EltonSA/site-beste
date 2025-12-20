import Link from "next/link";

interface LogoProps {
  showText?: boolean;
  className?: string;
}

export default function Logo({ showText = true, className = "" }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 text-lg font-bold tracking-tight transition-opacity hover:opacity-80 ${className}`}>
      <div className="relative inline-block" style={{ width: "2.5rem", height: "2.5rem" }}>
        {/* Primeiro B - azul escuro, posicionado no topo esquerdo */}
        <span className="absolute left-0 top-0 text-blue-600 text-xl leading-none">B</span>
        
        {/* Símbolo & - cinza médio, posicionado entre os Bs, sobrepondo ambos */}
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-0.5 text-zinc-500 text-sm leading-none z-10">&</span>
        
        {/* Segundo B - laranja, invertido, posicionado abaixo e à direita */}
        <span className="absolute right-0 bottom-2 text-orange-500 scale-x-[-1] inline-block text-xl leading-none">B</span>
      </div>
      {showText && <span className="text-zinc-900">Beste Web</span>}
    </Link>
  );
}

