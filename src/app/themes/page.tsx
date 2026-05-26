"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { ArrowLeft, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TransitionLink, { triggerTransition } from "@/components/TransitionLink";

const PRESETS = [
  {
    id: "classic-dark",
    name: "01: CLASSIC_DARK",
    description: "CLEAN, PROFESSIONAL, AND HIGHLY READABLE.",
    theme: "github-dark",
    bgClass: "bg-[#050505]",
    editorBg: "#24292e",
    borderColor: "#333333",
    shadowColor: "#000000",
    borderThickness: 2,
    shadowDistance: 24,
    padding: 64,
    showWindowControls: true,
  },
  {
    id: "neon-dreams",
    name: "02: NEON_DREAMS",
    description: "VIBRANT GRADIENTS. DEEP SYNTHWAVE CONTRAST.",
    theme: "synthwave-84",
    bgClass: "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600",
    editorBg: "#2b213a",
    borderColor: "transparent",
    shadowColor: "#050505",
    borderThickness: 0,
    shadowDistance: 32,
    padding: 80,
    showWindowControls: true,
  },
  {
    id: "minimal-light",
    name: "03: MINIMAL_LIGHT",
    description: "CRISP WHITE. HEAVY BORDERS.",
    theme: "vitesse-light",
    bgClass: "bg-[#FAFAFA]",
    editorBg: "#ffffff",
    borderColor: "#050505",
    shadowColor: "#050505",
    borderThickness: 4,
    shadowDistance: 16,
    padding: 48,
    showWindowControls: false,
  },
  {
    id: "cyber-grid",
    name: "04: CYBER_GRID",
    description: "HACKER AESTHETICS. TOKYO NIGHT SYNTAX.",
    theme: "tokyo-night",
    bgClass: "bg-[#050505] bg-grid-pattern",
    editorBg: "#1a1b26",
    borderColor: "#27C93F",
    shadowColor: "transparent",
    borderThickness: 4,
    shadowDistance: 0,
    padding: 64,
    showWindowControls: false,
  },
  {
    id: "brutalist-orange",
    name: "05: BRUTAL_ORANGE",
    description: "MAXIMUM IMPACT. BRAND ORANGE.",
    theme: "monokai",
    bgClass: "bg-[#FF3300]",
    editorBg: "#272822",
    borderColor: "#050505",
    shadowColor: "#050505",
    borderThickness: 8,
    shadowDistance: 24,
    padding: 80,
    showWindowControls: true,
  },
  {
    id: "nordic-frost",
    name: "06: NORDIC_FROST",
    description: "COOL. CALM. COLLECTED.",
    theme: "nord",
    bgClass: "bg-gradient-to-br from-emerald-400 to-cyan-500",
    editorBg: "#2e3440",
    borderColor: "transparent",
    shadowColor: "#050505",
    borderThickness: 0,
    shadowDistance: 24,
    padding: 64,
    showWindowControls: true,
  }
];

