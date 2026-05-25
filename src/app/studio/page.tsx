"use client";

import React, { useState, useRef } from "react";
import CodeEditor from "@/components/CodeEditor";
import ExportPanel from "@/components/ExportPanel";
import Link from "next/link";
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

const LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "rust",
  "go",
  "html",
  "css",
  "json",
  "bash",
  "sql"
];

const BACKGROUNDS = [
  "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
  "bg-gradient-to-br from-cyan-400 to-blue-600",
  "bg-gradient-to-br from-orange-400 to-rose-500",
  "bg-gradient-to-br from-emerald-400 to-cyan-500",
  "bg-gradient-to-br from-zinc-800 to-zinc-900",
  "bg-[#050505]", // Solid black
  "bg-[#FAFAFA]",  // Solid white
  "bg-[#FF3300]"  // Solid brand orange
];

const DEFAULT_CODE = `function createBrutalistDesign() {
  const aesthetic = {
    contrast: "maximum",
    borders: "thick",
    shadows: "hard",
    typography: "massive"
  };

  return function apply(element) {
    element.style.border = "4px solid #000";
    element.style.boxShadow = "8px 8px 0px #000";
    element.style.fontWeight = "900";
    element.style.textTransform = "uppercase";
    console.log("Brutalism applied:", aesthetic);
  };
}

const styleMyButton = createBrutalistDesign();
styleMyButton(document.getElementById("btn"));`;

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
  const [code, setCode] = useState(DEFAULT_CODE);
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("github-dark");
  const [bgGradient, setBgGradient] = useState(BACKGROUNDS[0]);
  const [padding, setPadding] = useState(64);
  const [showWindowControls, setShowWindowControls] = useState(true);

  const exportRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FAFAFA] text-[#050505] font-sans selection:bg-[#FF3300] selection:text-[#FAFAFA]">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-[400px] border-r-8 border-[#050505] bg-[#FAFAFA] flex flex-col h-screen overflow-y-auto z-10 shrink-0 shadow-[16px_0px_0px_rgba(0,0,0,0.05)]">
        
        {/* Header */}
        <div className="p-6 border-b-8 border-[#050505] bg-[#050505] text-[#FAFAFA] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <Link href="/" className="hover:text-[#FF3300] transition-colors">
              <ArrowLeft size={28} strokeWidth={3} />
            </Link>
            <h1 className="text-3xl font-black uppercase tracking-tighter">Studio</h1>
          </div>
          <Settings2 size={24} />
        </div>

        {/* Controls */}
        <div className="p-8 flex flex-col gap-10">
          
          {/* Theme & Language */}
          <div className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-black uppercase tracking-widest mb-3">Language</label>
              <BrutalistSelect value={language} onChange={setLanguage} options={LANGUAGES} />
            </div>

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
                  className={`w-full aspect-square border-4 ${bgGradient === bg ? 'border-[#FF3300] scale-110 shadow-[4px_4px_0px_#FF3300]' : 'border-[#050505] shadow-[4px_4px_0px_#050505] hover:scale-105'} transition-all ${bg}`}
                />
              ))}
            </div>
          </div>

          <hr className="border-2 border-[#050505]" />

          {/* Layout Controls */}
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
      <main className="flex-1 h-screen overflow-auto bg-[#EBEBEB] relative flex items-center justify-center p-4 md:p-12">
        {/* Checkerboard Pattern */}
        <div 
          className="fixed inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: 'repeating-linear-gradient(45deg, #050505 25%, transparent 25%, transparent 75%, #050505 75%, #050505), repeating-linear-gradient(45deg, #050505 25%, #FAFAFA 25%, #FAFAFA 75%, #050505 75%, #050505)',
            backgroundPosition: '0 0, 10px 10px',
            backgroundSize: '20px 20px'
          }} 
        />

        {/* Export Node */}
        <div 
          ref={exportRef}
          className={`relative transition-all duration-300 shadow-[24px_24px_0px_#050505] border-8 border-[#050505] flex items-center justify-center overflow-hidden ${bgGradient}`}
          style={{ padding: `${padding}px` }}
        >
          {/* Editor Container */}
          <div className="relative w-full min-w-[320px] md:min-w-[600px] z-10">
            {/* The actual Code Editor using Shiki */}
            <CodeEditor 
              code={code} 
              setCode={setCode} 
              language={language} 
              theme={theme} 
              showWindowControls={showWindowControls}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
