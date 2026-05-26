"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import LogoLoop from "@/components/logo-loop";
import { Shield, Lock, Scale, FileText, Globe } from "lucide-react";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo("article > *",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Immersive Brutalist Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.08] text-black z-0 flex flex-col justify-around overflow-hidden">
        <LogoLoop
          speed={20}
          direction="left"
          gap={100}
          logos={[
            { node: <Shield size={200} /> },
            { node: <Lock size={200} /> },
            { node: <Scale size={200} /> },
            { node: <FileText size={200} /> },
            { node: <Globe size={200} /> },
          ]}
        />
        <LogoLoop
          speed={-15}
          direction="left"
          gap={150}
          logos={[
            { node: <FileText size={150} /> },
            { node: <Globe size={150} /> },
            { node: <Shield size={150} /> },
            { node: <Scale size={150} /> },
            { node: <Lock size={150} /> },
          ]}
        />
      </div>
      
      {/* Content wrapper */}
      <div className="relative z-10 legal-content">
        {children}
      </div>
    </div>
  );
}
