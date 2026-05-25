import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SNIPCAST — Code Snippet Image Generator",
    short_name: "SNIPCAST",
    description:
      "Create beautiful, shareable code snippet images with syntax highlighting, custom themes, and one-click export. Free and open source.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#FF9F0A",
    orientation: "portrait-primary",
    categories: ["developer tools", "productivity", "utilities"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
