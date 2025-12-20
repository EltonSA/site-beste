import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://besteweb.com.br";
  const routes = ["", "/servicos", "/cases", "/micro-saas", "/indicacoes", "/contato"];

  return routes.map((r) => ({
    url: `${baseUrl}${r}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: r === "" ? 1 : 0.7,
  }));
}
