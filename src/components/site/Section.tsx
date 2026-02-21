import { cn } from "@/lib/utils";

export default function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={cn("py-12 sm:py-16 md:py-24 lg:py-32", className)}>{children}</section>;
}
