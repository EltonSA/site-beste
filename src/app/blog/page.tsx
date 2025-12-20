import Container from "@/components/site/Container";
import Section from "@/components/site/Section";
import Badge from "@/components/site/Badge";
import { Phone, Mail, Globe, Briefcase, Scale, Calculator } from "lucide-react";

const partners = [
  {
    category: "Advocacia",
    icon: Scale,
    color: "from-purple-500 to-indigo-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    name: "Dra. Lidiane Perdigão",
    phone: "55 92 9479-8502",
    email: "lidiane_perdigao@yahoo.com.br",
    site: null,
  },
  {
    category: "Contabil",
    icon: Calculator,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    name: "Audicor - Auditoria e Contabilidade SS",
    phone: "48 9193-6126",
    email: "contato@audicor.com.br",
    site: null,
  },
  {
    category: "Contabil",
    icon: Calculator,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    name: "Share - Contabilidade",
    phone: "(53) 3302-6397",
    email: "escritoriocontabilmarcosamir@outlook.com",
    site: null,
  },
];

export default function IndicaBestePage() {
  return (
    <Section className="pt-16 md:pt-10 pb-16 md:pb-20">
      <Container>
        <div className="space-y-6 mb-16">
          <Badge>Indica Beste</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900">
            Parceiros{" "}
            <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              indicados
            </span>
          </h1>
          <p className="text-xl leading-relaxed text-zinc-600 max-w-3xl">
            Conheça nossos parceiros de confiança. Indicamos apenas profissionais e empresas que conhecemos e recomendamos.
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, index) => {
            const Icon = partner.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl glass border border-white/30 p-8 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Categoria Badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${partner.bgColor} ${partner.borderColor} border mb-4`}>
                  <div className={`w-4 h-4 rounded bg-gradient-to-br ${partner.color}`}></div>
                  <span className="text-xs font-semibold text-zinc-700">{partner.category}</span>
                </div>

                {/* Nome */}
                <h2 className="text-2xl font-bold text-zinc-900 mb-6">{partner.name}</h2>

                {/* Informações de Contato */}
                <div className="space-y-4">
                  <a
                    href={`https://wa.me/${partner.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-zinc-700 hover:text-green-600 transition-colors group/item"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${partner.color} flex items-center justify-center text-white shadow-lg group-hover/item:scale-110 transition-transform`}>
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider">WhatsApp</div>
                      <div className="font-semibold">{partner.phone}</div>
                    </div>
                  </a>

                  <a
                    href={`mailto:${partner.email}`}
                    className="flex items-center gap-3 text-zinc-700 hover:text-blue-600 transition-colors group/item"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${partner.color} flex items-center justify-center text-white shadow-lg group-hover/item:scale-110 transition-transform`}>
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider">E-mail</div>
                      <div className="font-semibold text-sm break-all">{partner.email}</div>
                    </div>
                  </a>

                  {partner.site && (
                    <a
                      href={partner.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-zinc-700 hover:text-orange-600 transition-colors group/item"
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${partner.color} flex items-center justify-center text-white shadow-lg group-hover/item:scale-110 transition-transform`}>
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-zinc-500 uppercase tracking-wider">Site</div>
                        <div className="font-semibold text-sm">{partner.site}</div>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Seção de Informação */}
        <div className="mt-20 glass rounded-3xl p-10 lg:p-14 shadow-2xl border border-white/20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center text-white shadow-lg mx-auto mb-6">
              <Briefcase className="w-8 h-8" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mb-4">
              Parceiros de{" "}
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                confiança
              </span>
            </h2>
            <p className="text-lg text-zinc-600 leading-relaxed">
              Trabalhamos apenas com profissionais e empresas que conhecemos pessoalmente e recomendamos com confiança. 
              Se você precisa de serviços de advocacia ou contabilidade, pode contar com nossos parceiros indicados.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

