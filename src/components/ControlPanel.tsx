"use client";

import { LANGUAGES, THEMES, SOLID_COLORS } from "../lib/constants";
import { toPng } from "html-to-image";
import { TerminalSquare, Download, ChevronRight } from "lucide-react";

interface ControlPanelProps {
  language: string;
  setLanguage: (lang: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
  padding: number;
  setPadding: (p: number) => void;
  bgColor: string;
  setBgColor: (c: string) => void;
}

export default function ControlPanel({
  language,
  setLanguage,
  theme,
  setTheme,
  padding,
  setPadding,
  bgColor,
  setBgColor,
}: ControlPanelProps) {
  
  const handleExport = async () => {
    const node = document.getElementById("export-node");
    if (!node) return;
    try {
      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 3, // High-res output
      });
      const link = document.createElement("a");
      link.download = `artifact_${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to export image", err);
    }
  };

  return (
    <div className="flex flex-col text-xs">
      
      {/* Export Action */}
      <div className="p-4 border-b border-border bg-card">
        <button
          onClick={handleExport}
          className="w-full py-3 px-4 bg-primary text-primary-foreground font-bold tracking-[0.2em] uppercase border border-primary hover:bg-foreground hover:text-background flex items-center justify-center gap-2 group transition-none"
        >
          <Download className="w-4 h-4 group-hover:animate-bounce" />
          <span>EXECUTE_RENDER</span>
        </button>
      </div>

      {/* Language Config */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-3 text-muted-foreground uppercase tracking-widest font-bold">
          <ChevronRight className="w-3 h-3" />
          <span>CFG.LANGUAGE</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setLanguage(lang.id)}
              className={`py-2 px-3 border text-left flex justify-between items-center transition-none ${
                language === lang.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-transparent text-muted-foreground hover:bg-card hover:text-foreground"
              }`}
            >
              <span className="tracking-widest">{lang.label}</span>
              {language === lang.id && <span className="w-1.5 h-1.5 bg-primary animate-blink" />}
            </button>
          ))}
        </div>
      </div>

      {/* Theme Config */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-3 text-muted-foreground uppercase tracking-widest font-bold">
          <ChevronRight className="w-3 h-3" />
          <span>CFG.SYNTAX_THEME</span>
        </div>
        <div className="flex flex-col gap-2">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`py-2 px-3 border text-left flex justify-between items-center transition-none ${
                theme === t.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-transparent text-muted-foreground hover:bg-card hover:text-foreground"
              }`}
            >
              <span className="tracking-widest">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Background Config */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-3 text-muted-foreground uppercase tracking-widest font-bold">
          <ChevronRight className="w-3 h-3" />
          <span>CFG.MATTE_BACKDROP</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {SOLID_COLORS.map((color) => (
            <button
              key={color.id}
              onClick={() => setBgColor(color.id)}
              className={`h-10 border transition-none flex items-center justify-center ${
                bgColor === color.id ? "border-primary" : "border-border hover:border-muted-foreground"
              }`}
              style={{ backgroundColor: color.id }}
              title={color.label}
            >
              {bgColor === color.id && <div className="w-2 h-2 bg-primary mix-blend-difference" />}
            </button>
          ))}
        </div>
      </div>

      {/* Padding Config */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3 text-muted-foreground uppercase tracking-widest font-bold">
          <div className="flex items-center gap-2">
            <ChevronRight className="w-3 h-3" />
            <span>CFG.PADDING</span>
          </div>
          <span className="text-primary">[{padding}PX]</span>
        </div>
        <input
          type="range"
          min="16"
          max="128"
          step="16"
          value={padding}
          onChange={(e) => setPadding(Number(e.target.value))}
          className="w-full accent-primary h-1 bg-border appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-[9px] text-muted-foreground mt-2">
          <span>MIN</span>
          <span>MAX</span>
        </div>
      </div>

    </div>
  );
}
