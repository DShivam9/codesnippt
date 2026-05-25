"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import gsap from "gsap";
import { Code2, FileText, ArrowLeft } from "lucide-react";
import { createRoot } from "react-dom/client";

interface TransitionLinkProps extends React.PropsWithChildren<LinkProps> {
  className?: string;
  href: string;
  variant?: "studio" | "legal" | "back";
}

export default function TransitionLink({ href, children, className, variant = "studio", ...props }: TransitionLinkProps) {
  const router = useRouter();

  const handleTransition = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    
    // Main container
    const overlay = document.createElement("div");
    overlay.className = "fixed inset-0 z-[9999] flex w-full h-full";
    
    // Create 5 vertical columns for an elegant geometric wipe
    const columns: HTMLDivElement[] = [];
    const columnColor = variant === "legal" ? "#FF9F0A" : "#050505";
    const isBack = variant === "back";
    
    for (let i = 0; i < 5; i++) {
      const col = document.createElement("div");
      col.className = `h-full flex-1`;
      col.style.backgroundColor = columnColor;
      // Start them scaled to 0
      gsap.set(col, { scaleY: 0, transformOrigin: isBack ? "top" : "bottom" });
      columns.push(col);
      overlay.appendChild(col);
    }
    
    // Create a beautiful, bold center logo container
    const logoContainer = document.createElement("div");
    logoContainer.className = "absolute inset-0 flex items-center justify-center pointer-events-none";
    gsap.set(logoContainer, { opacity: 0, scale: 0.5 });

    const root = createRoot(logoContainer);
    
    if (variant === "legal") {
      root.render(
        <div className="bg-[#000] p-5 border-4 border-[#000] shadow-[12px_12px_0px_#FAFAFA]">
          <FileText className="w-16 h-16 text-[#FAFAFA]" strokeWidth={3} />
        </div>
      );
    } else if (variant === "back") {
      root.render(
        <div className="bg-[#FAFAFA] p-5 border-4 border-[#000] shadow-[12px_12px_0px_#FF9F0A]">
          <ArrowLeft className="w-16 h-16 text-[#000]" strokeWidth={4} />
        </div>
      );
    } else {
      root.render(
        <div className="bg-[#FF9F0A] p-5 border-4 border-[#000] shadow-[12px_12px_0px_#000]">
          <Code2 className="w-16 h-16 text-[#000]" strokeWidth={3} />
        </div>
      );
    }
    overlay.appendChild(logoContainer);

    document.body.appendChild(overlay);

    const tl = gsap.timeline({
      onComplete: () => {
        router.push(href);
        
        // Wait briefly for Next.js to swap the DOM to the studio page
        setTimeout(() => {
          // Slide the logo out elegantly
          gsap.to(logoContainer, { 
            opacity: 0, 
            scale: 1.2, 
            duration: 0.4, 
            ease: "power3.in" 
          });
          
          // Wipe the columns away to the top (or bottom if back variant), revealing the page
          gsap.to(columns, { 
            scaleY: 0, 
            transformOrigin: isBack ? "bottom" : "top", 
            duration: 0.6, 
            stagger: 0.05, 
            ease: "power4.inOut",
            onComplete: () => {
              root.unmount();
              overlay.remove();
            }
          });
        }, 150);
      }
    });

    // 1. Columns sweep up from the bottom in a fluid stagger
    tl.to(columns, { 
      scaleY: 1, 
      duration: 0.6, 
      stagger: 0.05, 
      ease: "power4.inOut" 
    });
    
    // 2. The brutalist logo cleanly pops into the center
    tl.to(logoContainer, { 
      opacity: 1, 
      scale: 1, 
      duration: 0.5, 
      ease: "back.out(1.5)" 
    }, "-=0.2");

    // 3. Brief hold so it registers with the user
    tl.to(logoContainer, { rotation: 0, duration: 0.2 }); 
  };

  return (
    <Link href={href} onClick={handleTransition} className={className} {...props}>
      {children}
    </Link>
  );
}
