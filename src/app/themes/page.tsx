"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { ArrowLeft, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TransitionLink, { triggerTransition } from "@/components/TransitionLink";
import CodeEditor from "@/components/CodeEditor";
import { DarkMatter } from "@/components/ui/dark-matter";

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
  const mobilePreviewRef = useRef<HTMLDivElement>(null);
  const desktopPreviewRef = useRef<HTMLDivElement>(null);
  const [hoveredPreset, setHoveredPreset] = useState<typeof PRESETS[0] | null>(null);
  const [code, setCode] = useState(`function createAesthetic() {\n  return {\n    vibe: 'brutalist',\n    impact: 'maximum'\n  };\n}`);
  const [filename, setFilename] = useState("aesthetic.ts");

  const activePreset = hoveredPreset || PRESETS[0];

  useGSAP(() => {
    const tl = gsap.timeline();

    // Set initial states to prevent FOUC
    gsap.set(".title-section h1", { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", y: 20 });
    gsap.set(".title-section p", { opacity: 0, y: 10 });
    gsap.set(".theme-row", { x: -100, opacity: 0, skewX: 10 });
    
    // Aesthetic 3D Monolith Landing setup
    gsap.set(".preview-section", { 
      opacity: 0,
      y: 120,
      rotateX: 40,
      rotateY: -15,
      rotateZ: -4,
      scale: 0.85,
      filter: "blur(12px)",
      transformPerspective: 1500
    });
    
    gsap.set(".nav-header", { y: -50, opacity: 0 });

    // 1. Reveal header text from bottom up like a wipe
    tl.to(".title-section h1", {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      y: 0,
      duration: 0.8,
      ease: "power4.out"
    })
    .to(".title-section p", {
      opacity: 0.7,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.4")
    
    // 2. Smash the theme rows in with a skew reset
    .to(".theme-row", {
      x: 0,
      opacity: 1,
      skewX: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "back.out(1.2)"
    }, "-=0.4")
    // 3. 3D Monolith Landing - highly aesthetic, majestic, and smooth
    .to(".preview-section", {
      opacity: 1,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.8,
      ease: "expo.out" // Gives it that long, gorgeous floating tail
    }, "-=0.6")
    
    // 4. Drop in the navbar last
    .to(".nav-header", {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power3.out"
    }, "-=0.8");

  }, { scope: containerRef });

  // Micro-interaction for swapping presets
  useGSAP(() => {
    if (mobilePreviewRef.current) {
      gsap.fromTo(mobilePreviewRef.current,
        { scale: 0.95, filter: "blur(4px)", opacity: 0.5 },
        { scale: 1, filter: "blur(0px)", opacity: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" }
      );
    }
    if (desktopPreviewRef.current) {
      gsap.fromTo(desktopPreviewRef.current,
        { scale: 0.95, filter: "blur(4px)", opacity: 0.5 },
        { scale: 1, filter: "blur(0px)", opacity: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" }
      );
    }
  }, [activePreset.id]);

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

    triggerTransition(router, "/studio?from=themes", "themes");
  };

  return (
    <main ref={containerRef} className="min-h-screen font-sans selection:bg-primary selection:text-primary-foreground overflow-x-clip relative transition-colors duration-400 bg-background text-foreground">
      
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <DarkMatter />
      </div>

      {/* Brutalist Navbar */}
      <nav aria-label="Main navigation" className="nav-header fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-3 md:py-4 border-b-4 border-transparent bg-transparent text-foreground">
        <TransitionLink href="/" variant="back" className="flex items-center gap-3 px-4 py-2 border-4 font-black tracking-widest text-sm uppercase hover:-translate-y-1 hover:-translate-x-1 transition-all bg-transparent border-foreground hover:shadow-[4px_4px_0px_var(--primary)] hover:bg-foreground hover:text-background">
          <ArrowLeft size={18} strokeWidth={3} />
          <span>Back</span>
        </TransitionLink>
        <div className="font-black tracking-widest text-xl">SNIPCAST</div>
      </nav>

      <div className="relative z-10 pt-32 pb-24 min-h-screen flex flex-col lg:flex-row max-w-screen-2xl mx-auto">
        
        {/* Mobile Header */}
        <div className="lg:hidden px-6 md:px-12 mb-8 title-section relative z-10">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase max-w-2xl text-foreground [text-shadow:4px_4px_0px_var(--primary)] md:[text-shadow:6px_6px_0px_var(--primary)] [-webkit-text-stroke:1px_var(--background)]">
            Curated Aesthetics.
          </h1>
          <p className="mt-6 text-xs md:text-sm font-bold tracking-widest uppercase opacity-70 max-w-md text-foreground">
            One-click brutalist presets for your snippets. Choose your weapon and deploy.
          </p>
        </div>

        {/* Mobile Preview */}
        <div className="lg:hidden w-full px-6 md:px-12 mb-12 flex flex-col items-center preview-section">
           <div ref={mobilePreviewRef} className={`w-full max-w-[500px] transition-all duration-500 flex items-center justify-center overflow-hidden ${activePreset.bgClass}`}
                style={{ 
                  padding: `${Math.min(activePreset.padding, 32)}px`,
                  border: `${activePreset.borderThickness}px solid ${activePreset.borderColor}`,
                  boxShadow: `${Math.min(activePreset.shadowDistance, 16)}px ${Math.min(activePreset.shadowDistance, 16)}px 0px ${activePreset.shadowColor}`,
                }}>
              <div className="relative w-full z-10 pointer-events-none">
                <CodeEditor 
                  code={code} 
                  setCode={setCode} 
                  filename={filename}
                  setFilename={setFilename}
                  theme={activePreset.theme} 
                  showWindowControls={activePreset.showWindowControls}
                  editorBg={activePreset.editorBg}
                />
              </div>
           </div>
           <div className="w-full max-w-[500px] mt-6 text-center text-xs font-bold tracking-widest uppercase opacity-80 text-foreground">
             {activePreset.description}
           </div>
        </div>

        {/* Left Column - List */}
        <div className="flex-1 flex flex-col relative z-10">
          <header className="title-section hidden lg:block px-6 md:px-12 lg:px-16 mb-12">
            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter uppercase max-w-2xl text-foreground [text-shadow:6px_6px_0px_var(--primary)] lg:[text-shadow:8px_8px_0px_var(--primary)] [-webkit-text-stroke:2px_var(--background)]">
              Curated Aesthetics.
            </h1>
            <p className="mt-6 text-xs md:text-sm font-bold tracking-widest uppercase opacity-70 max-w-md text-foreground">
              One-click brutalist presets for your snippets. Choose your weapon and deploy.
            </p>
          </header>

          <div className="flex flex-col w-full border-t-2 border-border text-foreground">
            {PRESETS.map((preset, index) => (
              <div 
                key={preset.id}
                className="theme-row group cursor-pointer border-b-2 border-border hover:border-primary transition-colors duration-400"
                onMouseEnter={() => setHoveredPreset(preset)}
                onMouseLeave={() => setHoveredPreset(null)}
                onClick={() => handleSelectPreset(preset)}
              >
                <div className="px-6 md:px-12 lg:px-16 py-8 md:py-12 flex flex-col md:flex-row md:items-baseline justify-between gap-6 transition-colors duration-400">
                  <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 transition-transform duration-500 group-hover:translate-x-8 flex-1">
                    <span className="text-xl md:text-2xl font-black tracking-widest opacity-50 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap group-hover:text-primary">
                      [ {String(index + 1).padStart(2, '0')} ]
                    </span>
                    <h2 className="text-[clamp(1.5rem,4vw,3.5rem)] leading-none font-black tracking-tighter uppercase text-transparent [-webkit-text-stroke:1px_var(--foreground)] md:[-webkit-text-stroke:2px_var(--foreground)] group-hover:text-primary group-hover:[-webkit-text-stroke:0px_transparent] transition-all duration-300 break-words">
                      {preset.name.split(': ')[1] || preset.name}
                    </h2>
                  </div>
                  <div className="flex items-center gap-6 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-500 delay-100 md:translate-x-[-2rem] group-hover:translate-x-0">
                    <ArrowRight size={40} strokeWidth={2} className="hidden lg:block transition-transform duration-500 group-hover:translate-x-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Preview (Sticky) */}
        <div className="hidden lg:flex w-[45%] xl:w-[50%] p-8 lg:p-12 sticky top-32 self-start h-[calc(100vh-8rem)] flex-col items-center justify-center preview-section relative z-10">
           {/* Preview Details */}
           <div className="w-full max-w-[600px] mb-6 flex justify-between items-end text-foreground">
             <div className="text-sm font-bold tracking-widest uppercase opacity-70">
               Live Preview
             </div>
             <div className="text-xs font-black tracking-widest uppercase bg-foreground text-background px-3 py-1">
               {activePreset.id}
             </div>
           </div>

           {/* Preview Box */}
           <div ref={desktopPreviewRef} className={`w-full max-w-[600px] aspect-square transition-all duration-500 flex items-center justify-center overflow-hidden ${activePreset.bgClass} shadow-2xl`}
                style={{ 
                  padding: `${Math.min(activePreset.padding, 64)}px`,
                  border: `${activePreset.borderThickness}px solid ${activePreset.borderColor}`,
                  boxShadow: `${activePreset.shadowDistance}px ${activePreset.shadowDistance}px 0px ${activePreset.shadowColor}`,
                  transform: 'scale(0.95)',
                  transformOrigin: 'center center'
                }}>
              <div className="relative w-full z-10 pointer-events-none">
                <CodeEditor 
                  code={code} 
                  setCode={setCode} 
                  filename={filename}
                  setFilename={setFilename}
                  theme={activePreset.theme} 
                  showWindowControls={activePreset.showWindowControls}
                  editorBg={activePreset.editorBg}
                />
              </div>
           </div>

           <div className="w-full max-w-[600px] mt-8 text-center text-sm font-bold tracking-widest uppercase opacity-80 text-foreground">
             {activePreset.description}
           </div>
        </div>
      </div>
    </main>
  );
}

