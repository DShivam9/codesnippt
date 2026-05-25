"use client";

import { useState } from "react";
import Link from "next/link";
import { Terminal as TerminalIcon } from "lucide-react";
import CodeEditor from "@/components/CodeEditor";
import ControlPanel from "@/components/ControlPanel";

export default function EditorPage() {
  const [code, setCode] = useState("fn boot_sequence() {\n    let status = \"SYSTEM_READY\";\n    \n    if status == \"SYSTEM_READY\" {\n        render_artifact();\n    }\n}");
  const [language, setLanguage] = useState("rust");
  const [theme, setTheme] = useState("github-dark");
  const [padding, setPadding] = useState(64);
  const [bgColor, setBgColor] = useState("#0A0A0A");

  return (
    <div className="h-screen w-full bg-background text-foreground font-mono overflow-hidden flex flex-col relative selection:bg-primary selection:text-background">
      
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-50" style={{
        backgroundImage: `
          linear-gradient(to right, var(--border) 1px, transparent 1px),
          linear-gradient(to bottom, var(--border) 1px, transparent 1px)
        `,
        backgroundSize: '2rem 2rem'
      }} />

      {/* Top Bar (tmux status line) */}
      <header className="h-10 border-b border-border bg-card flex items-center px-4 justify-between shrink-0 z-20 text-[10px] tracking-widest uppercase">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-foreground">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>[ EXIT ]</span>
          </Link>
          <span className="text-muted-foreground border-l border-border pl-4">SESSION: 0</span>
          <span className="text-muted-foreground border-l border-border pl-4">WINDOW: STUDIO</span>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground">
          <span className="border-r border-border pr-4">MEM: 14MB</span>
          <span className="text-primary animate-blink">_</span>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        
        {/* Left Pane (Controls) */}
        <aside className="w-80 border-r border-border bg-background shrink-0 flex flex-col">
          <div className="h-8 border-b border-border bg-card flex items-center px-4 text-[10px] tracking-widest text-muted-foreground uppercase">
            &gt; pane_0_controls
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <ControlPanel 
              language={language}
              setLanguage={setLanguage}
              theme={theme}
              setTheme={setTheme}
              padding={padding}
              setPadding={setPadding}
              bgColor={bgColor}
              setBgColor={setBgColor}
            />
          </div>
        </aside>

        {/* Right Pane (Canvas) */}
        <main className="flex-1 flex flex-col relative bg-background">
          <div className="h-8 border-b border-border bg-card flex items-center px-4 text-[10px] tracking-widest text-muted-foreground uppercase justify-between">
            <span>&gt; pane_1_canvas</span>
            <span>[{padding}px] [{bgColor.toUpperCase()}]</span>
          </div>
          <div className="flex-1 relative flex items-center justify-center overflow-auto custom-scrollbar p-12">
            <CodeEditor 
              code={code}
              setCode={setCode}
              language={language}
              theme={theme}
              padding={padding}
              bgColor={bgColor}
            />
          </div>
        </main>

      </div>
    </div>
  );
}
