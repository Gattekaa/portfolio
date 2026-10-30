import type { MetadataRoute } from "next";
import { profile, projects } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/curriculo",
    ...projects.map((project) => `/projetos/${project.slug}`),
  ];
  return paths.flatMap((path) =>
    (["pt", "en"] as const).map((lang) => ({
      url: `${profile.site}/${lang}${path}`,
      alternates: {
        languages: {
          "pt-BR": `${profile.site}/pt${path}`,
          en: `${profile.site}/en${path}`,
          "x-default": `${profile.site}/pt${path}`,
        },
      },
    })),
  );
}
