"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import gsap from "gsap";
import { Code2, FileText, ArrowLeft, Palette, Paintbrush, Image, Layers, Monitor, Shield, Lock, Scale, Home, Undo, Globe, Terminal, Cpu, Braces, Laptop } from "lucide-react";
import { createRoot } from "react-dom/client";

interface TransitionLinkProps extends React.PropsWithChildren<LinkProps> {
  className?: string;
  href: string;
  variant?: "studio" | "legal" | "back" | "themes";
}

export const triggerTransition = (router: any, href: string, variant: "studio" | "legal" | "back" | "themes" = "studio") => {
  const overlay = document.createElement("div");
  document.body.appendChild(overlay);

  const logoContainer = document.createElement("div");
  logoContainer.className = "absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden";
  gsap.set(logoContainer, { opacity: 0, scale: 0.5 });
  const root = createRoot(logoContainer);

  let elements: HTMLElement[] = [];

  const cleanup = () => {
    root.unmount();
    overlay.remove();
  };

  const tl = gsap.timeline({
    onComplete: () => {
      router.push(href);
      
      setTimeout(() => {
        if (variant === "themes") {
          gsap.to(elements, { scaleX: 0, duration: 0.6, stagger: 0.05, ease: "power4.inOut", onComplete: cleanup });
        } else if (variant === "back") {
          gsap.to(elements, { scaleY: 0, duration: 0.5, ease: "power4.inOut", onComplete: cleanup });
        } else if (variant === "legal") {
          gsap.to(elements, { scale: 0, duration: 0.5, stagger: 0.05, ease: "power4.inOut", onComplete: cleanup });
        } else {
          gsap.to(elements, { scaleX: 0, duration: 0.6, ease: "power4.inOut", onComplete: cleanup });
        }
        
        gsap.to(logoContainer, { opacity: 0, scale: 1.2, duration: 0.4, ease: "power3.in" });
      }, 150);
    }
  });

  if (variant === "themes") {
    overlay.className = "fixed inset-0 z-[9999] flex flex-col";
    const themeColors = ["#FF9F0A", "#3B82F6", "#27C93F", "#8B5CF6", "#EC4899"];
    
    for (let i = 0; i < 5; i++) {
      const row = document.createElement("div");
      row.className = "w-full flex-1";
      row.style.backgroundColor = themeColors[i];
      gsap.set(row, { scaleX: 0, transformOrigin: i % 2 === 0 ? "left" : "right" });
      elements.push(row);
      overlay.appendChild(row);
    }
    
    root.render(
      <div className="bg-[#FAFAFA] p-5 border-4 border-[#000] shadow-[12px_12px_0px_#000] z-20 relative">
        <Palette className="w-16 h-16 text-[#000]" strokeWidth={3} />
      </div>
    );

    tl.to(elements, { scaleX: 1, duration: 0.6, stagger: 0.05, ease: "power4.inOut" });

  } else if (variant === "back") {
    overlay.className = "fixed inset-0 z-[9999] flex flex-col";
    
    const topJaw = document.createElement("div");
    topJaw.className = "w-full h-1/2 bg-[#050505]";
    gsap.set(topJaw, { scaleY: 0, transformOrigin: "top" });
    
    const bottomJaw = document.createElement("div");
    bottomJaw.className = "w-full h-1/2 bg-[#050505]";
    gsap.set(bottomJaw, { scaleY: 0, transformOrigin: "bottom" });
    
    elements.push(topJaw, bottomJaw);
    overlay.appendChild(topJaw);
    overlay.appendChild(bottomJaw);
    
    root.render(
      <div className="bg-[#FAFAFA] p-5 border-4 border-[#000] shadow-[12px_12px_0px_#FF9F0A] z-20 relative">
        <ArrowLeft className="w-16 h-16 text-[#000]" strokeWidth={4} />
      </div>
    );
    
    tl.to(elements, { scaleY: 1, duration: 0.4, ease: "power4.in" });

  } else if (variant === "legal") {
    overlay.className = "fixed inset-0 z-[9999] flex flex-wrap";
    const origins = ["top left", "top right", "bottom left", "bottom right"];
    
    for (let i = 0; i < 4; i++) {
      const quad = document.createElement("div");
      quad.className = "w-1/2 h-1/2 bg-[#FF9F0A]";
      gsap.set(quad, { scale: 0, transformOrigin: origins[i] });
      elements.push(quad);
      overlay.appendChild(quad);
    }
    
    root.render(
      <div className="bg-[#000] p-5 border-4 border-[#000] shadow-[12px_12px_0px_#FAFAFA] z-20 relative">
        <FileText className="w-16 h-16 text-[#FAFAFA]" strokeWidth={3} />
      </div>
    );

    tl.to(elements, { scale: 1, duration: 0.5, stagger: 0.05, ease: "power4.inOut" });

  } else {
    overlay.className = "fixed inset-0 z-[9999] flex w-full h-full";
    const leftDoor = document.createElement("div");
    leftDoor.className = "h-full flex-1 bg-[#050505]";
    gsap.set(leftDoor, { scaleX: 0, transformOrigin: "left" });
    
    const rightDoor = document.createElement("div");
    rightDoor.className = "h-full flex-1 bg-[#050505]";
    gsap.set(rightDoor, { scaleX: 0, transformOrigin: "right" });
    
    elements.push(leftDoor, rightDoor);
    overlay.appendChild(leftDoor);
    overlay.appendChild(rightDoor);
    
    root.render(
      <div className="bg-[#FF9F0A] p-5 border-4 border-[#000] shadow-[12px_12px_0px_#000] z-20 relative">
        <Code2 className="w-16 h-16 text-[#000]" strokeWidth={3} />
      </div>
    );

    tl.to(elements, { scaleX: 1, duration: 0.5, ease: "power4.inOut" });
  }

  overlay.appendChild(logoContainer);

  tl.to(logoContainer, { 
    opacity: 1, 
    scale: 1, 
    duration: 0.4, 
    ease: "back.out(1.5)" 
  }, "-=0.2");

  tl.to(logoContainer, { rotation: 0, duration: 0.2 }); 
};

export default function TransitionLink({ href, children, className, variant = "studio", ...props }: TransitionLinkProps) {
  const router = useRouter();

  const handleTransition = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    triggerTransition(router, href, variant);
  };

  return (
    <Link href={href} onClick={handleTransition} className={className} {...props}>
      {children}
    </Link>
  );
}
