"use client";

import Link from "next/link";
import { ArrowRight, Code2, MonitorSmartphone, Zap, Layers, MousePointerClick } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SiJavascript, SiTypescript, SiPython, SiRust, SiGo, SiCplusplus, SiSwift, SiKotlin, SiRuby, SiPhp, SiGithub } from "react-icons/si";
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
];

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

function BrutalistButton({ children, className, href }: any) {
  return (
    <TransitionLink 
      href={href} 
      className={`inline-block border-4 border-foreground bg-background text-foreground uppercase font-black tracking-widest px-8 py-5 transition-all duration-150 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_#FF9F0A] active:translate-x-0 active:translate-y-0 active:shadow-none ${className}`}
    >
      {children}
    </TransitionLink>
  );
}

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
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      )
      .fromTo(".hero-bg-marquees", 
        { opacity: 0 }, 
        { opacity: 1, duration: 1.5, ease: "power2.inOut" },
        "-=0.4"
      )
      .fromTo(".hero-word", 
        { y: 150, opacity: 0, rotateX: -90, rotateY: 10, z: -200 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.05, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(".hero-cta",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo([".hero-marquee", ".hero-marquee-reverse"],
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.inOut" },
        "-=0.2"
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
      <nav className="nav-bar fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-3 md:py-4 border-b-4 border-[#000] bg-[#FAFAFA] text-[#000]">
        <div className="flex items-center gap-3">
          <div className="bg-[#FF9F0A] p-1.5 border-4 border-[#000]">
            <Code2 className="w-5 h-5 md:w-6 md:h-6 text-[#000]" strokeWidth={3} />
          </div>
          <span className="text-2xl md:text-3xl font-black tracking-tight uppercase">SNIPCAST</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 lg:gap-12 text-sm font-bold tracking-widest uppercase">
          <Link href="#features" className="hover:bg-[#FF9F0A] px-3 py-1 border-4 border-transparent hover:border-[#000] hover:shadow-[4px_4px_0px_#000] transition-all">Features</Link>
          <Link href="#engine" className="hover:bg-[#FF9F0A] px-3 py-1 border-4 border-transparent hover:border-[#000] hover:shadow-[4px_4px_0px_#000] transition-all">Engine</Link>
          <Link href="#previews" className="hover:bg-[#FF9F0A] px-3 py-1 border-4 border-transparent hover:border-[#000] hover:shadow-[4px_4px_0px_#000] transition-all">Previews</Link>
          <Link href="#faq" className="hover:bg-[#FF9F0A] px-3 py-1 border-4 border-transparent hover:border-[#000] hover:shadow-[4px_4px_0px_#000] transition-all">FAQ</Link>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://github.com/DShivam9/codesnippt" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center justify-center bg-[#FAFAFA] text-[#000] p-2 border-4 border-[#000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_#000] transition-all hover:bg-[#FF9F0A]">
            <SiGithub className="w-5 h-5" />
          </a>
          <TransitionLink href="/studio" className="bg-[#FF9F0A] text-[#000] px-6 md:px-8 py-3 border-4 border-[#000] font-black tracking-widest text-sm uppercase hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_#000] transition-all">
            Launch App
          </TransitionLink>
        </div>
      </nav>

      {/* HERO - Cinematic Center Layout */}
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#050505]">
        
        {/* Brutalist Typographic Background */}
        <div className="hero-bg-marquees absolute inset-0 w-full h-full pointer-events-none">
          <div className="absolute top-[16%] left-0 w-full overflow-hidden opacity-[0.08]">
            <div className="hero-marquee flex whitespace-nowrap w-max">
              <h1 className="text-[15vw] leading-none font-black uppercase tracking-tighter pr-16">SNIPCAST &mdash; SNIPCAST &mdash; SNIPCAST &mdash; SNIPCAST &mdash; </h1>
              <h1 className="text-[15vw] leading-none font-black uppercase tracking-tighter pr-16">SNIPCAST &mdash; SNIPCAST &mdash; SNIPCAST &mdash; SNIPCAST &mdash; </h1>
            </div>
          </div>
          <div className="absolute bottom-[8%] left-0 w-full overflow-hidden opacity-[0.12]">
            <div className="hero-marquee-fast flex whitespace-nowrap w-max">
              <h1 className="text-[15vw] leading-none font-black uppercase tracking-tighter pr-16 text-transparent [-webkit-text-stroke:4px_#FAFAFA]">CODE TO IMAGE &mdash; CODE TO IMAGE &mdash; CODE TO IMAGE &mdash; CODE TO IMAGE &mdash; </h1>
              <h1 className="text-[15vw] leading-none font-black uppercase tracking-tighter pr-16 text-transparent [-webkit-text-stroke:4px_#FAFAFA]">CODE TO IMAGE &mdash; CODE TO IMAGE &mdash; CODE TO IMAGE &mdash; CODE TO IMAGE &mdash; </h1>
            </div>
          </div>
        </div>

        <div className="max-w-6xl w-full relative z-10 text-center flex flex-col items-center mt-12 [perspective:1000px]">
          <h1 className="text-4xl md:text-6xl lg:text-7xl leading-tight font-bold tracking-tight w-full max-w-5xl mb-16 flex flex-wrap justify-center text-center">
            {("Turn your source code into beautiful, shareable images.").split(" ").map((word, i) => (
              <span key={i} className="hero-word inline-block mr-3 md:mr-4 origin-bottom">{word}</span>
            ))}
          </h1>

          <div className="hero-cta flex flex-col md:flex-row items-center gap-8 border-4 border-[#FAFAFA] bg-black/50 backdrop-blur-md p-8 md:p-12 shadow-[16px_16px_0px_#FF9F0A] max-w-4xl">
            <p className="text-xl md:text-3xl font-bold uppercase tracking-tight leading-tight text-left">
              Paste code. Pick theme. Export stunning screenshots. Built for developers who refuse to share boring text.
            </p>
            
            <BrutalistButton href="/studio" className="w-full md:w-auto text-xl flex items-center justify-center gap-4 bg-[#FF9F0A] text-[#000] border-[#000] shadow-[8px_8px_0px_#FAFAFA] hover:shadow-[12px_12px_0px_#FAFAFA] shrink-0">
              START RENDERING
              <ArrowRight className="w-6 h-6" strokeWidth={3} />
            </BrutalistButton>
          </div>
        </div>
      </section>

      {/* BENTO GRID (Interest) - Gapless & Mathematically Perfect */}
      <section id="engine" className="relative py-32 md:py-48 px-4 md:px-12 bg-[#FAFAFA] text-[#000] border-b-8 border-[#000]">
        <div className="max-w-7xl mx-auto flex flex-col">
          <h2 className="scroll-reveal text-[clamp(4rem,10vw,10rem)] leading-none font-black tracking-tighter mb-20 uppercase border-b-8 border-[#000] pb-6">
            THE ENGINE
          </h2>
          
          <div ref={bentoRef} className="grid grid-cols-1 lg:grid-cols-4 grid-flow-dense gap-1 border-4 border-[#000] bg-[#000]">
            {/* Card 1: Cinematic Large */}
            <div className="bento-card col-span-1 lg:col-span-2 row-span-2 bg-[#FAFAFA] p-12 flex flex-col justify-between group hover:bg-[#FF9F0A] transition-all duration-300 hover:z-10 hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[12px_12px_0px_#000] min-h-[500px]">
              <MonitorSmartphone className="w-20 h-20 text-[#000] group-hover:scale-110 transition-transform duration-300 mb-8" strokeWidth={2} />
              <div>
                <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 uppercase leading-none">Retina<br/>Ready</h3>
                <p className="text-2xl font-bold max-w-md uppercase">Render outputs at massive 3x resolutions. Crisp text on every high-density display.</p>
              </div>
            </div>

            {/* Card 2: Wide */}
            <div className="bento-card col-span-1 lg:col-span-2 row-span-1 bg-[#111] text-[#FAFAFA] p-10 flex flex-col justify-between group hover:bg-[#FF9F0A] hover:text-[#000] transition-all duration-300 hover:z-10 hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[12px_12px_0px_#000]">
              <Zap className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
              <div>
                <h3 className="text-4xl font-black tracking-tighter mb-2 uppercase">Zero Latency</h3>
                <p className="text-xl font-bold uppercase">Client-side rendering pipeline.</p>
              </div>
            </div>

            {/* Card 3: Square */}
            <div className="bento-card col-span-1 lg:col-span-1 row-span-1 bg-[#FAFAFA] p-10 flex flex-col justify-between group hover:bg-[#000] hover:text-[#FAFAFA] transition-all duration-300 hover:z-10 hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[12px_12px_0px_#FF9F0A]">
              <Layers className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
              <div>
                <h3 className="text-3xl font-black tracking-tighter mb-2 uppercase">Layered Arch</h3>
                <p className="text-lg font-bold uppercase">Absolute control.</p>
              </div>
            </div>

            {/* Card 4: Square Accent */}
            <div className="bento-card col-span-1 lg:col-span-1 row-span-1 bg-[#FF9F0A] text-[#000] p-10 flex flex-col justify-between group hover:bg-[#FAFAFA] transition-all duration-300 hover:z-10 hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[12px_12px_0px_#000]">
              <MousePointerClick className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
              <div>
                <h3 className="text-3xl font-black tracking-tighter mb-2 uppercase">Precision</h3>
                <p className="text-lg font-bold uppercase">Magnetic exactness.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THEME ARCHITECTURE (Desire) - Scrubbing Text Reveal */}
      <section id="themes" className="relative py-32 md:py-48 px-6 md:px-12 bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 relative z-10">
          
          <div className="flex-1 w-full scroll-reveal">
            <h2 className="text-[clamp(4rem,8vw,8rem)] font-black tracking-tighter uppercase mb-12 leading-[0.85] text-[#FAFAFA]">THEME<br/>ARCH.</h2>
            <p ref={textRevealRef} className="text-3xl md:text-5xl font-black mb-12 uppercase leading-tight text-[#FAFAFA]">
              {("Start with the best. Our signature Obsidian theme provides maximum legibility and violent aesthetic impact.").split("").map((char, idx) => (
                <span key={idx} className="reveal-char">{char}</span>
              ))}
            </p>
            <BrutalistButton href="/studio" className="bg-[#FAFAFA] text-[#000] shadow-[8px_8px_0px_#FF9F0A]">
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

      {/* INFINITE MARQUEE & LANGUAGES */}
      <section className="marquee-section relative py-32 border-t-8 border-b-8 border-[#FAFAFA] bg-[#FF9F0A] overflow-hidden flex flex-col justify-center">
        <div className="massive-marquee absolute inset-0 flex items-center w-[200vw]">
          <span className="text-[25vw] font-black uppercase whitespace-nowrap tracking-tighter text-[#000] opacity-20 mix-blend-overlay">
            EVERY LANGUAGE EVERY LANGUAGE EVERY LANGUAGE EVERY LANGUAGE
          </span>
        </div>
        <div className="scroll-reveal relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8">
          {languageLogos.map((logo, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center p-8 border-4 border-[#000] bg-[#FAFAFA] shadow-[8px_8px_0px_#000] hover:-translate-y-2 hover:shadow-[12px_12px_0px_#000] transition-all duration-300">
              <div className="text-6xl mb-4 grayscale hover:grayscale-0 transition-all duration-300">{logo.node}</div>
              <span className="font-black uppercase text-sm tracking-widest text-[#000]">{logo.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="relative py-32 bg-[#050505] border-t-8 border-[#FAFAFA]">
        <div className="scroll-reveal max-w-5xl mx-auto px-6">
          <h2 className="text-[clamp(3rem,8vw,6rem)] font-black uppercase tracking-tighter text-[#FAFAFA] mb-16 leading-[0.85]">
            FREQUENTLY<br/>ASKED.
          </h2>
          <div className="flex flex-col gap-8">
            <details className="group border-4 border-[#FAFAFA] bg-[#050505] p-6 md:p-8 shadow-[8px_8px_0px_#FF9F0A] open:bg-[#FF9F0A] open:border-[#000] open:shadow-[12px_12px_0px_#FAFAFA] transition-all duration-300">
              <summary className="font-black text-xl md:text-3xl uppercase tracking-widest cursor-pointer list-none flex justify-between items-center group-open:text-[#000] text-[#FAFAFA]">
                Is this really free?
                <span className="text-[#FF9F0A] group-open:text-[#000] group-open:rotate-45 transition-transform duration-300 text-4xl leading-none">+</span>
              </summary>
              <div className="mt-8 text-lg md:text-xl font-bold font-mono text-[#000]">
                Yes, 100%. No paywalls, no subscriptions. We believe in open tools for developers. Just jump into the studio and start rendering.
              </div>
            </details>
            <details className="group border-4 border-[#FAFAFA] bg-[#050505] p-6 md:p-8 shadow-[8px_8px_0px_#FF9F0A] open:bg-[#FF9F0A] open:border-[#000] open:shadow-[12px_12px_0px_#FAFAFA] transition-all duration-300">
              <summary className="font-black text-xl md:text-3xl uppercase tracking-widest cursor-pointer list-none flex justify-between items-center group-open:text-[#000] text-[#FAFAFA]">
                What languages are supported?
                <span className="text-[#FF9F0A] group-open:text-[#000] group-open:rotate-45 transition-transform duration-300 text-4xl leading-none">+</span>
              </summary>
              <div className="mt-8 text-lg md:text-xl font-bold font-mono text-[#000]">
                We support syntax highlighting for pretty much everything. JavaScript, TypeScript, Python, Rust, Go, C++, and dozens more. If you can code in it, we can highlight it.
              </div>
            </details>
            <details className="group border-4 border-[#FAFAFA] bg-[#050505] p-6 md:p-8 shadow-[8px_8px_0px_#FF9F0A] open:bg-[#FF9F0A] open:border-[#000] open:shadow-[12px_12px_0px_#FAFAFA] transition-all duration-300">
              <summary className="font-black text-xl md:text-3xl uppercase tracking-widest cursor-pointer list-none flex justify-between items-center group-open:text-[#000] text-[#FAFAFA]">
                Can I use the images commercially?
                <span className="text-[#FF9F0A] group-open:text-[#000] group-open:rotate-45 transition-transform duration-300 text-4xl leading-none">+</span>
              </summary>
              <div className="mt-8 text-lg md:text-xl font-bold font-mono text-[#000]">
                Absolutely. Generate snippets for your blog, Twitter, client presentations, or commercial projects. The renders are completely yours.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* MASSIVE FOOTER */}
      <footer className="bg-[#000] text-[#FAFAFA] pt-12 pb-6 flex flex-col border-t-8 border-[#FAFAFA]">
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
              <a href="https://github.com/DShivam9/codesnippt" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF9F0A] transition-colors">GITHUB</a>
              <TransitionLink href="/privacy" variant="legal" className="hover:text-[#FF9F0A] transition-colors">PRIVACY POLICY</TransitionLink>
              <TransitionLink href="/terms" variant="legal" className="hover:text-[#FF9F0A] transition-colors">TERMS OF SERVICE</TransitionLink>
            </div>
            <span className="shrink-0">&copy; {new Date().getFullYear()} SNIPCAST INC.</span>
          </div>
          <div className="w-full overflow-hidden flex whitespace-nowrap">
            <div className="footer-marquee flex w-max mt-4">
              <h1 className="text-[14vw] leading-[0.75] font-black tracking-tighter uppercase text-[#FAFAFA] pr-16 select-none">
                SNIPCAST &mdash; SNIPCAST &mdash; 
              </h1>
              <h1 className="text-[14vw] leading-[0.75] font-black tracking-tighter uppercase text-[#FAFAFA] pr-16 select-none">
                SNIPCAST &mdash; SNIPCAST &mdash; 
              </h1>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
