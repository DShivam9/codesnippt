import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import InteractiveMascot from "@/components/InteractiveMascot";
import { Analytics } from "@vercel/analytics/react";

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const interFont = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://snipcast.dev";
const SITE_NAME = "SNIPCAST";
const SITE_DESCRIPTION =
  "Create beautiful code snippet images for free. Turn source code into stunning, shareable screenshots with syntax highlighting, custom themes, gradient backgrounds, and one-click export. The best code-to-image generator for developers.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // ── Core Title & Description ──────────────────────────────────
  title: {
    default:
      "SNIPCAST — Free Code Snippet Image Generator | Code to Image Tool",
    template: "%s | SNIPCAST",
  },
  description: SITE_DESCRIPTION,

  // ── Keyword-Rich Fields ───────────────────────────────────────
  keywords: [
    // Primary high-volume keywords
    "code snippet image generator",
    "code to image",
    "code screenshot tool",
    "code image generator",
    "source code to image",
    "code to png",

    // Long-tail / intent keywords
    "create beautiful code images",
    "code snippet screenshot maker",
    "code image creator online",
    "share code as image",
    "code to image converter",
    "beautiful code screenshots",
    "code image for social media",
    "code image for twitter",
    "code image for blog",

    // Feature keywords
    "syntax highlighting image",
    "code with gradient background",
    "code editor screenshot",
    "code theme preview",
    "export code as png",
    "export code as svg",
    "code window mockup",

    // Competitor alternative keywords
    "carbon alternative",
    "ray.so alternative",
    "snappify alternative",
    "chalk.ist alternative",
    "code snap alternative",

    // Language-specific keywords
    "javascript code image",
    "python code screenshot",
    "typescript code image",
    "react code snippet image",
    "rust code screenshot",
    "go code image generator",

    // Developer workflow keywords
    "developer tool",
    "free developer tool",
    "open source code tool",
    "code presentation tool",
    "code documentation image",
    "code snippet for slides",

    // Brand
    "snipcast",
    "snipcast code",
  ],

  // ── Authorship & Application ──────────────────────────────────
  applicationName: SITE_NAME,
  authors: [{ name: "SNIPCAST Team", url: SITE_URL }],
  creator: "SNIPCAST",
  publisher: "SNIPCAST",
  generator: "Next.js",

  // ── Canonical & Alternates ────────────────────────────────────
  alternates: {
    canonical: SITE_URL,
  },

  // ── Category ──────────────────────────────────────────────────
  category: "Developer Tools",

  // ── Robots ────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Open Graph (Facebook, LinkedIn, Discord) ──────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title:
      "SNIPCAST — Free Code Snippet Image Generator | Turn Code Into Beautiful Images",
    description:
      "Create stunning, shareable code snippet images in seconds. 18+ editor themes, gradient backgrounds, syntax highlighting for 30+ languages, and one-click PNG/SVG export. Free, open-source, and runs entirely in your browser.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "SNIPCAST — Beautiful Code Snippet Image Generator",
        type: "image/png",
      },
    ],
  },

  // ── Twitter Card ──────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "SNIPCAST — Free Code Snippet Image Generator",
    description:
      "Turn source code into beautiful, shareable images. 18+ themes, gradient backgrounds, and one-click export. Free & open-source.",
    images: [`${SITE_URL}/og-image.png`],
    creator: "@snipcast",
    site: "@snipcast",
  },

  // ── Icons ─────────────────────────────────────────────────────
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // ── Verification (add your actual IDs when ready) ─────────────
  // verification: {
  //   google: "YOUR_GOOGLE_SEARCH_CONSOLE_ID",
  //   yandex: "YOUR_YANDEX_ID",
  //   yahoo: "YOUR_YAHOO_ID",
  // },

  // ── Other ─────────────────────────────────────────────────────
  other: {
    "msapplication-TileColor": "#FF9F0A",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": SITE_NAME,
  },
};

// ── JSON-LD Structured Data ───────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebApplication", "SoftwareApplication"],
      "@id": `${SITE_URL}/#app`,
      name: "SNIPCAST — Free Code Snippet Image Generator",
      alternateName: ["SNIPCAST", "Snipcast Code Image Tool"],
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      applicationCategory: "DeveloperApplication",
      applicationSubCategory: "Code Screenshot Tool",
      operatingSystem: "Web Browser",
      browserRequirements: "Requires JavaScript. Works in Chrome, Firefox, Safari, Edge.",
      permissions: "none",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      featureList: [
        "Code to image conversion",
        "50+ programming language support with auto-detection",
        "18+ syntax highlighting themes",
        "Gradient and animated backgrounds",
        "Custom padding, border radius, and shadow controls",
        "PNG and SVG high-resolution export",
        "Browser-based — no account or signup required",
        "Fully open source on GitHub",
        "Carbon alternative",
        "Ray.so alternative",
        "Snappify alternative",
      ],
      screenshot: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        caption: "SNIPCAST code snippet image generator studio interface",
      },
      softwareVersion: "1.0.0",
      datePublished: "2025-01-01",
      inLanguage: "en",
      isAccessibleForFree: true,
      creator: {
        "@type": "Organization",
        name: "SNIPCAST",
        url: SITE_URL,
        sameAs: [
          "https://github.com/DShivam9/SNIPCAST",
        ],
      },
      potentialAction: {
        "@type": "UseAction",
        target: `${SITE_URL}/studio`,
        name: "Open SNIPCAST Studio",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/favicon.ico`,
        },
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Is SNIPCAST really free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, 100%. No paywalls, no subscriptions. SNIPCAST is a free, open-source code snippet image generator. Just jump into the studio and start rendering beautiful code images.",
          },
        },
        {
          "@type": "Question",
          name: "What programming languages does SNIPCAST support?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "SNIPCAST supports syntax highlighting for 30+ programming languages including JavaScript, TypeScript, Python, Rust, Go, C++, Swift, Kotlin, Ruby, PHP, and dozens more. If you can code in it, SNIPCAST can highlight it.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use SNIPCAST images commercially?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. You can generate code snippet images for your blog, Twitter, client presentations, or commercial projects. The rendered images are completely yours with no attribution required.",
          },
        },
        {
          "@type": "Question",
          name: "Is SNIPCAST better than Carbon or Ray.so?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "SNIPCAST offers more customization than Carbon and Ray.so, including animated backgrounds, custom border colors, adjustable shadow distances, and a brutalist design aesthetic. Plus, it's completely free and open source.",
          },
        },
        {
          "@type": "Question",
          name: "Does SNIPCAST store my code?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. SNIPCAST is a 100% client-side tool. Your code never leaves your browser. All rendering happens locally, and preferences are stored in your browser's local storage.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Studio",
          item: `${SITE_URL}/studio`,
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${interFont.variable} ${geistMono.variable} font-sans antialiased selection:bg-primary selection:text-background`}
      >
        <InteractiveMascot />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
