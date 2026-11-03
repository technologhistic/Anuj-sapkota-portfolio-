import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';

export const ProjectsSection: React.FC = () => {
  const reduceMotion = useReducedMotion();
  return (
    <section id="projects" className="border-b border-[#d7d2c7] py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-7 border-b border-[#d7d2c7] pb-9 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8"><span className="font-mono text-[10px] uppercase tracking-[.16em] text-[#3548c3]">03 / Work in progress</span><h2 className="mt-4 font-serif text-4xl leading-[1.1] tracking-[-.04em] sm:text-5xl lg:text-6xl">Small ideas, <span className="italic text-[#3548c3]">made real.</span></h2></div>
          <p className="max-w-sm text-sm leading-7 text-[#55554e] lg:col-span-4 lg:justify-self-end">A selection from my public GitHub repositories. Each project is a place to learn by doing.</p>
        </div>
        <div className="mt-5">
          {PROJECTS.map((project, index) => <motion.article key={project.name} initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .3, delay: index * .025 }} className="group grid gap-3 border-b border-[#d7d2c7] py-6 transition-colors hover:bg-[#eae7df] sm:gap-5 sm:py-7 md:grid-cols-[56px_minmax(0,1.1fr)_minmax(0,1fr)_auto] md:items-center md:px-4">
            <span className="font-mono text-[10px] text-[#3548c3]">{String(index + 1).padStart(2, '0')}</span>
            <div><h3 className="font-serif text-2xl leading-tight transition-colors group-hover:text-[#3548c3] sm:text-3xl">{project.name}</h3><p className="mt-1.5 text-sm text-[#55554e]">{project.description}</p></div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-[#61615a]">{project.languages.map((language) => <span key={language}>{language}</span>)}<span className="text-[#a39e93]">·</span><span>{project.stars} stars</span><span>{project.forks} forks</span></div>
            <a href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} on GitHub`} className="inline-flex min-h-11 items-center gap-2 self-start text-xs text-[#3548c3] md:justify-self-end">View project <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
          </motion.article>)}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[.12em] text-[#61615a]"><span>Repository stats checked Nov 3, 2026</span><a href="https://github.com/technologhistic?tab=repositories" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-[#3548c3]">More on GitHub <ArrowUpRight size={13} /></a></div>
      </div>
    </section>
  );
};
