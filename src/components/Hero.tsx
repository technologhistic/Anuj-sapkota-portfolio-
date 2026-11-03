import React from 'react';
import { ArrowDownRight, ArrowUpRight, MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const reduceMotion = useReducedMotion();
  return (
    <section id="hero" className="relative overflow-hidden border-b border-[#d7d2c7] pt-32 sm:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 sm:px-8 sm:pb-20 lg:grid-cols-12 lg:gap-14 lg:px-12 lg:pb-24">
        <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }} className="lg:col-span-7">
          <p className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.16em] text-[#61615a]"><span className="h-px w-8 bg-[#3548c3]" />A student of software · Nepal</p>
          <h1 className="font-serif text-[4.25rem] leading-[.92] tracking-[-.07em] text-[#1d1d1a] sm:text-7xl md:text-8xl xl:text-[7rem]">Anuj<br /><span className="ml-[.55em] italic text-[#3548c3]">Sapkota</span><span className="text-[#1d1d1a]">.</span></h1>
          <p className="mt-8 max-w-lg text-base leading-8 text-[#393933] sm:text-lg">I’m learning how good software is made—by exploring, building, and improving with every project.</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
            <a href="#projects" className="inline-flex min-h-12 items-center gap-2 bg-[#3548c3] px-5 text-sm text-white transition-colors hover:bg-[#263899]">Explore my work <ArrowDownRight size={16} /></a>
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 text-sm text-[#1d1d1a] underline decoration-[#b4afa4] underline-offset-4 transition-colors hover:text-[#3548c3]">GitHub <ArrowUpRight size={15} /></a>
          </div>
          <div className="mt-12 grid max-w-xl grid-cols-2 border-t border-[#d7d2c7] pt-4 text-xs sm:grid-cols-[1fr_1.4fr]">
            <span className="font-mono uppercase tracking-[.12em] text-[#61615a]">Currently studying</span>
            <span className="text-[#1d1d1a]">+2 Computer Science · {PERSONAL_INFO.institution}</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: reduceMotion ? 0 : 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .5, delay: .1 }} className="relative mx-auto w-full max-w-[400px] lg:col-span-5 lg:ml-auto">
          <div className="relative aspect-[4/4.6] overflow-hidden bg-[#1d1d1a] p-6 text-[#f5f2ea] sm:p-8">
            <div className="absolute right-0 top-0 h-3/5 w-[38%] bg-[#3548c3]" />
            <div className="absolute right-[12%] top-[11%] h-[29%] w-[29%] border border-[#f5f2ea]/70" />
            <div className="absolute right-[19%] top-[18%] h-[29%] w-[29%] border border-[#f5f2ea]/35" />
            <div className="absolute left-6 top-6 font-mono text-[9px] uppercase tracking-[.18em] text-[#d3d0c8] sm:left-8 sm:top-8">{PERSONAL_INFO.brand}</div>
            <div className="absolute bottom-[23%] left-6 right-5 sm:left-8"><span className="font-mono text-[10px] uppercase tracking-[.18em] text-[#b6b2a9]">A practice in progress</span><p className="mt-3 max-w-[14rem] font-serif text-4xl leading-[.98] tracking-[-.04em] sm:text-5xl">Learn.<br /><span className="italic text-[#aab6ff]">Make.</span><br />Improve.</p></div>
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between border-t border-white/20 pt-3 font-mono text-[9px] uppercase tracking-[.12em] text-[#cfccc4] sm:bottom-8 sm:left-8 sm:right-8"><span className="inline-flex items-center gap-1.5"><MapPin size={11} />Nepal</span><span>01 / Ongoing</span></div>
          </div>
          <span className="absolute -bottom-5 -left-4 hidden bg-[#e6e8f5] px-4 py-2 font-mono text-[9px] uppercase tracking-[.15em] text-[#3548c3] sm:block">Curiosity into code ↗</span>
        </motion.div>
      </div>
      <div className="border-t border-[#d7d2c7]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-5 py-3 font-mono text-[9px] uppercase tracking-[.13em] text-[#61615a] sm:px-8 lg:px-12"><span>Web development</span><span>Application development</span><span>Always learning</span></div>
      </div>
    </section>
  );
};
