import Link from "next/link";
import LogoMark from "./LogoMark";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** "dark" = texto claro, para fundos escuros. "light" = texto escuro, para fundos claros. */
  tone?: "dark" | "light";
}

export default function Logo({ className, tone = "dark" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Beste Web — página inicial"
      className={cn("inline-flex items-center gap-2.5 transition-opacity hover:opacity-90", className)}
    >
      <LogoMark className="h-7 w-auto shrink-0" />
      <span
        className={cn(
          "font-display text-[1.35rem] leading-none tracking-tight whitespace-nowrap",
          tone === "dark" ? "text-white" : "text-navy-900",
        )}
      >
        <span className="font-bold">beste</span>{" "}
        <span className={cn("font-light", tone === "dark" ? "text-white/75" : "text-navy-900/70")}>web</span>
      </span>
    </Link>
  );
}
