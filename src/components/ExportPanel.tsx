"use client";

import React, { useCallback } from "react";
import * as htmlToImage from "html-to-image";
import { Download, Image as ImageIcon } from "lucide-react";

interface ExportPanelProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
}

export default function ExportPanel({ targetRef }: ExportPanelProps) {
  const exportAsPNG = useCallback(async () => {
    if (targetRef.current === null) return;
    try {
      const dataUrl = await htmlToImage.toPng(targetRef.current, {
        quality: 1.0,
        pixelRatio: 2, // High resolution
      });
      const link = document.createElement("a");
      link.download = "snipcast-snippet.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to export PNG:", err);
    }
  }, [targetRef]);

  const exportAsSVG = useCallback(async () => {
    if (targetRef.current === null) return;
    try {
      const dataUrl = await htmlToImage.toSvg(targetRef.current);
      const link = document.createElement("a");
      link.download = "snipcast-snippet.svg";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to export SVG:", err);
    }
  }, [targetRef]);

  return (
    <div className="flex flex-col gap-3 mt-8">
      <h3 className="text-sm font-bold uppercase tracking-widest text-[#050505] border-b-4 border-[#050505] pb-2 mb-2">Export Options</h3>
      <button 
        onClick={exportAsPNG}
        className="w-full flex items-center justify-center gap-2 bg-[#FAFAFA] text-[#050505] border-4 border-[#050505] py-3 font-black uppercase tracking-tight hover:bg-[#FF3300] hover:text-[#FAFAFA] hover:-translate-y-1 hover:shadow-[4px_4px_0px_#050505] transition-all duration-200"
      >
        <ImageIcon size={20} />
        Export PNG
      </button>
      <button 
        onClick={exportAsSVG}
        className="w-full flex items-center justify-center gap-2 bg-[#050505] text-[#FAFAFA] border-4 border-[#050505] py-3 font-black uppercase tracking-tight hover:bg-[#FF3300] hover:text-[#FAFAFA] hover:-translate-y-1 hover:shadow-[4px_4px_0px_#050505] transition-all duration-200"
      >
        <Download size={20} />
        Export SVG
      </button>
    </div>
  );
}
