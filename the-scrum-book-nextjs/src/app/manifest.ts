import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Scrum Book",
    short_name: "Scrum Book",
    description:
      "Your ultimate rugby league companion for fixtures, stats, and matchday planning.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c4b5a",
    theme_color: "#0c4b5a",
    orientation: "portrait-primary",
    scope: "/",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };
}
