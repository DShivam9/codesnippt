"use client";

import Link from "next/link";
import { ArrowRight, Code2, MonitorSmartphone, Zap, Layers, MousePointerClick } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  SiJavascript, SiTypescript, SiPython, SiRust, SiGo, SiCplusplus, SiSwift, SiKotlin, SiRuby, SiPhp, SiGithub,
  SiHtml5, SiCss, SiSass, SiMarkdown, SiJson, SiYaml, SiGnubash, SiGraphql, SiDocker,
  SiScala, SiHaskell, SiElixir, SiClojure, SiLua, SiR, SiDart, SiSolidity,
  SiAssemblyscript, SiVuedotjs, SiReact, SiSvelte, SiAngular, SiTailwindcss, SiPrisma, SiAstro,
  SiToml, SiXml, SiC, SiNim, SiZig, SiFsharp
} from "react-icons/si";
import PixelTransition from "../components/pixel-transition";
import TransitionLink from "@/components/TransitionLink";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const languageLogos = [
  { node: <SiJavascript color="#F7DF1E" />, title: "JavaScript" },
  { node: <SiTypescript color="#3178C6" />, title: "TypeScript" },
  { node: <SiPython color="#3776AB" />, title: "Python" },
  { node: <SiRust color="#DEA584" />, title: "Rust" },
  { node: <SiGo color="#00ADD8" />, title: "Go" },
  { node: <SiCplusplus color="#00599C" />, title: "C++" },
  { node: <SiSwift color="#F05138" />, title: "Swift" },
  { node: <SiKotlin color="#7F52FF" />, title: "Kotlin" },
  { node: <SiRuby color="#CC342D" />, title: "Ruby" },
  { node: <SiPhp color="#777BB4" />, title: "PHP" },
  { node: <SiHtml5 color="#E34F26" />, title: "HTML5" },
  { node: <SiCss color="#1572B6" />, title: "CSS" },
  { node: <SiSass color="#CC6699" />, title: "Sass" },
  { node: <SiMarkdown color="#000000" />, title: "Markdown" },
  { node: <SiJson color="#000000" />, title: "JSON" },
  { node: <SiYaml color="#CB171E" />, title: "YAML" },
  { node: <SiGnubash color="#4EAA25" />, title: "Bash" },
  { node: <SiGraphql color="#E10098" />, title: "GraphQL" },
  { node: <SiDocker color="#2496ED" />, title: "Docker" },
  { node: <SiScala color="#DC322F" />, title: "Scala" },
  { node: <SiHaskell color="#5D4F85" />, title: "Haskell" },
  { node: <SiElixir color="#4B275F" />, title: "Elixir" },
  { node: <SiClojure color="#5881D8" />, title: "Clojure" },
  { node: <SiLua color="#2C2D72" />, title: "Lua" },
  { node: <SiR color="#276DC3" />, title: "R" },
  { node: <SiDart color="#0175C2" />, title: "Dart" },
  { node: <SiSolidity color="#363636" />, title: "Solidity" },
  { node: <SiAssemblyscript color="#000000" />, title: "AssemblyScript" },
  { node: <SiVuedotjs color="#4FC08D" />, title: "Vue" },
  { node: <SiReact color="#61DAFB" />, title: "React" },
  { node: <SiSvelte color="#FF3E00" />, title: "Svelte" },
  { node: <SiAngular color="#DD0031" />, title: "Angular" },
  { node: <SiTailwindcss color="#06B6D4" />, title: "Tailwind" },
  { node: <SiPrisma color="#2D3748" />, title: "Prisma" },
  { node: <SiAstro color="#BC52EE" />, title: "Astro" },
  { node: <SiToml color="#9C4221" />, title: "TOML" },
  { node: <SiXml color="#00608C" />, title: "XML" },
  { node: <SiC color="#A8B9CC" />, title: "C" },
  { node: <SiNim color="#FFE953" />, title: "Nim" },
  { node: <SiZig color="#F7A41D" />, title: "Zig" },
  { node: <SiFsharp color="#378BBA" />, title: "F#" }
];

