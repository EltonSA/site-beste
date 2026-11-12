import { cn } from "@/lib/utils";

/** Rótulo "eyebrow" acima de títulos. tone="dark" para fundos escuros. */
export default function Badge({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        tone === "dark"
          ? "border border-white/15 bg-white/5 text-white/80"
          : "border border-royal-600/15 bg-royal-50 text-royal-700",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" aria-hidden="true" />
      {children}
    </span>
  );
}
