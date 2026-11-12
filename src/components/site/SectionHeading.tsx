import Badge from "./Badge";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Badge tone={tone}>{eyebrow}</Badge>}
      <h2
        className={cn(
          "mt-4 text-3xl font-extrabold leading-[1.12] sm:text-4xl lg:text-[2.75rem] text-balance",
          tone === "dark" ? "text-white" : "text-navy-900",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg text-balance",
            tone === "dark" ? "text-white/65" : "text-slate-600",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
