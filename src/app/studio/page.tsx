"use client";

import React, { useState, useRef, useEffect } from "react";
import CodeEditor from "@/components/CodeEditor";
import ExportPanel from "@/components/ExportPanel";
import TransitionLink from "@/components/TransitionLink";
import { ArrowLeft, Settings2 } from "lucide-react";

const THEMES = [
  "github-dark",
  "github-light",
  "nord",
  "dracula",
  "monokai",
  "poimandres",
  "rose-pine",
  "slack-dark",
  "min-dark",
  "min-light",
  "tokyo-night",
  "vitesse-dark",
  "vitesse-light",
  "solarized-dark",
  "solarized-light",
  "synthwave-84",
  "material-theme",
  "night-owl"
];



const BACKGROUNDS = [
  // Gradients
  "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
  "bg-gradient-to-tr from-yellow-400 via-red-500 to-pink-500",
  "bg-gradient-to-br from-emerald-400 to-cyan-500",
  
  // Solid
  "bg-[#050505]", // Solid black
  "bg-[#FAFAFA]", // Solid white
  "bg-[#FF3300]", // Solid brand orange
  
  // Static Patterns
  "bg-grid-pattern", // Dark grid
  "bg-grid-pattern-light", // Light grid
  "bg-dots-pattern", // Dark dots
  "bg-stripes-warning", // Static diagonal warning stripes
  
  // Animated
  "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient",
  "animate-stripes", // Moving warning stripes
  "animate-blueprint", // Panning vibrant blue graph paper
  "animate-dots", // Panning brutalist orange dots
];



