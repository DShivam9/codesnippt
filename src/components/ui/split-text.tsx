"use client";

import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function SplitText({ text, className = "", delay = 0 }: SplitTextProps) {
  const words = text.split(" ");
  
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-flex">
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: delay + i * 0.1,
              duration: 0.6,
              ease: [0.33, 1, 0.68, 1], // easeOutCubic
            }}
            className="inline-block whitespace-pre mr-[0.25em]"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
