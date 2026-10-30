import localFont from "next/font/local";
export const outfit = localFont({
  src: "../../public/fonts/outfit-latin-variable.woff2",
  variable: "--font-outfit",
  display: "swap",
  weight: "100 900",
  preload: true,
});
