import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code Snippet Image Studio — Create Beautiful Code Screenshots | SNIPCAST",
  description:
    "Paste your code, pick a theme, and export stunning code snippet images as PNG or SVG. 50+ languages, 18+ themes, gradient backgrounds, and full customization. Free, no signup required.",
  keywords: [
    "code snippet generator",
    "code to image tool",
    "code screenshot maker",
    "create code image online",
    "code to png",
    "code to svg",
    "syntax highlighting image",
    "code editor screenshot",
    "carbon alternative studio",
    "ray.so alternative studio",
  ],
  alternates: {
    canonical: "https://snipcast.dev/studio",
  },
  openGraph: {
    title: "SNIPCAST Studio — Create Beautiful Code Snippet Images",
    description:
      "Paste code, pick a theme, export as PNG or SVG. 50+ languages, 18+ themes. Free and open-source.",
    url: "https://snipcast.dev/studio",
    type: "website",
  },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
