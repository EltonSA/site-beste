export const SITE = {
  name: "Beste Web",
  url: "https://besteweb.com.br",
  email: "contato@besteweb.com.br",
  phoneDisplay: "(41) 98470-6670",
  phoneDigits: "5541984706670",
  location: "Curitiba, PR — Brasil",
};

export const WHATSAPP_URL = `https://wa.me/${SITE.phoneDigits}?text=${encodeURIComponent(
  "Olá, vim pelo site e gostaria de mais informações sobre os serviços da Beste Web.",
)}`;

export const NAV_LINKS = [
  { href: "/servicos", label: "Soluções" },
  { href: "/cases", label: "Cases" },
  { href: "/indicacoes", label: "Indica Beste" },
  { href: "/contato", label: "Contato" },
];
