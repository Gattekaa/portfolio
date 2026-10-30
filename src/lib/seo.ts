import type { Metadata } from "next";
import { copy, profile, type Locale } from "./content";

export function pageMetadata(
  lang: Locale,
  path = "",
  title?: string,
  description?: string,
): Metadata {
  const t = copy[lang];
  const url = `${profile.site}/${lang}${path}`;
  return {
    metadataBase: new URL(profile.site),
    title: title || t.title,
    description: description || t.description,
    authors: [{ name: profile.name, url: profile.site }],
    creator: profile.name,
    alternates: {
      canonical: url,
      languages: {
        "pt-BR": `${profile.site}/pt${path}`,
        en: `${profile.site}/en${path}`,
        "x-default": `${profile.site}/pt${path}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: profile.name,
      locale: lang === "pt" ? "pt_BR" : "en_US",
      alternateLocale: [lang === "pt" ? "en_US" : "pt_BR"],
      url,
      title: title || t.title,
      description: description || t.description,
      images: [
        {
          url: "/og",
          width: 1200,
          height: 630,
          alt: `${profile.name} | Software Engineer`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title || t.title,
      description: description || t.description,
      images: ["/og"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
      : {}),
  };
}

export function personSchema(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${profile.site}/#person`,
    name: profile.name,
    url: `${profile.site}/${lang}`,
    image: `${profile.site}/images/vinicius.png`,
    jobTitle: copy[lang].role,
    description: copy[lang].description,
    sameAs: [profile.linkedin, profile.github],
    knowsAbout: [
      "Frontend architecture",
      "React",
      "Next.js",
      "TypeScript",
      "Design Systems",
      "C#",
      ".NET",
      "Ruby on Rails",
      "PostgreSQL",
      "Automated testing",
    ],
    knowsLanguage: ["pt-BR", "en"],
  };
}
