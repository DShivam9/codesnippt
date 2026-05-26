import React from "react";
import TransitionLink from "@/components/TransitionLink";
import LegalLayout from "@/components/LegalLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "SNIPCAST Privacy Policy — Your code never leaves your browser. Learn how SNIPCAST protects your data with a 100% client-side code snippet image generator.",
  alternates: {
    canonical: "https://snipcast.dev/privacy",
  },
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#000] selection:bg-[#FF9F0A] selection:text-[#000] font-sans">
      <LegalLayout>
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
          PRIVACY<br/>POLICY.
        </h1>
        <div className="font-mono max-w-none text-lg md:text-xl font-bold flex flex-col gap-6">
          <p className="text-xl mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-3xl mt-12 mb-4 font-sans font-black uppercase tracking-widest">1. Information We Don't Collect</h2>
          <p>This is a strictly client-side tool. We do not collect, transmit, or store the code snippets you paste into SNIPCAST. Everything you render happens locally in your browser. We don't want your code, and we couldn't take it even if we wanted to.</p>

          <h2 className="text-3xl mt-12 mb-4 font-sans font-black uppercase tracking-widest">2. Analytics & Tracking</h2>
          <p>We may use basic, privacy-respecting analytics to track overall site usage (e.g., how many people visit the site). We do not use invasive tracking pixels, we do not sell your data to third parties, and we do not track individual user behavior.</p>

          <h2 className="text-3xl mt-12 mb-4 font-sans font-black uppercase tracking-widest">3. Local Storage</h2>
          <p>SNIPCAST may use your browser's local storage to save your editor preferences (like theme, padding, and language settings) so you don't have to reconfigure them every time you visit. This data never leaves your device.</p>

          <h2 className="text-3xl mt-12 mb-4 font-sans font-black uppercase tracking-widest">4. Contact</h2>
          <p>If you have any questions about this microscopic privacy policy, you can reach out to us on Twitter or GitHub.</p>
        </div>
      </article>
      </LegalLayout>
    </main>
  );
}
