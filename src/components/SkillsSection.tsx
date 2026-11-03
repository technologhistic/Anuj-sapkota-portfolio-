import React from 'react';
import { ArrowUpRight, Braces, Code2, PanelsTopLeft, Smartphone } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { REPOSITORY_LANGUAGES } from '../data/portfolioData';

const interests = [
  { icon: PanelsTopLeft, title: 'Web development', text: 'Frontend, backend, and full-stack projects.' },
  { icon: Smartphone, title: 'Application development', text: 'Interfaces, architecture, and cross-platform exploration.' },
  { icon: Braces, title: 'Programming', text: 'Learning languages by using them in real repositories.' },
];

export const SkillsSection: React.FC = () => {
  const reduceMotion = useReducedMotion();
  return (
    <section id="skills" className="border-b border-white/[0.07] bg-[#0d110f] py-24 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 sm:mb-16">
          <div><span className="font-mono text-[10px] uppercase tracking-[.2em] text-[#c9ff5f]">02 / Current curiosity</span><h2 className="mt-4 max-w-2xl text-4xl font-medium leading-[1.08] sm:text-5xl lg:text-6xl">Wide open, <span className="text-[#7f8b81]">still learning.</span></h2></div>
          <p className="max-w-sm text-sm leading-7 text-[#89938b]">These are directions I’m exploring as I grow in software development—not proficiency claims.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {interests.map(({ icon: Icon, title, text }, index) => <motion.article key={title} initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .07 }} className="group rounded-2xl border border-white/[0.08] bg-[#111714] p-6 transition-colors hover:border-[#c9ff5f]/30 sm:p-7"><div className="mb-9 flex items-center justify-between"><span className="font-mono text-[10px] text-[#647068]">0{index + 1}</span><Icon size={20} className="text-[#c9ff5f] transition-transform group-hover:scale-110" /></div><h3 className="text-xl font-medium">{title}</h3><p className="mt-2 text-sm leading-6 text-[#89938b]">{text}</p></motion.article>)}
        </div>
        <div className="mt-12 rounded-2xl border border-white/[0.08] bg-[#111714] p-6 sm:mt-16 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><div className="flex items-start gap-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#c9ff5f]/10 text-[#c9ff5f]"><Code2 size={19} /></span><div><h3 className="text-lg font-medium">Languages found in my repositories</h3><p className="mt-1 text-xs leading-5 text-[#7f8b81]">GitHub language metadata · repository contents, not skill ratings</p></div></div><a href="https://github.com/technologhistic?tab=repositories" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs text-[#c9ff5f] hover:text-white">See source <ArrowUpRight size={14} /></a></div>
          <div className="mt-7 flex flex-wrap gap-2.5">{REPOSITORY_LANGUAGES.map((lang) => <span key={lang} className="rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 text-sm text-[#d9dfd8]">{lang}</span>)}</div>
        </div>
      </div>
    </section>
  );
};