const BrutalistSelect = ({ value, onChange, options }: { value: string, onChange: (v: string) => void, options: string[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-[#FAFAFA] border-4 border-[#050505] p-4 font-bold uppercase cursor-pointer hover:bg-[#EBEBEB] focus:outline-none focus:ring-4 focus:ring-[#FF3300]/30 transition-all shadow-[4px_4px_0px_#050505]"
      >
        <span>{value}</span>
        <span className="font-black text-[#050505]">{isOpen ? '▲' : '▼'}</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-[#FAFAFA] border-4 border-[#050505] shadow-[4px_4px_0px_#050505] z-50 max-h-[300px] overflow-y-auto overscroll-contain">
          {options.map(opt => (
            <div 
              key={opt}
              onClick={() => { onChange(opt); setIsOpen(false); }}
              className={`p-3 font-bold uppercase cursor-pointer hover:bg-[#FF3300] hover:text-[#FAFAFA] border-b-2 border-[#050505] last:border-b-0 ${value === opt ? 'bg-[#050505] text-[#FAFAFA]' : 'text-[#050505]'}`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function StudioPage() {
  const [code, setCode] = useState("");
  const [filename, setFilename] = useState("");
  const [theme, setTheme] = useState("github-dark");
  const [bgGradient, setBgGradient] = useState(BACKGROUNDS[0]);
  const [padding, setPadding] = useState(64);
  const [showWindowControls, setShowWindowControls] = useState(true);
  const [borderThickness, setBorderThickness] = useState(8);
  const [shadowDistance, setShadowDistance] = useState(24);
  const [borderColor, setBorderColor] = useState("#050505");
  const [shadowColor, setShadowColor] = useState("#050505");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem("snipcast_prefs");
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (p.code !== undefined) setCode(p.code);
        if (p.filename !== undefined) setFilename(p.filename);
        if (p.theme !== undefined) setTheme(p.theme);
        if (p.bgGradient !== undefined) setBgGradient(p.bgGradient);
        if (p.padding !== undefined) setPadding(p.padding);
        if (p.showWindowControls !== undefined) setShowWindowControls(p.showWindowControls);
        if (p.borderThickness !== undefined) setBorderThickness(p.borderThickness);
        if (p.shadowDistance !== undefined) setShadowDistance(p.shadowDistance);
        if (p.borderColor !== undefined) setBorderColor(p.borderColor);
        if (p.shadowColor !== undefined) setShadowColor(p.shadowColor);
      } catch (e) {
        console.error("Failed to load preferences", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Save to localStorage on change
    if (!isLoaded) return;
    localStorage.setItem("snipcast_prefs", JSON.stringify({
      code, filename, theme, bgGradient, padding, showWindowControls, borderThickness, shadowDistance, borderColor, shadowColor
    }));
  }, [code, filename, theme, bgGradient, padding, showWindowControls, borderThickness, shadowDistance, borderColor, shadowColor, isLoaded]);

  const exportRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`min-h-screen flex flex-col md:flex-row bg-[#FAFAFA] text-[#050505] font-sans selection:bg-[#FF3300] selection:text-[#FAFAFA] transition-opacity duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-[400px] border-r-8 border-[#050505] bg-[#FAFAFA] flex flex-col h-screen overflow-y-auto z-10 shrink-0 shadow-[16px_0px_0px_rgba(0,0,0,0.05)]">
        
        {/* Header */}
        <div className="p-6 border-b-8 border-[#050505] bg-[#050505] text-[#FAFAFA] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <TransitionLink href="/" variant="back" className="hover:text-[#FF3300] transition-colors">
              <ArrowLeft size={28} strokeWidth={3} />
            </TransitionLink>
            <h1 className="text-3xl font-black uppercase tracking-tighter">Studio</h1>
          </div>
          <Settings2 size={24} />
        </div>

        {/* Controls */}
        <div className="p-8 flex flex-col gap-10">
          
          {/* Theme */}
          <div className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-black uppercase tracking-widest mb-3">Theme</label>
              <BrutalistSelect value={theme} onChange={setTheme} options={THEMES} />
            </div>
          </div>

          <hr className="border-2 border-[#050505]" />

          {/* Backgrounds */}
          <div>
            <label className="block text-sm font-black uppercase tracking-widest mb-4">Background</label>
            <div className="grid grid-cols-4 gap-4">
              {BACKGROUNDS.map((bg, i) => (
                <button
                  key={i}
                  onClick={() => setBgGradient(bg)}
                  className={`relative w-full aspect-square border-4 ${bgGradient === bg ? 'border-[#FF3300] scale-110 shadow-[4px_4px_0px_#FF3300]' : 'border-[#050505] shadow-[4px_4px_0px_#050505] hover:scale-105'} transition-all ${bg}`}
                >
                  {bg.includes('animate-') && (
                    <div className="absolute -top-2 -right-2 bg-[#FF3300] border-2 border-[#050505] text-[#050505] font-black text-[9px] px-1 shadow-[2px_2px_0px_#050505] uppercase tracking-tighter rotate-12 z-10 pointer-events-none">
                      Anim
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-2 border-[#050505]" />

          <div>
             <label className="block text-sm font-black uppercase tracking-widest mb-4">Padding ({padding}px)</label>
             <input 
               type="range" 
               min="16" 
               max="128" 
               step="16"
               value={padding}
               onChange={(e) => setPadding(Number(e.target.value))}
               className="w-full accent-[#FF3300] h-3 bg-[#050505] appearance-none cursor-pointer"
             />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-sm font-black uppercase tracking-widest mb-4">Border ({borderThickness}px)</label>
               <input 
                 type="range" 
                 min="0" 
                 max="16" 
                 step="2"
                 value={borderThickness}
                 onChange={(e) => setBorderThickness(Number(e.target.value))}
                 className="w-full accent-[#FF3300] h-3 bg-[#050505] appearance-none cursor-pointer"
               />
            </div>
            <div>
               <label className="block text-sm font-black uppercase tracking-widest mb-4">Color</label>
               <input 
                 type="color" 
                 value={borderColor}
                 onChange={(e) => setBorderColor(e.target.value)}
                 className="w-full h-8 cursor-pointer p-0 border-0 bg-transparent"
               />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-sm font-black uppercase tracking-widest mb-4">Shadow ({shadowDistance}px)</label>
               <input 
                 type="range" 
                 min="0" 
                 max="48" 
                 step="4"
                 value={shadowDistance}
                 onChange={(e) => setShadowDistance(Number(e.target.value))}
                 className="w-full accent-[#FF3300] h-3 bg-[#050505] appearance-none cursor-pointer mb-2"
               />
            </div>
            <div>
               <label className="block text-sm font-black uppercase tracking-widest mb-4">Color</label>
               <input 
                 type="color" 
                 value={shadowColor}
                 onChange={(e) => setShadowColor(e.target.value)}
                 className="w-full h-8 cursor-pointer p-0 border-0 bg-transparent"
               />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-black uppercase tracking-widest">Window Controls</label>
            <button 
              onClick={() => setShowWindowControls(!showWindowControls)}
              className={`w-14 h-8 border-4 border-[#050505] rounded-full relative transition-colors ${showWindowControls ? 'bg-[#FF3300]' : 'bg-[#FAFAFA]'}`}
            >
              <div className={`w-4 h-4 bg-[#050505] absolute top-1 transition-all ${showWindowControls ? 'left-8' : 'left-1'}`} />
            </button>
          </div>

          <hr className="border-2 border-[#050505]" />

          <ExportPanel targetRef={exportRef} />
        </div>
      </aside>

      {/* CANVAS */}
      <main className="flex-1 h-screen overflow-auto bg-[#EBEBEB] relative flex flex-col p-4 md:p-12">
        {/* Checkerboard Pattern */}
        <div 
          className="fixed inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: 'repeating-linear-gradient(45deg, #050505 25%, transparent 25%, transparent 75%, #050505 75%, #050505), repeating-linear-gradient(45deg, #050505 25%, #FAFAFA 25%, #FAFAFA 75%, #050505 75%, #050505)',
            backgroundPosition: '0 0, 10px 10px',
            backgroundSize: '20px 20px'
          }} 
        />

        {/* Layout Wrapper to handle scrolling and centering */}
        <div className="m-auto flex-shrink-0 py-8">
          {/* Export Node Wrapper: Uniform padding prevents html-to-image bounding box clipping bugs 
              and provides a nice transparent frame around the image for social media. */}
          <div 
            ref={exportRef}
            style={{
              padding: `${Math.max(shadowDistance + 32, 64)}px`,
              backgroundColor: 'transparent'
            }}
          >
            {/* Visual Background Node */}
            <div 
              className={`relative transition-all duration-300 flex items-center justify-center overflow-hidden ${bgGradient}`}
              style={{ 
                padding: `${padding}px`,
                border: `${borderThickness}px solid ${borderColor}`,
                boxShadow: `${shadowDistance}px ${shadowDistance}px 0px ${shadowColor}`
              }}
            >
            {/* Editor Container */}
            <div className="relative w-full min-w-[320px] md:min-w-[600px] z-10">
              {/* The actual Code Editor using Shiki */}
              <CodeEditor 
                code={code} 
                setCode={setCode} 
                filename={filename}
                setFilename={setFilename}
                theme={theme} 
                showWindowControls={showWindowControls}
              />
            </div>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
}
