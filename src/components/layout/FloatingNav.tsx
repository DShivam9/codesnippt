'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function FloatingNav() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 w-[90%] max-w-5xl rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] shadow-indigo-500/10"
    >
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-lg shadow-cyan-500/30" />
        <span className="text-white font-bold tracking-tight text-sm">Snipcast</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
        <Link href="#features" className="hover:text-white transition-colors">Features</Link>
        <Link href="#examples" className="hover:text-white transition-colors">Examples</Link>
        <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
      </div>

      <Button render={<Link href="/editor" />} className="rounded-full px-6 font-semibold" variant="default">
        Open Studio
      </Button>
    </motion.nav>
  );
}
