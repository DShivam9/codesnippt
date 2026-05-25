import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const interFont = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "SNIPCAST // Craft Beautiful Code Snippets",
  description: "Create stunning, high-fidelity code snippet images.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${interFont.variable} ${geistMono.variable} font-sans antialiased selection:bg-primary selection:text-background`}
      >
        {children}
      </body>
    </html>
  );
}
