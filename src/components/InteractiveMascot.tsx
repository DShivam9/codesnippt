"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type Emotion = 'idle' | 'happy' | 'confused' | 'angry' | 'dizzy' | 'sleepy';

export default function InteractiveMascot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<SVGRectElement>(null);
  const rightEyeRef = useRef<SVGRectElement>(null);
  const antennaDotRef = useRef<SVGCircleElement>(null);
  const headRef = useRef<SVGRectElement>(null);
  
  const [isHovered, setIsHovered] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>('idle');
  const mouseIdleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isThrottledRef = useRef(false);

  // For aggressive mouse tracking
  const mouseHistoryRef = useRef<{x: number, y: number, time: number}[]>([]);

  // Initialize safe SVG transform origins via GSAP
  useEffect(() => {
    gsap.set([leftEyeRef.current, rightEyeRef.current], { transformOrigin: "50% 50%" });
  }, []);

  useEffect(() => {
    // Eye tracking logic
    const handleMouseMove = (e: MouseEvent) => {
      if (isThrottledRef.current) return;
      isThrottledRef.current = true;
      requestAnimationFrame(() => {
        isThrottledRef.current = false;
        
        // Wake up if asleep
        if (currentEmotion === 'sleepy') {
          setCurrentEmotion('idle');
          resetMascot();
        }

        // Reset sleep timer
        if (mouseIdleTimerRef.current) clearTimeout(mouseIdleTimerRef.current);
        mouseIdleTimerRef.current = setTimeout(() => {
          if (!isHovered && currentEmotion === 'idle') {
            playEmotion('sleepy');
          }
        }, 10000); 

      // Aggressive mouse tracking (Shaking)
      const now = Date.now();
      mouseHistoryRef.current.push({ x: e.clientX, y: e.clientY, time: now });
      // Keep only last 500ms
      mouseHistoryRef.current = mouseHistoryRef.current.filter(p => now - p.time < 500);
      
      let totalDistance = 0;
      for (let i = 1; i < mouseHistoryRef.current.length; i++) {
        const dx = mouseHistoryRef.current[i].x - mouseHistoryRef.current[i-1].x;
        const dy = mouseHistoryRef.current[i].y - mouseHistoryRef.current[i-1].y;
        totalDistance += Math.sqrt(dx * dx + dy * dy);
      }

      // If user shook mouse aggressively (e.g. > 2000px in 500ms)
      if (totalDistance > 2500 && currentEmotion === 'idle') {
        playEmotion('dizzy');
        mouseHistoryRef.current = []; // reset
        return;
      }

      if (isHovered || currentEmotion !== 'idle') return; 
      
      if (!containerRef.current || !leftEyeRef.current || !rightEyeRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const mascotCenterX = rect.left + rect.width / 2;
      const mascotCenterY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - mascotCenterX;
      const deltaY = e.clientY - mascotCenterY;
      
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 10, 3.5); 
      
      const moveX = Math.cos(angle) * distance;
      const moveY = Math.sin(angle) * distance;
      
      gsap.to([leftEyeRef.current, rightEyeRef.current], {
        x: moveX,
        y: moveY,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto"
      });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (mouseIdleTimerRef.current) clearTimeout(mouseIdleTimerRef.current);
    };
  }, [isHovered, currentEmotion]);

  // Global Event Listener for actions elsewhere in the app
  useEffect(() => {
    const handleMascotEvent = (e: any) => {
      if (e.detail && typeof e.detail === 'string') {
        playEmotion(e.detail as Emotion);
      }
    };
    window.addEventListener('mascot-action', handleMascotEvent);
    return () => window.removeEventListener('mascot-action', handleMascotEvent);
  }, [currentEmotion]);

  // Blinking logic
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (isHovered || currentEmotion !== 'idle') return;
      
      gsap.to([leftEyeRef.current, rightEyeRef.current], {
        scaleY: 0.1,
        transformOrigin: "center center",
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });
    }, 4500); 
    
    return () => clearInterval(blinkInterval);
  }, [isHovered, currentEmotion]);

  const playEmotion = (emotion: Emotion) => {
    if (currentEmotion !== 'idle' && currentEmotion !== 'sleepy') return; 
    setCurrentEmotion(emotion);

    const tl = gsap.timeline({
      onComplete: () => {
        if (emotion !== 'sleepy') {
          setCurrentEmotion('idle');
          resetMascot();
          // If still hovered after animation, re-trigger hover state
          if (isHovered && containerRef.current) {
             gsap.to([leftEyeRef.current, rightEyeRef.current], {
                scaleY: 1.4, scaleX: 1.1, x: 0, y: -2, fill: "#FAFAFA", duration: 0.2
             });
          }
        }
      }
    });

    switch(emotion) {
      case 'happy':
        // Jump, squint eyes, antenna flashes
        tl.to(antennaDotRef.current, { fill: "#00FF00", duration: 0.1 })
          .to([leftEyeRef.current, rightEyeRef.current], { scaleY: 0.2, y: -2, duration: 0.2 }, 0)
          .to(containerRef.current, { y: -30, duration: 0.3, ease: "power2.out", yoyo: true, repeat: 3 }, 0)
          .to(containerRef.current, { rotation: 10, duration: 0.15, yoyo: true, repeat: 5 }, 0)
          .to({}, { duration: 0.2 }); // small pause
        break;

      case 'confused':
        // Tilt head, one big eye, one small eye
        tl.to(containerRef.current, { rotation: 25, duration: 0.4, ease: "back.out(2)" })
          .to(leftEyeRef.current, { scaleY: 1.5, scaleX: 1.5, duration: 0.3 }, 0)
          .to(rightEyeRef.current, { scaleY: 0.4, scaleX: 0.4, duration: 0.3 }, 0)
          .to({}, { duration: 1.5 }); // Wait
        break;

      case 'angry':
        // Shake, turn red, eyes slope inwards (by rotating them) - This is the "Poke" reaction
        tl.to(antennaDotRef.current, { fill: "#FF0000", scale: 1.5, duration: 0.2 })
          .to(headRef.current, { fill: "#FFEAEA", duration: 0.2 }, 0)
          .to(leftEyeRef.current, { rotation: 30, scaleY: 0.5, transformOrigin: "right center", duration: 0.2 }, 0)
          .to(rightEyeRef.current, { rotation: -30, scaleY: 0.5, transformOrigin: "left center", duration: 0.2 }, 0)
          .to(containerRef.current, { x: -6, duration: 0.05, yoyo: true, repeat: 20 }, 0)
          .to({}, { duration: 1 });
        break;

      case 'dizzy':
        // Eyes spin in circles
        tl.to(containerRef.current, { rotation: 360, duration: 0.8, ease: "power1.inOut" })
          .to([leftEyeRef.current, rightEyeRef.current], { 
            rotation: 720, 
            transformOrigin: "center center", 
            duration: 1.5,
            ease: "power2.out"
          }, 0)
          .to(leftEyeRef.current, { x: -4, y: 4, duration: 0.5 }, 0)
          .to(rightEyeRef.current, { x: 4, y: -4, duration: 0.5 }, 0)
          .to({}, { duration: 0.5 });
        break;

      case 'sleepy':
        // Close eyes, slow antenna pulse, drift downwards
        gsap.to([leftEyeRef.current, rightEyeRef.current], { scaleY: 0.05, duration: 0.5 });
        gsap.to(antennaDotRef.current, { fill: "#555", duration: 0.5 });
        gsap.to(containerRef.current, { y: 10, duration: 1.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
        break;
    }
  };

  const resetMascot = () => {
    gsap.killTweensOf([containerRef.current, leftEyeRef.current, rightEyeRef.current, headRef.current, antennaDotRef.current]);
    gsap.to(containerRef.current, { y: 0, x: 0, rotation: 0, scaleX: 1, scaleY: 1, duration: 0.4, ease: "bounce.out" });
    gsap.to([leftEyeRef.current, rightEyeRef.current], { scaleY: 1, scaleX: 1, rotation: 0, x: 0, y: 0, fill: "#FF3300", duration: 0.3 });
    gsap.to(headRef.current, { fill: "#FAFAFA", duration: 0.3 });
    gsap.to(antennaDotRef.current, { fill: "#FF3300", scale: 1, duration: 0.3 });
  };

  const handleClick = () => {
    if (currentEmotion !== 'idle' && currentEmotion !== 'sleepy') return;
    // Clicking him annoys him (poke reaction)
    playEmotion('angry');
  };

  const handleMouseEnter = () => {
    if (currentEmotion !== 'idle' && currentEmotion !== 'sleepy') return;
    if (currentEmotion === 'sleepy') {
      setCurrentEmotion('idle');
      resetMascot();
    }
    setIsHovered(true);
    
    gsap.to([leftEyeRef.current, rightEyeRef.current], {
      scaleY: 1.3,
      scaleX: 1.1,
      x: 0,
      y: -2,
      duration: 0.2
    });
    // Add a little bouncing effect while hovered
    gsap.to(containerRef.current, {
      y: -5,
      scaleY: 0.95,
      scaleX: 1.02,
      transformOrigin: "bottom center",
      duration: 0.4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (currentEmotion !== 'idle') return;

    gsap.killTweensOf(containerRef.current);
    gsap.to([leftEyeRef.current, rightEyeRef.current], {
      scaleY: 1,
      scaleX: 1,
      fill: "#FF3300",
      duration: 0.3
    });
    gsap.to(containerRef.current, {
      y: 0,
      scaleY: 1,
      scaleX: 1,
      duration: 0.4,
      ease: "elastic.out(1, 0.5)"
    });
  };

  return (
    <div 
      ref={containerRef}
      className="fixed bottom-6 right-6 z-[100] cursor-pointer drop-shadow-[4px_4px_0px_#050505] hover:drop-shadow-[6px_6px_0px_#050505] transition-shadow duration-300"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title="SnipBot"
    >
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="screen-clip">
            <rect x="14" y="22" width="32" height="24" rx="1" />
          </clipPath>
        </defs>

        {/* Antenna */}
        <path d="M30 14V4" stroke="#050505" strokeWidth="4" strokeLinecap="square"/>
        <circle ref={antennaDotRef} cx="30" cy="4" r="4" fill="#FF3300" stroke="#050505" strokeWidth="3"/>
        
        {/* Head Base */}
        <rect ref={headRef} x="8" y="16" width="44" height="36" rx="2" fill="#FAFAFA" stroke="#050505" strokeWidth="4"/>
        
        {/* Screen/Face */}
        <rect x="14" y="22" width="32" height="24" rx="1" fill="#050505"/>
        
        {/* Clipped Eyes Group */}
        <g clipPath="url(#screen-clip)">
          {/* Left Eye */}
          <rect ref={leftEyeRef} x="20" y="28" width="8" height="12" rx="1" fill="#FF3300" />
          
          {/* Right Eye */}
          <rect ref={rightEyeRef} x="32" y="28" width="8" height="12" rx="1" fill="#FF3300" />
        </g>
      </svg>
    </div>
  );
}
