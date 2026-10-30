import { notFound } from "next/navigation";
import { isLocale, profile, projects } from "@/lib/content";
import { pageMetadata, personSchema } from "@/lib/seo";
import { HomePage } from "@/components/home-page";
import { JsonLd } from "@/components/json-ld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return pageMetadata(lang);
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            personSchema(lang),
            {
              "@type": "WebSite",
              "@id": `${profile.site}/#website`,
              name: profile.name,
              url: profile.site,
              inLanguage: ["pt-BR", "en"],
              author: { "@id": `${profile.site}/#person` },
            },
            {
              "@type": "ItemList",
              itemListElement: projects.map((project, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `${profile.site}/${lang}/projetos/${project.slug}`,
                name: project.title,
              })),
            },
          ],
        }}
      />
      <HomePage lang={lang} />
    </>
  );
}
