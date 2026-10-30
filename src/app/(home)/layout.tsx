import type { Metadata } from "next";
import { profile } from "@/lib/content";
export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: "Vinicius Martins | Software Engineer",
};
export default function RedirectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
