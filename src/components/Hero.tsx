import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const reduceMotion = useReducedMotion();
  return (
    <section id="hero" className="relative overflow-hidden pt-36 pb-24 md:pt-48 md:pb-32 border-b border-black/[0.06]">
      <div aria-hidden="true" className="absolute -top-44 -right-32 w-[34rem] h-[34rem] rounded-full bg-[#E9DFD0]/50 blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-16 pb-5 border-b border-black/[0.08] text-xs font-mono uppercase tracking-[0.18em] text-[#716B61]">
            <span>{PERSONAL_INFO.brand}</span><span>{PERSONAL_INFO.location}</span>
          </div>
          <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.22em] text-[#8B5E34] mb-6">{PERSONAL_INFO.title}</p>
          <h1 className="max-w-5xl text-6xl sm:text-8xl md:text-[9rem] leading-[0.88] tracking-[-0.055em] font-serif text-[#24231F]">Anuj <span className="italic font-light text-[#8B5E34]">Sapkota</span></h1>
          <div className="mt-10 grid md:grid-cols-12 gap-8 md:items-end">
            <p className="md:col-span-7 max-w-2xl text-lg sm:text-xl leading-relaxed text-[#5C5952]">Learning, building, and exploring software development—one idea at a time.</p>
            <div className="md:col-span-5 flex flex-wrap md:justify-end gap-3">
              <a href="#projects" className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md bg-[#24231F] text-[#F6F3EC] text-xs uppercase tracking-wider font-mono hover:bg-[#8B5E34] transition-colors">Explore repositories <ArrowDown size={15} /></a>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md border border-black/15 text-[#24231F] text-xs uppercase tracking-wider font-mono hover:border-[#8B5E34] transition-colors">GitHub <ArrowUpRight size={15} /></a>
            </div>
          </div>
          <div className="mt-16 pt-5 border-t border-black/[0.08] flex flex-wrap gap-x-10 gap-y-3 text-xs font-mono text-[#716B61]">
            <span>+2 Computer Science</span><span>{PERSONAL_INFO.institution}</span><span>Focused on software development</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
