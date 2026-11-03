import React from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Code2, MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PERSONAL_INFO, REPOSITORY_LANGUAGES } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const reduceMotion = useReducedMotion();
  return (
    <section id="hero" className="relative isolate overflow-hidden border-b border-white/[0.07] pt-32 sm:pt-40 lg:pt-44">
      <div className="site-grid pointer-events-none absolute inset-0 -z-10 opacity-70" />
      <div className="pointer-events-none absolute -right-24 top-28 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#a4dc4e]/[0.08] blur-[100px]" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 sm:px-8 sm:pb-24 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:pb-32">
        <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="relative z-10 lg:col-span-7">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#c9ff5f]/20 bg-[#c9ff5f]/[0.06] px-3.5 py-2 font-mono text-[10px] uppercase tracking-[.16em] text-[#c9ff5f]"><span className="h-1.5 w-1.5 rounded-full bg-[#c9ff5f]" />{PERSONAL_INFO.title}</div>
          <p className="mb-1 text-xl font-medium text-[#bac2ba]">Hello, I’m</p>
          <h1 className="max-w-4xl font-serif text-[4rem] font-medium leading-[.92] tracking-[-.075em] text-[#f0f3ec] sm:text-7xl md:text-8xl xl:text-[7.5rem]">Anuj<br /><span className="text-[#c9ff5f]">Sapkota<span className="text-white">.</span></span></h1>
          <p className="mt-8 max-w-xl text-base leading-8 text-[#aab3ab] sm:text-lg">I’m learning to turn curiosity into useful software. Exploring the web, applications, and the ideas that bring them to life.</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#c9ff5f] px-6 font-medium text-[#11150d] transition-transform hover:translate-y-[-2px]">See what I’m building <ArrowDown size={16} className="transition-transform group-hover:translate-y-1" /></a>
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 px-5 text-sm text-[#e3e8e0] transition-colors hover:border-white/35">My GitHub <ArrowUpRight size={15} /></a>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#78827a]"><span className="inline-flex items-center gap-2"><MapPin size={13} className="text-[#c9ff5f]" />Nepal</span><span className="inline-flex items-center gap-2"><Code2 size={13} className="text-[#c9ff5f]" />Learning through projects</span></div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: reduceMotion ? 1 : .95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .9, delay: .12 }} className="relative mx-auto w-full max-w-[480px] lg:col-span-5 lg:ml-auto">
          <div className="absolute inset-[8%] rounded-full bg-[#c9ff5f]/10 blur-3xl" />
          <div className="relative aspect-square">
            <div className="onyx-orbit absolute inset-[3%] rounded-full border border-dashed border-white/10" />
            <div className="absolute inset-[12%] rounded-full border border-white/[0.08]" />
            <div className="absolute left-[8%] top-[19%] h-2 w-2 rounded-full bg-[#c9ff5f] shadow-[0_0_22px_6px_rgba(201,255,95,.35)]" />
            <div className="absolute bottom-[13%] right-[17%] h-2 w-2 rounded-full bg-[#9ce4c1] shadow-[0_0_20px_5px_rgba(156,228,193,.3)]" />
            <div className="absolute inset-[19%] grid place-items-center overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#1b241d] via-[#101713] to-[#0c100e] shadow-2xl shadow-black/40">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(201,255,95,.13),transparent_48%)]" />
              <div className="relative text-center">
                <div className="mx-auto grid h-24 w-24 place-items-center rounded-[2rem] border border-[#c9ff5f]/30 bg-[#c9ff5f]/[0.08] font-serif text-6xl text-[#c9ff5f] shadow-[0_0_80px_rgba(201,255,95,.12)] sm:h-28 sm:w-28">O</div>
                <p className="mt-7 font-mono text-[10px] uppercase tracking-[.26em] text-[#c9ff5f]">{PERSONAL_INFO.brand}</p>
                <p className="mt-2 font-serif text-2xl text-[#f0f3ec]">Learn. Then build.</p>
              </div>
              <span className="absolute bottom-5 left-6 font-mono text-[9px] tracking-[.18em] text-white/30">NEPAL · PERSONAL WORK</span>
              <ArrowRight size={15} className="absolute right-6 top-6 -rotate-45 text-[#c9ff5f]/70" />
            </div>
            <div className="absolute -bottom-2 left-0 rounded-2xl border border-white/10 bg-[#111714]/90 p-4 shadow-xl backdrop-blur-md sm:-left-7">
              <span className="font-mono text-[9px] uppercase tracking-[.16em] text-[#7e8981]">Found in my repos</span>
              <div className="mt-2 flex gap-1.5">{REPOSITORY_LANGUAGES.slice(0, 4).map((lang) => <span key={lang} className="rounded-md bg-white/[0.06] px-2 py-1 font-mono text-[9px] text-[#d8ded7]">{lang}</span>)}</div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="border-t border-white/[0.07]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 font-mono text-[10px] uppercase tracking-[.15em] text-[#778179] sm:px-8 lg:px-12"><span>{PERSONAL_INFO.institution}</span><span>Curious by nature · Building with intent</span><span>Scroll to explore ↓</span></div>
      </div>
    </section>
  );
};
