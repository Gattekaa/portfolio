import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { copy, isLocale, locales, profile } from "@/lib/content";
import { outfit } from "@/lib/fonts";
import { themeScript } from "@/lib/theme";
import { Header } from "@/components/site-controls";
import { Footer } from "@/components/shared";
import { SiteBackground } from "@/components/site-background";
import { GoogleTag } from "@/components/google-tag";
import "../globals.css";

export const dynamicParams = false;
export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon", apple: "/icon" },
};
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = copy[lang];
  return (
    <html lang={t.locale} className={outfit.variable} suppressHydrationWarning>
      <head>
        <GoogleTag />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="relative isolate">
        <SiteBackground />
        <a
          href="#main-content"
          className="fixed left-6 top-3 z-40 -translate-y-[180%] rounded-xl bg-gold px-5 py-3 text-on-gold focus:translate-y-0 print:hidden"
        >
          {t.skip}
        </a>
        <Header
          lang={lang}
          labels={t.nav}
          menuLabel={t.menu}
          closeLabel={t.close}
          themeLabel={t.theme}
        />
        {children}
        <Footer lang={lang} />
      </body>
    </html>
  );
}
