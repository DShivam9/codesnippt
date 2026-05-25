"use client";

import React, { useCallback, useState } from "react";
import * as htmlToImage from "html-to-image";
import { Download, Image as ImageIcon, Copy, Share2, Check, Info } from "lucide-react";

interface ExportPanelProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
  isAnimatedBg?: boolean;
}

type ButtonState = "idle" | "loading" | "success" | "error";

export default function ExportPanel({ targetRef, isAnimatedBg = false }: ExportPanelProps) {
  const [copyState, setCopyState] = useState<ButtonState>("idle");
  const [shareState, setShareState] = useState<ButtonState>("idle");

  // ── Helper: generate PNG blob ─────────────────────────────────
  const generateBlob = useCallback(async (): Promise<Blob | null> => {
    if (targetRef.current === null) return null;
    const dataUrl = await htmlToImage.toPng(targetRef.current, {
      quality: 1.0,
      pixelRatio: 2,
    });
    const res = await fetch(dataUrl);
    return await res.blob();
  }, [targetRef]);

  // ── Export as PNG (download) ──────────────────────────────────
  const exportAsPNG = useCallback(async () => {
    if (targetRef.current === null) return;
    try {
      const dataUrl = await htmlToImage.toPng(targetRef.current, {
        quality: 1.0,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = "snipcast-snippet.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to export PNG:", err);
    }
  }, [targetRef]);

  // ── Export as SVG (download) ──────────────────────────────────
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

  // ── Copy to Clipboard ────────────────────────────────────────
  const copyToClipboard = useCallback(async () => {
    setCopyState("loading");
    try {
      const blob = await generateBlob();
      if (!blob) throw new Error("Failed to generate image");

      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);

      setCopyState("success");
      setTimeout(() => setCopyState("idle"), 2000);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
      setCopyState("error");
      setTimeout(() => setCopyState("idle"), 2000);
    }
  }, [generateBlob]);

  // ── Native Share (Web Share API) ──────────────────────────────
  const nativeShare = useCallback(async () => {
    setShareState("loading");
    try {
      const blob = await generateBlob();
      if (!blob) throw new Error("Failed to generate image");

      const file = new File([blob], "snipcast-snippet.png", {
        type: "image/png",
      });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "Code Snippet by SNIPCAST",
          text: "Check out this code snippet I created with SNIPCAST — the free code-to-image tool!",
          files: [file],
        });
        setShareState("success");
      } else {
        // Fallback: copy to clipboard if Web Share not supported
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        setShareState("success");
      }
      setTimeout(() => setShareState("idle"), 2000);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        setShareState("idle");
        return;
      }
      console.error("Failed to share:", err);
      setShareState("error");
      setTimeout(() => setShareState("idle"), 2000);
    }
  }, [generateBlob]);



  // ── Shared button style ───────────────────────────────────────
  const btnBase =
    "flex items-center justify-center gap-2 border-4 border-[#050505] py-2.5 px-4 font-black uppercase tracking-tight text-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#050505] cursor-pointer whitespace-nowrap";

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Animated background notice */}
      {isAnimatedBg && (
        <div className="relative group flex items-center gap-1.5 bg-[#FF9F0A] text-[#050505] border-4 border-[#050505] px-3 py-1.5 font-black uppercase text-[10px] tracking-wide shadow-[3px_3px_0px_#050505] mr-1 cursor-help">
          <Info size={13} strokeWidth={3} />
          <span className="hidden md:inline">Animated BG → Export as SVG</span>
          <span className="md:hidden">SVG for animation</span>
          {/* Tooltip */}
          <div className="absolute top-full left-0 mt-3 w-64 bg-[#050505] text-[#FAFAFA] border-4 border-[#FF9F0A] p-4 font-bold normal-case tracking-normal text-xs leading-relaxed shadow-[6px_6px_0px_#FF9F0A] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 z-50">
            <p className="mb-2">You&apos;re using an <span className="text-[#FF9F0A]">animated background</span>.</p>
            <p className="mb-2">Export as <span className="text-[#FF9F0A] uppercase font-black">SVG</span> to keep the animation.</p>
            <p className="text-[#FAFAFA]/60">PNG, Copy & Share will capture a static frame of the current design.</p>
          </div>
        </div>
      )}

      {/* Divider label */}
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#050505]/50 mr-1 hidden lg:block">Export</span>

      <button onClick={exportAsPNG} className={`${btnBase} bg-[#FAFAFA] text-[#050505] hover:bg-[#FF3300] hover:text-[#FAFAFA]`}>
        <ImageIcon size={15} />
        <span className="hidden xl:inline">PNG</span>
      </button>

      <button onClick={exportAsSVG} className={`${btnBase} bg-[#050505] text-[#FAFAFA] hover:bg-[#FF3300]`}>
        <Download size={15} />
        <span className="hidden xl:inline">SVG</span>
      </button>

      {/* Separator */}
      <div className="w-[3px] h-8 bg-[#050505]/20 mx-1 hidden md:block" />
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#050505]/50 mr-1 hidden lg:block">Share</span>

      <button
        onClick={copyToClipboard}
        disabled={copyState === "loading"}
        className={`${btnBase} ${
          copyState === "success"
            ? "bg-[#27C93F] text-[#050505]"
            : copyState === "error"
            ? "bg-[#FF5F56] text-[#FAFAFA]"
            : "bg-[#FAFAFA] text-[#050505] hover:bg-[#FF3300] hover:text-[#FAFAFA]"
        }`}
      >
        {copyState === "success" ? <Check size={15} /> : <Copy size={15} />}
        <span className="hidden xl:inline">{copyState === "success" ? "COPIED" : "COPY"}</span>
      </button>

      <button
        onClick={nativeShare}
        disabled={shareState === "loading"}
        className={`${btnBase} ${
          shareState === "success"
            ? "bg-[#27C93F] text-[#050505]"
            : "bg-[#FAFAFA] text-[#050505] hover:bg-[#FF3300] hover:text-[#FAFAFA]"
        }`}
      >
        {shareState === "success" ? <Check size={15} /> : <Share2 size={15} />}
        <span className="hidden xl:inline">{shareState === "success" ? "DONE" : "SHARE"}</span>
      </button>


    </div>
  );
}