export default function ThemesPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredPreset, setHoveredPreset] = useState<typeof PRESETS[0] | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(".nav-header",
      { y: -100 },
      { y: 0, duration: 0.6, ease: "power3.out" }
    )
    .fromTo(".title-section",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" },
      "-=0.4"
    )
    .fromTo(".theme-row",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "expo.out" },
      "-=0.6"
    );
  }, { scope: containerRef });

  const handleSelectPreset = (preset: typeof PRESETS[0]) => {
    localStorage.setItem("snipcast_prefs", JSON.stringify({
      theme: preset.theme,
      bgClass: preset.bgClass,
      editorBg: preset.editorBg,
      borderColor: preset.borderColor,
      shadowColor: preset.shadowColor,
      borderThickness: preset.borderThickness,
      shadowDistance: preset.shadowDistance,
      padding: preset.padding,
      showWindowControls: preset.showWindowControls
    }));

    triggerTransition(router, "/", "themes");
  };

  const isLightBg = hoveredPreset?.id === "minimal-light";

  return (
    <main ref={containerRef} className={`min-h-screen bg-[#050505] font-sans selection:bg-[#FF3300] selection:text-[#FAFAFA] overflow-x-hidden relative transition-colors duration-400 ${isLightBg ? 'text-[#050505]' : 'text-[#FAFAFA]'}`}>
      
      {/* Background Reveal Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
        {PRESETS.map((preset) => (
          <div 
            key={`bg-${preset.id}`}
            className={`absolute inset-0 transition-opacity duration-400 ease-out ${preset.bgClass} ${hoveredPreset?.id === preset.id ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        {/* Grain Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.25] mix-blend-overlay" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} 
        />
      </div>

      {/* Brutalist Navbar */}
      <nav aria-label="Main navigation" className="nav-header fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-3 md:py-4 border-b-4 border-transparent bg-transparent">
        <TransitionLink href="/" variant="back" className={`flex items-center gap-3 px-4 py-2 border-4 font-black tracking-widest text-sm uppercase hover:-translate-y-1 hover:-translate-x-1 transition-all ${isLightBg ? 'bg-[#050505] text-[#FAFAFA] border-[#050505] hover:shadow-[4px_4px_0px_#050505]' : 'bg-[#FAFAFA] text-[#000] border-[#FAFAFA] hover:shadow-[4px_4px_0px_#FAFAFA]'}`}>
          <ArrowLeft size={18} strokeWidth={3} />
          <span>Back</span>
        </TransitionLink>
        <div className="font-black tracking-widest text-xl">SNIPCAST</div>
      </nav>

      <div className="relative z-10 pt-40 pb-24 min-h-screen flex flex-col">
        {/* Header section */}
        <header className="title-section px-6 md:px-12 lg:px-24 mb-16">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase max-w-2xl">
            Curated Aesthetics.
          </h1>
          <p className="mt-6 text-xs md:text-sm font-bold tracking-widest uppercase opacity-70 max-w-md">
            One-click brutalist presets for your snippets. Choose your weapon.
          </p>
        </header>

        {/* Editorial List */}
        <div className={`flex flex-col w-full border-t-2 ${isLightBg ? 'border-[#050505]/20' : 'border-[#FAFAFA]/20'}`}>
          {PRESETS.map((preset, index) => (
            <div 
              key={preset.id}
              className={`theme-row group cursor-pointer border-b-2 ${isLightBg ? 'border-[#050505]/20 hover:bg-[#050505]' : 'border-[#FAFAFA]/20 hover:bg-[#FAFAFA]'} transition-colors duration-400`}
              onMouseEnter={() => setHoveredPreset(preset)}
              onMouseLeave={() => setHoveredPreset(null)}
              onClick={() => handleSelectPreset(preset)}
            >
              <div className={`px-6 md:px-12 lg:px-24 py-12 md:py-20 flex flex-col md:flex-row md:items-baseline justify-between gap-6 ${isLightBg ? 'group-hover:text-[#FAFAFA]' : 'group-hover:text-[#050505]'} transition-colors duration-400`}>
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 transition-transform duration-500 group-hover:translate-x-12 flex-1">
                  <span className="text-xl md:text-3xl font-black tracking-widest opacity-50 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    [ {String(index + 1).padStart(2, '0')} ]
                  </span>
                  <h2 className={`text-[clamp(2.5rem,6vw,7rem)] leading-none font-black tracking-tighter uppercase text-transparent ${isLightBg ? '[-webkit-text-stroke:1px_#050505] md:[-webkit-text-stroke:2px_#050505] group-hover:text-[#FAFAFA]' : '[-webkit-text-stroke:1px_#FAFAFA] md:[-webkit-text-stroke:2px_#FAFAFA] group-hover:text-[#050505]'} group-hover:[-webkit-text-stroke:0px_transparent] transition-all duration-300 break-words`}>
                    {preset.name.split(': ')[1] || preset.name}
                  </h2>
                </div>
                <div className="flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 md:translate-x-[-3rem] group-hover:translate-x-0">
                  <p className="text-xs md:text-sm font-bold tracking-widest uppercase max-w-xs md:text-right hidden md:block">
                    {preset.description}
                  </p>
                  <ArrowRight size={56} strokeWidth={2} className="hidden md:block transition-transform duration-500 group-hover:translate-x-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