const LanguageMarqueeRow = ({ items, direction = "left" }: { items: typeof languageLogos, direction?: "left" | "right" }) => {
  return (
    <div className="w-full overflow-hidden flex whitespace-nowrap group/marquee">
      <div className={`flex w-max group-hover/marquee:[animation-play-state:paused] ${direction === "left" ? "animate-scroll-left" : "animate-scroll-right"}`}>
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-4 px-2 py-2">
            {items.map((logo, idx) => (
              <div key={idx} className="shrink-0 w-24 md:w-28 flex flex-col items-center justify-center p-3 border-2 border-[#000] bg-[#FAFAFA] shadow-[4px_4px_0px_#000] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000]">
                <div className="text-3xl md:text-4xl mb-2 grayscale hover:grayscale-0 transition-all duration-300">
                  {logo.node}
                </div>
                <span className="font-black uppercase text-[10px] tracking-widest text-[#000] truncate w-full text-center">{logo.title}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const rawCode = (
  <div className="w-full h-full bg-[#1E1E2E] p-8 flex flex-col justify-center border-4 border-foreground">
    <pre className="font-mono text-sm md:text-base text-[#8B8B9A] flex-1 overflow-hidden leading-relaxed whitespace-pre-wrap">
{`import { Snipcast } from '@snipcast/core';

// Execute Pipeline
await Snipcast.export({
  resolution: '3x',
  theme: 'obsidian'
});`}
    </pre>
  </div>
);

const obsidianCode = (
  <div className="w-full h-full bg-[#000000] border-4 border-foreground p-8 flex flex-col">
    <div className="flex gap-2 mb-6">
      <div className="w-4 h-4 bg-[#FF5F56] border-2 border-foreground shadow-[2px_2px_0px_#fff]" />
      <div className="w-4 h-4 bg-[#FFBD2E] border-2 border-foreground shadow-[2px_2px_0px_#fff]" />
      <div className="w-4 h-4 bg-[#27C93F] border-2 border-foreground shadow-[2px_2px_0px_#fff]" />
    </div>
    <pre className="font-mono text-base md:text-lg text-foreground flex-1 overflow-hidden">
      <code>
<span className="text-primary">import</span> {"{"} Snipcast {"}"} <span className="text-primary">from</span> <span className="text-muted-foreground">'@snipcast/core'</span>;{"\n\n"}
<span className="text-muted-foreground">// Execute Pipeline</span>{"\n"}
<span className="text-foreground">await</span> <span className="text-primary">Snipcast</span>.export({"{"}{"\n"}
{"  "}resolution: <span className="text-muted-foreground">'3x'</span>,{"\n"}
{"  "}theme: <span className="text-muted-foreground">'obsidian'</span>{"\n"}
{"}"});
      </code>
    </pre>
  </div>
);

function BrutalistButton({ children, className, href, variant = "studio" }: any) {
  return (
    <TransitionLink 
      href={href} 
      variant={variant}
      className={`inline-block border-4 border-foreground bg-background text-foreground uppercase font-black tracking-widest px-8 py-5 transition-all duration-150 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_#FF9F0A] active:translate-x-0 active:translate-y-0 active:shadow-none ${className}`}
    >
      {children}
    </TransitionLink>
  );
}

const faqs = [
  { q: "Is this really free?", a: "Yes, 100%. No paywalls, no subscriptions. We believe in open tools for developers. Just jump into the studio and start rendering." },
  { q: "What languages are supported?", a: "We support syntax highlighting for pretty much everything. JavaScript, TypeScript, Python, Rust, Go, C++, and dozens more. If you can code in it, we can highlight it." },
  { q: "Can I use the images commercially?", a: "Absolutely. Generate snippets for your blog, Twitter, client presentations, or commercial projects. The renders are completely yours." },
  { q: "How do I export high-res images?", a: "In the studio, you can export your snippets as high-resolution PNGs or vector SVGs with a single click. No watermarks." },
  { q: "Are my snippets saved on your server?", a: "Never. Everything is rendered entirely in your browser. We don't have a database, and your code never leaves your device." },
  { q: "Do you support custom themes?", a: "We offer 18+ gorgeous syntax themes built-in, ranging from brutalist high-contrast to smooth synthwave gradients. Total creative control." }
];

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const textRevealRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    // Choreographed Intro Timeline
    const tl = gsap.timeline();
    const hasVisited = sessionStorage.getItem("hasVisitedHome");

    if (!hasVisited) {
      sessionStorage.setItem("hasVisitedHome", "true");

      tl.fromTo(".nav-bar",
        { y: "-100%" },
        { y: "0%", duration: 0.8, ease: "power3.out" }
      )
      .fromTo(".hero-bg-marquees", 
        { opacity: 0 }, 
        { opacity: 1, duration: 1.2, ease: "power2.out" },
        "<"
      )
      .fromTo(".hero-word", 
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.6, ease: "expo.out", stagger: 0.08 },
        "-=0.4"
      )
      .fromTo(".hero-cta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo([".hero-marquee", ".hero-marquee-fast"],
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.4"
      );
    }

    gsap.to(".hero-marquee", {
      xPercent: -50,
      ease: "none",
      duration: 30,
      repeat: -1
    });
    
    gsap.fromTo(".hero-marquee-fast", 
      { xPercent: -50 },
      {
        xPercent: 0,
        ease: "none",
        duration: 20,
        repeat: -1
      }
    );

    gsap.to(".footer-marquee", {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1
    });

    // Bento Grid Card Stacking
    if (bentoRef.current) {
      const cards = gsap.utils.toArray(".bento-card");
      gsap.fromTo(cards, 
        { y: 150, opacity: 0 },
        {
          y: 0, 
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: bentoRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    // Scrubbing Text Reveal
    if (textRevealRef.current) {
      const chars = gsap.utils.toArray(".reveal-char");
      gsap.fromTo(chars,
        { opacity: 0.1 },
        {
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: textRevealRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          }
        }
      );
    }

    // Huge Marquee Scroll
    gsap.to(".massive-marquee", {
      xPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: ".marquee-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    // FAQ Stagger
    gsap.fromTo(".faq-item",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: "#faq",
          start: "top 60%",
          toggleActions: "play none none none"
        }
      }
    );

    // Generic Scroll Reveal for headings and footer
    gsap.utils.toArray<HTMLElement>(".scroll-reveal").forEach(el => {
      gsap.fromTo(el, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="overflow-x-hidden w-full max-w-full bg-[#050505] text-[#FAFAFA] font-sans selection:bg-[#FF9F0A] selection:text-[#000]">
      
      {/* Navigation - Brutalist Navbar */}
      <nav aria-label="Main navigation" className="nav-bar fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-3 md:py-4 border-b-4 border-[#000] bg-[#FAFAFA] text-[#000]">
        <div className="flex items-center gap-3">
          <div className="bg-[#FF9F0A] p-1.5 border-4 border-[#000]">
            <Code2 className="w-5 h-5 md:w-6 md:h-6 text-[#000]" strokeWidth={3} />
          </div>
          <span className="text-2xl md:text-3xl font-black tracking-tight uppercase">SNIPCAST</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 lg:gap-12 text-sm font-bold tracking-widest uppercase">
          <Link href="#features" className="hover:bg-[#FF9F0A] px-3 py-1 border-4 border-transparent hover:border-[#000] hover:shadow-[4px_4px_0px_#000] transition-all">Features</Link>
          <Link href="#previews" className="hover:bg-[#FF9F0A] px-3 py-1 border-4 border-transparent hover:border-[#000] hover:shadow-[4px_4px_0px_#000] transition-all">Previews</Link>
          <Link href="#faq" className="hover:bg-[#FF9F0A] px-3 py-1 border-4 border-transparent hover:border-[#000] hover:shadow-[4px_4px_0px_#000] transition-all">FAQ</Link>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://github.com/DShivam9/snipcast" target="_blank" rel="noopener noreferrer" aria-label="View SNIPCAST source code on GitHub" className="hidden md:flex items-center justify-center bg-[#FAFAFA] text-[#000] p-2 border-4 border-[#000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_#000] transition-all hover:bg-[#FF9F0A]">
            <SiGithub className="w-5 h-5" aria-hidden="true" />
          </a>
          <TransitionLink href="/studio" className="bg-[#FF9F0A] text-[#000] px-6 md:px-8 py-3 border-4 border-[#000] font-black tracking-widest text-sm uppercase hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_#000] transition-all">
            Launch App
          </TransitionLink>
        </div>
      </nav>

      {/* HERO - Cinematic Center Layout */}
      <section aria-label="Hero — Code snippet image generator" className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#050505] pt-32 pb-16">
        
        {/* Brutalist Typographic Background */}
        <div className="hero-bg-marquees absolute inset-0 w-full h-full pointer-events-none">
          <div className="absolute top-[16%] left-0 w-full overflow-hidden opacity-[0.08]">
            <div className="hero-marquee flex whitespace-nowrap w-max">
              <span aria-hidden="true" className="text-[15vw] leading-none font-black uppercase tracking-tighter pr-16 block">SNIPCAST &mdash; SNIPCAST &mdash; SNIPCAST &mdash; SNIPCAST &mdash; </span>
              <span aria-hidden="true" className="text-[15vw] leading-none font-black uppercase tracking-tighter pr-16 block">SNIPCAST &mdash; SNIPCAST &mdash; SNIPCAST &mdash; SNIPCAST &mdash; </span>
            </div>
          </div>
          <div className="absolute bottom-[8%] left-0 w-full overflow-hidden opacity-[0.12]">
            <div className="hero-marquee-fast flex whitespace-nowrap w-max">
              <span aria-hidden="true" className="text-[15vw] leading-none font-black uppercase tracking-tighter pr-16 text-transparent [-webkit-text-stroke:4px_#FAFAFA] block">CODE TO IMAGE &mdash; CODE TO IMAGE &mdash; CODE TO IMAGE &mdash; CODE TO IMAGE &mdash; </span>
              <span aria-hidden="true" className="text-[15vw] leading-none font-black uppercase tracking-tighter pr-16 text-transparent [-webkit-text-stroke:4px_#FAFAFA] block">CODE TO IMAGE &mdash; CODE TO IMAGE &mdash; CODE TO IMAGE &mdash; CODE TO IMAGE &mdash; </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl w-full relative z-10 text-center flex flex-col items-center [perspective:1000px]">
          <h1 className="hero-title text-4xl md:text-6xl lg:text-[5rem] leading-snug font-bold tracking-normal w-full max-w-5xl mb-16 text-center px-4 flex flex-wrap justify-center gap-x-[0.3em]">
            {["Turn", "your", "source", "code", "into"].map((word, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <span className="hero-word inline-block">{word}</span>
              </span>
            ))}
            {["beautiful,", "shareable"].map((word, i) => (
              <span key={`accent-${i}`} className="inline-block overflow-hidden">
                <span className="hero-word inline-block text-[#FF9F0A]">{word}</span>
              </span>
            ))}
            <span className="inline-block overflow-hidden">
              <span className="hero-word inline-block">images.</span>
            </span>
          </h1>

          <div className="hero-cta flex flex-col w-full max-w-6xl border-4 border-[#FAFAFA] bg-[#111] shadow-[16px_16px_0px_#FF9F0A] overflow-hidden">
            {/* Window Header */}
            <div className="flex items-center gap-2 border-b-4 border-[#FAFAFA] p-4 bg-[#000]">
              <div className="w-4 h-4 bg-[#FF5F56] border-2 border-[#FAFAFA]" />
              <div className="w-4 h-4 bg-[#FFBD2E] border-2 border-[#FAFAFA]" />
              <div className="w-4 h-4 bg-[#27C93F] border-2 border-[#FAFAFA]" />
            </div>
            
            {/* Window Body */}
            <div className="p-8 md:p-16 flex flex-col md:flex-row items-center md:items-stretch gap-12 text-left bg-black/80 backdrop-blur-md">
              <div className="flex-1 font-mono text-base md:text-2xl font-bold tracking-tight leading-relaxed overflow-x-auto w-full">
                <span className="text-[#FF9F0A]">const</span> <span className="text-[#FAFAFA]">workflow</span> <span className="text-[#FF9F0A]">=</span> <span className="text-[#FAFAFA]">{"{"}</span><br/>
                &nbsp;&nbsp;<span className="text-[#00ADD8]">step1:</span> <span className="text-[#27C93F]">'Paste code'</span>,<br/>
                &nbsp;&nbsp;<span className="text-[#00ADD8]">step2:</span> <span className="text-[#27C93F]">'Pick theme'</span>,<br/>
                &nbsp;&nbsp;<span className="text-[#00ADD8]">step3:</span> <span className="text-[#27C93F]">'Export stunning screenshots'</span><br/>
                <span className="text-[#FAFAFA]">{"}"};</span><br/>
                <br/>
                <span className="text-[#8B8B9A]">// Built for developers who refuse</span><br/>
                <span className="text-[#8B8B9A]">// to share boring text.</span>
              </div>
              
              <BrutalistButton href="/studio" className="w-full md:w-auto text-xl md:text-2xl flex items-center justify-center gap-4 bg-[#FF9F0A] text-[#000] border-[#000] shadow-[8px_8px_0px_#FAFAFA] hover:shadow-[12px_12px_0px_#FAFAFA] shrink-0 self-center">
                START RENDERING
                <ArrowRight className="w-6 h-6" strokeWidth={3} />
              </BrutalistButton>
            </div>
          </div>
        </div>
      </section>

      {/* BENTO GRID (Interest) - Gapless & Mathematically Perfect */}
      <section id="features" aria-label="SNIPCAST features — themes, backgrounds, syntax highlighting" className="relative pt-16 pb-32 md:pt-24 md:pb-48 px-4 md:px-12 bg-[#FAFAFA] text-[#000] border-b-8 border-[#000]">
        <div className="max-w-7xl mx-auto flex flex-col">
          <h2 className="scroll-reveal text-[clamp(4rem,10vw,10rem)] leading-none font-black tracking-tighter mb-20 uppercase border-b-8 border-[#000] pb-6">
            FEATURES
          </h2>
          
          <div ref={bentoRef} className="grid grid-cols-1 lg:grid-cols-4 grid-flow-dense gap-1 border-4 border-[#000] bg-[#000]">
            {/* Card 1: Cinematic Large */}
            <div className="bento-card col-span-1 lg:col-span-2 row-span-2 bg-[#FAFAFA] p-12 flex flex-col justify-between min-h-[500px] group hover:bg-[#FF9F0A] transition-colors duration-300">
              <MonitorSmartphone className="w-20 h-20 text-[#000] mb-8 group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
              <div>
                <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 uppercase leading-none">Beautiful<br/>Backgrounds</h3>
                <p className="text-2xl font-bold max-w-md uppercase">Choose from vibrant gradients or dynamic animated patterns to make your code pop on social media.</p>
              </div>
            </div>

            {/* Card 2: Wide */}
            <div className="bento-card col-span-1 lg:col-span-2 row-span-1 bg-[#FAFAFA] text-[#000] p-10 flex flex-col justify-between group hover:bg-[#FF9F0A] transition-colors duration-300">
              <Zap className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
              <div>
                <h3 className="text-4xl font-black tracking-tighter mb-2 uppercase">Complete Control</h3>
                <p className="text-xl font-bold uppercase">Tweak window controls, padding, and drop shadows to dial in the perfect look.</p>
              </div>
            </div>

            {/* Card 3: Square */}
            <div className="bento-card col-span-1 lg:col-span-1 row-span-1 bg-[#FAFAFA] text-[#000] p-10 flex flex-col justify-between group hover:bg-[#FF9F0A] transition-colors duration-300">
              <Layers className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
              <div>
                <h3 className="text-3xl font-black tracking-tighter mb-2 uppercase">Custom Colors</h3>
                <p className="text-lg font-bold uppercase">Pick exact hex colors for borders and shadows to match your brand.</p>
              </div>
            </div>

            {/* Card 4: Square Accent */}
            <div className="bento-card col-span-1 lg:col-span-1 row-span-1 bg-[#FAFAFA] text-[#000] p-10 flex flex-col justify-between group hover:bg-[#FF9F0A] transition-colors duration-300">
              <MousePointerClick className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
              <div>
                <h3 className="text-3xl font-black tracking-tighter mb-2 uppercase">Syntax Themes</h3>
                <p className="text-lg font-bold uppercase">Gorgeous light and dark themes with automatic language detection.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THEME ARCHITECTURE (Desire) - Scrubbing Text Reveal */}
      <section id="previews" aria-label="Theme preview — code to image transformation" className="relative py-32 md:py-48 px-6 md:px-12 bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 relative z-10">
          
          <div className="flex-1 w-full scroll-reveal">
            <h2 className="text-[clamp(4rem,8vw,8rem)] font-black tracking-tighter uppercase mb-12 leading-[0.85] text-[#FAFAFA]">THEME<br/>ARCH.</h2>
            <p ref={textRevealRef} className="text-3xl md:text-5xl font-black mb-12 uppercase leading-tight text-[#FAFAFA]">
              {("UNLEASH YOUR CREATIVITY. EXPLORE OUR CURATED PRESETS OR FORGE YOUR OWN COMBINATION OF THEMES AND BACKGROUNDS FOR MAXIMUM AESTHETIC IMPACT.").split("").map((char, idx) => (
                <span key={idx} className="reveal-char">{char}</span>
              ))}
            </p>
            <BrutalistButton href="/themes" variant="themes" className="bg-[#FAFAFA] text-[#000] shadow-[8px_8px_0px_#FF9F0A]">
              EXPLORE THEMES
            </BrutalistButton>
          </div>
          
          <div className="flex-1 w-full flex flex-col items-center">
            <div className="w-full max-w-[650px] border-8 border-[#FAFAFA] shadow-[24px_24px_0px_#FF9F0A] bg-[#000] p-2 hover:-translate-y-4 hover:-translate-x-4 transition-transform duration-500 cursor-crosshair">
              <PixelTransition
                firstContent={rawCode}
                secondContent={obsidianCode}
                gridSize={12}
                pixelColor="#FF9F0A"
                animationStepDuration={0.3}
                once
                aspectRatio="65%"
                className="w-full h-full"
              />
            </div>
            <div className="mt-12 bg-[#FAFAFA] text-[#000] font-black uppercase tracking-widest px-8 py-3 border-4 border-[#000] transform -rotate-3 hover:rotate-0 transition-transform shadow-[8px_8px_0px_#FF9F0A]">
              HOVER TO TRANSFORM
            </div>
          </div>

        </div>
      </section>

      {/* INFINITE MARQUEE & LANGUAGES - Improved */}
      <section aria-label="Supported programming languages" className="marquee-section relative py-24 md:py-40 border-t-8 border-b-8 border-[#FAFAFA] bg-[#FF9F0A] overflow-hidden">
        {/* Background Marquee */}
        <div className="massive-marquee absolute inset-0 flex items-center w-[300vw] pointer-events-none">
          <span className="text-[25vw] font-black uppercase whitespace-nowrap tracking-tighter text-[#000] opacity-10 mix-blend-overlay">
            NO CONFIGURATION. NO CONFIGURATION. NO CONFIGURATION.
          </span>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col xl:flex-row gap-16 xl:gap-24 items-center">
          
          {/* Context / Copy */}
          <div className="flex-1 text-left scroll-reveal">
            <div className="inline-block bg-[#000] text-[#FAFAFA] px-4 py-2 font-black tracking-widest uppercase mb-8 border-4 border-[#FAFAFA] shadow-[8px_8px_0px_#FAFAFA] transform -rotate-2">
              Auto-detecting Syntax
            </div>
            <h2 className="text-[clamp(3.5rem,8vw,6rem)] leading-[0.85] font-black uppercase tracking-tighter text-[#000] mb-8">
              FLUENT IN<br/>EVERYTHING.
            </h2>
            <p className="text-xl md:text-2xl font-bold uppercase tracking-tight text-[#000] max-w-xl mb-12 border-l-8 border-[#000] pl-6 py-2">
              Powered by Shiki. We support over 50+ languages out of the box. Just paste your code, and we'll handle the rest. No configuration required.
            </p>
            <BrutalistButton href="/studio" className="bg-[#000] text-[#FAFAFA] border-[#000] !shadow-[8px_8px_0px_#FAFAFA] hover:!shadow-[12px_12px_0px_#FAFAFA] hover:bg-[#111]">
              TRY IT YOURSELF
            </BrutalistButton>
          </div>

          {/* Language Marquees */}
          <div className="flex-1 min-w-0 w-full flex flex-col gap-4 scroll-reveal relative" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <LanguageMarqueeRow items={languageLogos.slice(0, 14)} direction="left" />
            <LanguageMarqueeRow items={languageLogos.slice(14, 28)} direction="right" />
            <LanguageMarqueeRow items={languageLogos.slice(28)} direction="left" />
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" aria-label="Frequently asked questions about SNIPCAST code image generator" className="relative py-32 bg-[#050505] border-t-8 border-[#FAFAFA]">
        <div className="scroll-reveal max-w-5xl mx-auto px-6">
          <h2 className="text-[clamp(3rem,8vw,6rem)] font-black uppercase tracking-tighter text-[#FAFAFA] mb-16 leading-[0.85]">
            FREQUENTLY<br/>ASKED.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full items-start">
            {faqs.map((faq, idx) => (
              <details name="faq-accordion" key={idx} className="faq-item group border-4 border-[#FAFAFA] bg-[#050505] p-6 md:p-8 shadow-[8px_8px_0px_#FF9F0A] hover:-translate-y-2 hover:-translate-x-2 hover:rotate-1 hover:shadow-[16px_16px_0px_#FF9F0A] open:bg-[#FF9F0A] open:border-[#000] open:-translate-y-2 open:-translate-x-2 open:shadow-[16px_16px_0px_#FAFAFA] transition-all duration-300">
                <summary className="font-black text-xl md:text-2xl uppercase tracking-widest cursor-pointer list-none flex justify-between items-start gap-4 group-open:text-[#000] text-[#FAFAFA] transition-colors">
                  <span className="group-hover:text-[#FF9F0A] group-open:group-hover:text-[#000] transition-colors">{faq.q}</span>
                  <span className="text-[#FF9F0A] group-hover:rotate-90 group-open:text-[#000] group-open:rotate-45 group-open:group-hover:rotate-[135deg] transition-all duration-500 text-3xl leading-none mt-1">+</span>
                </summary>
                <div className="mt-8 text-base md:text-lg font-bold font-mono text-[#000] bg-[#FAFAFA] p-5 border-4 border-[#000] shadow-[4px_4px_0px_#000] animate-in fade-in slide-in-from-top-4 duration-500">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* SEO CONTENT — Visually hidden but indexable by search engines */}
      <section aria-label="About SNIPCAST" className="sr-only">
        <h2>SNIPCAST — The Best Free Code Snippet Image Generator</h2>
        <p>
          SNIPCAST is a free, open-source code snippet image generator that transforms your source code into 
          beautiful, shareable images. Whether you need code screenshots for Twitter, blog posts, documentation, 
          presentations, or social media — SNIPCAST is the ultimate code-to-image tool for developers.
        </p>
        <h3>Why Developers Choose SNIPCAST Over Carbon and Ray.so</h3>
        <p>
          Unlike Carbon, Ray.so, Snappify, and Chalk.ist, SNIPCAST offers a completely free experience with 
          more customization options. Create stunning code images with 18+ syntax highlighting themes including 
          GitHub Dark, Dracula, Nord, Tokyo Night, Monokai, and more. Choose from gradient backgrounds, animated 
          patterns, or solid colors to make your code pop.
        </p>
        <h3>Supported Programming Languages</h3>
        <p>
          Generate beautiful code images for JavaScript, TypeScript, Python, Rust, Go, C++, Swift, Kotlin, Ruby, 
          PHP, Java, C#, Dart, Scala, Haskell, Elixir, Clojure, and 30+ more programming languages with automatic 
          syntax detection and highlighting powered by Shiki.
        </p>
        <h3>Features That Make SNIPCAST the Best Code Screenshot Tool</h3>
        <ul>
          <li>Beautiful gradient and animated backgrounds for code images</li>
          <li>18+ editor themes with syntax highlighting for 30+ languages</li>
          <li>Custom padding, border thickness, and drop shadow controls</li>
          <li>Window controls (macOS-style traffic light dots)</li>
          <li>One-click PNG and SVG export at any resolution</li>
          <li>Custom hex colors for borders and shadows to match your brand</li>
          <li>100% client-side — your code never leaves your browser</li>
          <li>Free and open source on GitHub</li>
          <li>No account required — just paste code and export</li>
        </ul>
        <h3>How to Create a Code Snippet Image</h3>
        <ol>
          <li>Open SNIPCAST Studio at snipcast.dev/studio</li>
          <li>Paste your source code into the editor</li>
          <li>Choose a syntax theme (GitHub Dark, Dracula, Nord, Tokyo Night, etc.)</li>
          <li>Pick a background — gradient, animated pattern, or solid color</li>
          <li>Adjust padding, borders, and shadows to your liking</li>
          <li>Export as PNG or SVG in one click</li>
        </ol>
        <h3>Use Cases for Code Snippet Images</h3>
        <p>
          Code images are perfect for sharing on Twitter/X, LinkedIn, Instagram, blog posts, README files, 
          technical documentation, slide decks, YouTube thumbnails, dev.to articles, Hashnode posts, Medium 
          articles, and any platform where you want your code to look professional and eye-catching.
        </p>
      </section>

      {/* MASSIVE FOOTER */}
      <footer role="contentinfo" className="bg-[#000] text-[#FAFAFA] pt-12 pb-6 flex flex-col border-t-8 border-[#FAFAFA]">
        <div className="scroll-reveal max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-8 mb-12 border-b-8 border-[#FAFAFA] pb-10 px-6 md:px-12">
          <div className="flex-1">
            <h2 className="text-[clamp(3rem,8vw,8rem)] leading-[0.8] font-black tracking-tighter uppercase mb-6">
              DON'T<br/>SETTLE.
            </h2>
            <p className="text-xl md:text-3xl font-bold uppercase tracking-tight text-[#FF9F0A] max-w-xl">
              Elevate your codebase with the ultimate aesthetic rendering engine.
            </p>
          </div>
          <div className="shrink-0 group">
            <TransitionLink href="/studio" className="flex items-center justify-center w-48 h-48 md:w-64 md:h-64 border-8 border-[#FAFAFA] bg-[#FF9F0A] text-[#000] text-2xl md:text-3xl font-black uppercase tracking-tighter hover:bg-[#FAFAFA] hover:border-[#FF9F0A] transition-all duration-300 hover:-translate-y-2 hover:-translate-x-2 shadow-[0px_0px_0px_#FF9F0A] group-hover:shadow-[16px_16px_0px_#FF9F0A]">
              START NOW <ArrowRight className="ml-2 w-8 h-8 md:w-10 md:h-10" strokeWidth={4} />
            </TransitionLink>
          </div>
        </div>
        
        <div className="w-full flex flex-col items-center overflow-hidden scroll-reveal mt-4">
          <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center text-sm md:text-xl font-black uppercase tracking-widest mb-6 text-[#FAFAFA]/70 gap-6 px-6 md:px-12">
            <div className="flex gap-4 md:gap-8 flex-wrap justify-center md:justify-start">
              <a href="https://github.com/DShivam9/snipcast" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF9F0A] transition-colors">GITHUB</a>
              <TransitionLink href="/privacy" variant="legal" className="hover:text-[#FF9F0A] transition-colors">PRIVACY POLICY</TransitionLink>
              <TransitionLink href="/terms" variant="legal" className="hover:text-[#FF9F0A] transition-colors">TERMS OF SERVICE</TransitionLink>
            </div>
            <span className="shrink-0">&copy; {new Date().getFullYear()} SNIPCAST INC.</span>
          </div>
          <div className="w-full overflow-hidden flex whitespace-nowrap">
            <div className="footer-marquee flex w-max mt-4">
              <span aria-hidden="true" className="text-[14vw] leading-[0.75] font-black tracking-tighter uppercase text-[#FAFAFA] pr-16 select-none block">
                SNIPCAST &mdash; SNIPCAST &mdash; 
              </span>
              <span aria-hidden="true" className="text-[14vw] leading-[0.75] font-black tracking-tighter uppercase text-[#FAFAFA] pr-16 select-none block">
                SNIPCAST &mdash; SNIPCAST &mdash; 
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
