"use client";

import React, { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
  theme: string;
  showWindowControls: boolean;
}

export default function CodeEditor({ code, setCode, language, theme, showWindowControls }: CodeEditorProps) {
  const [html, setHtml] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const highlight = async () => {
      try {
        const highlighted = await codeToHtml(code, {
          lang: language || "javascript",
          theme: theme || "github-dark",
        });
        if (isMounted) {
          setHtml(highlighted);
          setError(false);
        }
      } catch (err) {
        console.error("Failed to highlight code:", err);
        if (isMounted) setError(true);
      }
    };
    
    // Quick debounce for better typing performance
    const timeout = setTimeout(() => {
      highlight();
    }, 50);
    
    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [code, language, theme]);

  return (
    <div className="relative font-mono w-full min-h-[200px] rounded-lg shadow-2xl border-4 border-[#050505] bg-[#050505] overflow-hidden">
      {/* Background highlighted code (dictates height) */}
      <div 
        className="shiki-container w-full"
        dangerouslySetInnerHTML={{ __html: html || `<pre><code>${code + '\n'}</code></pre>` }}
      />
      
      {/* Window Controls */}
      {showWindowControls && (
        <div className="absolute top-5 left-5 flex gap-2 z-20 pointer-events-none">
          <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border-2 border-[#050505]" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border-2 border-[#050505]" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border-2 border-[#050505]" />
        </div>
      )}

      {/* Invisible textarea for actual editing */}
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className={`absolute inset-0 w-full h-full bg-transparent text-transparent caret-white resize-none outline-none border-none m-0 px-6 pb-6 z-10 ${showWindowControls ? 'pt-14' : 'pt-6'}`}
        style={{
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          fontSize: '15px',
          lineHeight: '1.5',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
        spellCheck="false"
      />

      <style jsx global>{`
        .shiki-container pre {
          margin: 0 !important;
          padding: 1.5rem !important; 
          padding-top: ${showWindowControls ? '3.5rem' : '1.5rem'} !important;
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
