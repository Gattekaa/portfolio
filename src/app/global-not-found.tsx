import type { Metadata } from "next";
import { NotFoundContent } from "@/components/not-found-content";
import { outfit } from "@/lib/fonts";
import { themeScript } from "@/lib/theme";
import { SiteBackground } from "@/components/site-background";
import { GoogleTag } from "@/components/google-tag";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 | Vinicius Martins",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" className={outfit.variable} suppressHydrationWarning>
      <head>
        <GoogleTag />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="relative isolate">
        <SiteBackground />
        <NotFoundContent standalone />
      </body>
    </html>
  );
}
