'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Particles } from '@/components/ui/particles';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { SplitText } from '@/components/ui/split-text';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-16 bg-transparent overflow-hidden">
      {/* Dynamic colorful particles */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={150}
        staticity={30}
        ease={40}
        color="#7877c6"
        refresh
      />
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto w-full mt-10">
        
        {/* Editorial Heading */}
        <h1 className="text-[clamp(3rem,6vw,6.5rem)] leading-[1.05] font-bold tracking-tight mb-8">
          <div className="bg-clip-text text-transparent bg-gradient-to-br from-white to-white/70">
            <SplitText text="Turn your raw code into" delay={0.1} />
          </div>
          <div className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-300 mt-2 pb-4">
            <SplitText text="visual masterpieces." delay={0.4} />
          </div>
        </h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 font-medium"
        >
          Stop sharing boring screenshots. Generate beautiful, high-resolution snippets for Twitter, LinkedIn, and your blog in seconds.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Link href="/editor">
            <ShimmerButton className="shadow-[0_0_40px_rgba(99,102,241,0.4)] h-12 px-8 transition-transform hover:scale-105 active:scale-95">
              <span className="whitespace-pre-wrap text-center text-sm font-semibold leading-none tracking-tight text-white lg:text-base">
                Start Generating Free
              </span>
            </ShimmerButton>
          </Link>
          <Link 
            href="#examples" 
            className="flex items-center justify-center h-12 px-8 text-sm font-semibold text-white/70 border border-white/10 rounded-full hover:bg-white/10 transition-colors hover:text-white"
          >
            View Gallery
          </Link>
        </motion.div>
      </div>

      {/* Editor Preview (Premium macOS window) */}
      <motion.div
        initial={{ opacity: 0, y: 100, rotateX: 15, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 1, type: "spring", bounce: 0.2 }}
        style={{ perspective: 1200 }}
        className="relative w-full max-w-4xl mt-24 rounded-2xl border border-white/10 bg-[#0a0a0a]/40 backdrop-blur-3xl shadow-[0_30px_100px_rgba(99,102,241,0.2)] overflow-hidden z-10 group"
      >
        {/* Environmental lighting bleed behind the window */}
        <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500/20 via-cyan-500/10 to-emerald-500/20 blur-2xl z-0" />
        
        {/* Fake macOS window header */}
        <div className="flex items-center gap-2 px-5 py-4 bg-white/[0.02] border-b border-white/5 relative z-10">
          <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
          <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
          <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
        </div>
        <div className="p-10 aspect-[16/9] flex items-center justify-center relative z-10 bg-gradient-to-br from-[#0c0c14] to-[#040408]">
          <div className="text-zinc-400 font-mono text-sm flex flex-col gap-3">
            <div><span className="text-indigo-400">const</span> <span className="text-cyan-300">generateSnippet</span> <span className="text-zinc-500">=</span> <span className="text-indigo-400">async</span> <span className="text-zinc-500">()</span> <span className="text-indigo-400">{`=>`}</span> <span className="text-zinc-500">{`{`}</span></div>
            <div className="pl-6 text-emerald-400">"Editorial, sleek, and colorful"</div>
            <div className="text-zinc-500">{`}`}</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
