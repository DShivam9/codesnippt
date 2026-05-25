"use client";

import React, { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import hljs from "highlight.js";

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  filename: string;
  setFilename: (name: string) => void;
  theme: string;
  showWindowControls: boolean;
}

export default function CodeEditor({ code, setCode, filename, setFilename, theme, showWindowControls }: CodeEditorProps) {
  const [html, setHtml] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const highlight = async () => {
      try {
        let lang = "javascript"; // fallback
        if (code.trim() !== "") {
           try {
             lang = hljs.highlightAuto(code).language || "javascript";
           } catch(e) {}
        }
        
        // Map common hljs languages to shiki languages
        const langMap: Record<string, string> = {
          "js": "javascript",
          "ts": "typescript",
          "bash": "bash",
          "xml": "html",
          "json": "json",
          "css": "css",
          "python": "python",
          "rust": "rust",
          "go": "go",
          "c++": "cpp",
          "c#": "csharp",
          "markdown": "md"
        };
        const shikiLang = langMap[lang] || lang;

        try {
          const highlighted = await codeToHtml(code || "// Drop your code here...", {
            lang: shikiLang,
            theme: theme || "github-dark",
          });
          if (isMounted) {
            setHtml(highlighted);
            setError(false);
          }
        } catch (shikiErr) {
          // If Shiki doesn't support the auto-detected language, fallback to 'text'
          console.warn(`Shiki failed to load language '${shikiLang}', falling back to plain text.`);
          const fallbackHighlighted = await codeToHtml(code || "// Drop your code here...", {
            lang: "text",
            theme: theme || "github-dark",
          });
          if (isMounted) {
            setHtml(fallbackHighlighted);
            setError(false);
          }
        }
      } catch (err) {
        console.error("Failed to highlight code completely:", err);
        // Ultimate fallback if even 'text' fails
        if (isMounted) {
            // Escape HTML just in case
            const safeCode = (code || '// Drop your code here...')
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");
            setHtml(`<pre style="color: #FAFAFA;"><code>${safeCode}</code></pre>`);
            setError(true);
        }
      }
    };
    
    // Quick debounce for better typing performance
    const timeout = setTimeout(() => {
      highlight();
    }, 300);
    
    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [code, theme]);

  return (
    <div className="relative font-mono w-full min-h-[200px] rounded-lg shadow-2xl border-4 border-[#050505] bg-[#050505] overflow-hidden">
      {/* Background highlighted code (dictates height) */}
      <div 
        className="shiki-container w-full"
        dangerouslySetInnerHTML={{ __html: html || `<pre><code>${code || '// Drop your code here...'}\n</code></pre>` }}
      />
      
      {/* Window Controls & Filename Tab */}
      {showWindowControls && (
        <div className="absolute top-0 left-0 right-0 h-14 bg-[#050505]/40 backdrop-blur-sm border-b-4 border-[#050505] flex items-center px-5 z-20">
          <div className="flex gap-2 w-20">
            <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border-2 border-[#050505]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border-2 border-[#050505]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border-2 border-[#050505]" />
          </div>
          <input
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            placeholder="Untitled"
            className="flex-1 bg-transparent text-center text-[#FAFAFA] font-bold tracking-wider text-sm focus:outline-none placeholder:text-[#FAFAFA]/40"
            spellCheck={false}
          />
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      )}

      {/* Invisible textarea for actual editing */}
      <textarea
        value={code}
        onChange={(e) => {
          // Limit to 100 lines to prevent massive image generation and performance issues
          const newCode = e.target.value;
          const lines = newCode.split('\n');
          if (lines.length > 100) {
            setCode(lines.slice(0, 100).join('\n'));
          } else {
            setCode(newCode);
          }
        }}
        placeholder="// Drop your code here..."
        className={`absolute inset-0 w-full h-full bg-transparent text-transparent caret-white resize-none outline-none border-none m-0 px-6 pb-6 z-10 placeholder:text-[#FAFAFA]/30 ${showWindowControls ? 'pt-[4.5rem]' : 'pt-6'}`}
        style={{
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          fontSize: '15px',
          lineHeight: '1.5',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
        spellCheck="false"
      />

      {/* Line Counter */}
      <div className="absolute bottom-3 right-4 z-20 pointer-events-none text-[10px] font-black uppercase tracking-widest text-[#FAFAFA]/30">
        {code ? code.split('\n').length : 0} / 100
      </div>

      <style jsx global>{`
        .shiki-container pre {
          margin: 0 !important;
          padding: 1.5rem !important; 
          padding-top: ${showWindowControls ? '4.5rem' : '1.5rem'} !important;
          width: 100%;
          min-height: 200px;
          border-radius: 4px;
          overflow: hidden !important; /* No scrollbars */
          background-color: transparent !important; 
          white-space: pre-wrap !important;
          word-break: break-word !important;
        }
        .shiki-container code {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
          font-size: 15px !important;
          line-height: 1.5 !important;
          white-space: pre-wrap !important;
          word-break: break-word !important;
        }
      `}</style>
    </div>
  );
}
