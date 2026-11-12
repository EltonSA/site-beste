import { useId } from "react";

/**
 * Símbolo "bb" da Beste Web: dois "b" cujos bojos formam um infinito,
 * com o gradiente azul → violeta → amarelo → laranja da marca.
 */
export default function LogoMark({ className = "h-8 w-auto" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const grad = `bb-grad-${id}`;
  const shade = `bb-shade-${id}`;

  return (
    <svg viewBox="0 0 116 66" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={grad} x1="4" y1="0" x2="112" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4FB6F7" />
          <stop offset="0.3" stopColor="#5E8EF2" />
          <stop offset="0.5" stopColor="#8FC9E8" />
          <stop offset="0.6" stopColor="#F2D84A" />
          <stop offset="0.8" stopColor="#FF9A33" />
          <stop offset="1" stopColor="#FF6B2C" />
        </linearGradient>
        <linearGradient id={shade} x1="0" y1="20" x2="0" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0.55" stopColor="#5B5BD6" stopOpacity="0" />
          <stop offset="1" stopColor="#5B5BD6" stopOpacity="0.45" />
        </linearGradient>
      </defs>

      <g stroke={`url(#${grad})`} strokeWidth="9">
        {/* hastes dos dois "b" */}
        <path d="M10.5 2v40" />
        <path d="M60.5 2v34" />
        {/* infinito formado pelos bojos */}
        <path
          strokeLinejoin="round"
          d="M58 42c8.5-11 14-16 24-16 12.2 0 21.5 7 21.5 16s-9.3 16-21.5 16c-10 0-15.5-5-24-16S43.5 26 33.5 26C21.3 26 10.5 33 10.5 42s10.8 16 23 16c10 0 15.5-5 24.5-16Z"
        />
      </g>
      <path
        d="M58 42c-8.5 11-14 16-24.5 16-12.2 0-23-7-23-16"
        stroke={`url(#${shade})`}
        strokeWidth="9"
      />
    </svg>
  );
}
