import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code Editor Themes & Syntax Highlighting Previews | SNIPCAST",
  description:
    "Explore 18+ stunning code editor themes for your snippet images. From dark mode classics like Dracula and Nord to vibrant gradients. Preview and apply themes instantly in the SNIPCAST studio.",
  keywords: [
    "code editor themes",
    "syntax highlighting themes",
    "code color schemes",
    "dark mode code theme",
    "dracula theme preview",
    "nord theme code",
    "monokai code theme",
    "code snippet themes",
    "best code editor themes 2025",
    "code image themes",
  ],
  alternates: {
    canonical: "https://snipcast.dev/themes",
  },
  openGraph: {
    title: "SNIPCAST Themes — 18+ Stunning Code Editor Color Schemes",
    description:
      "Preview and apply gorgeous syntax highlighting themes for your code snippet images. Dark mode, light mode, and gradient options.",
    url: "https://snipcast.dev/themes",
    type: "website",
  },
};

export default function ThemesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
