import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vinicius Martins | Software Engineer",
    short_name: "Vinicius Martins",
    description: "Frontend architecture and full stack software engineering.",
    start_url: "/pt",
    display: "browser",
    background_color: "#111210",
    theme_color: "#111210",
    icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }],
  };
}
