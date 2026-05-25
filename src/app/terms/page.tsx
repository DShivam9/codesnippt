import React from "react";
import TransitionLink from "@/components/TransitionLink";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "SNIPCAST Terms of Service — Use our free code snippet image generator with full commercial rights. Your rendered code images are 100% yours.",
  alternates: {
    canonical: "https://snipcast.dev/terms",
  },
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#000] selection:bg-[#FF9F0A] selection:text-[#000] font-sans">
      {/* Brutalist Simple Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-4 border-b-4 border-[#000] bg-[#FAFAFA]">
        <TransitionLink href="/" variant="back" className="font-black text-2xl uppercase tracking-tighter hover:text-[#FF9F0A] transition-colors">
          SNIPCAST
        </TransitionLink>
        <TransitionLink href="/" variant="back" className="font-black uppercase tracking-widest text-sm hover:underline underline-offset-4">
          ← Back to Home
        </TransitionLink>
      </nav>

      <article className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-[clamp(3rem,8vw,6rem)] leading-[0.85] font-black uppercase tracking-tighter mb-12">
          TERMS OF<br/>SERVICE.
        </h1>
        <div className="font-mono max-w-none text-lg md:text-xl font-bold flex flex-col gap-6">
          <p className="text-xl mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-3xl mt-12 mb-4 font-sans font-black uppercase tracking-widest">1. Acceptance of Terms</h2>
          <p>By using SNIPCAST, you agree to these terms. If you disagree, please close the tab and return to taking boring, unstyled screenshots of your code.</p>

          <h2 className="text-3xl mt-12 mb-4 font-sans font-black uppercase tracking-widest">2. Commercial Use</h2>
          <p>The images you generate using SNIPCAST are 100% yours. You hold all rights to your code snippets and the resulting images. You may use them for personal, educational, or commercial purposes without attribution (though a shoutout is always appreciated).</p>

          <h2 className="text-3xl mt-12 mb-4 font-sans font-black uppercase tracking-widest">3. No Warranties</h2>
          <p>This tool is provided "as is" without warranty of any kind. We don't guarantee that the tool will be uninterrupted or error-free. If your browser crashes while rendering a 10,000-line code snippet, that's on you.</p>

          <h2 className="text-3xl mt-12 mb-4 font-sans font-black uppercase tracking-widest">4. Acceptable Use</h2>
          <p>Please do not attempt to DDoS our servers or use automated bots to scrape the site. We are a free tool built for the community. Play nice.</p>

          <h2 className="text-3xl mt-12 mb-4 font-sans font-black uppercase tracking-widest">5. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. We probably won't, but we could. Continued use of the tool constitutes acceptance of any changes.</p>
        </div>
      </article>
    </main>
  );
}
