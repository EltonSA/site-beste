import Container from "./Container";
import Badge from "./Badge";

/** Cabeçalho claro padrão das páginas internas. Use <span className="hl"> para destacar palavras. */
export default function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-royal-50 via-white to-white pt-32 pb-14 sm:pt-40 sm:pb-20">
      <div className="absolute inset-0 bg-dots-light mask-fade-b" aria-hidden="true" />
      <div className="absolute -right-32 -top-20 h-80 w-80 rounded-full bg-brand-orange/15 blur-[100px]" aria-hidden="true" />
      <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-brand-blue/20 blur-[100px]" aria-hidden="true" />
      <Container className="relative">
        <div className="max-w-3xl animate-fade-up">
          <Badge>{eyebrow}</Badge>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] text-navy-900 sm:text-5xl lg:text-6xl text-balance">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 text-balance">{description}</p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
