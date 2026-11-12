import Image from "next/image";
import { Check } from "lucide-react";
import Container from "./Container";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import { TEAM } from "@/content/team";
import { cn } from "@/lib/utils";

export default function TeamSection() {
  return (
    <Section className="bg-white">
      <Container>
        <SectionHeading
          eyebrow="Nosso time"
          title={
            <>
              As pessoas por trás de <span className="hl">cada automação</span>
            </>
          }
          description="Cada projeto passa pelas mãos de especialistas em áreas complementares, do diagnóstico à otimização."
        />

        <div className="mx-auto mt-16 max-w-6xl space-y-16 sm:space-y-24">
          {TEAM.map((m, i) => {
            const Icon = m.icon;
            const reverse = i % 2 === 1;
            return (
              <article key={m.name} className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
                <div className={cn("mx-auto w-full max-w-[380px] md:max-w-[420px]", reverse && "md:order-2")}>
                  <div className={cn("relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-b ring-1 ring-slate-200/80", m.backdrop)}>
                    <div className="absolute inset-0 bg-dots-light opacity-60" aria-hidden="true" />
                    <Image
                      src={m.photo}
                      alt={`Foto de ${m.name}`}
                      fill
                      sizes="(min-width: 768px) 420px, 90vw"
                      className="object-cover object-bottom"
                    />
                  </div>
                </div>

                <div className={cn("text-center md:text-left", reverse && "md:order-1")}>
                  <span className={cn("inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold", m.accent)}>
                    <Icon className="h-4 w-4" />
                    {m.area}
                  </span>
                  <h3 className="mt-5 text-3xl font-extrabold text-navy-900 sm:text-4xl">{m.name}</h3>
                  <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-slate-600 md:mx-0">{m.description}</p>

                  <div className="mx-auto mt-7 max-w-lg rounded-2xl bg-slate-50 p-5 text-left ring-1 ring-slate-200/70 md:mx-0">
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Na prática</div>
                    <ul className="mt-3 space-y-2.5">
                      {m.functions.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-[0.95rem] font-medium text-navy-900">
                          <span className={cn("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full", m.accent)}>
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <ul className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
                    {m.skills.map((s) => (
                      <li key={s} className="rounded-full bg-white px-3 py-1 text-[13px] font-medium text-slate-600 ring-1 ring-slate-200">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
