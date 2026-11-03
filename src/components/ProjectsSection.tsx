import React from 'react';
import { ArrowUpRight, GitFork, Star } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';

const hues = [
  'from-[#345347] via-[#182821] to-[#0f1512]',
  'from-[#5a4524] via-[#292218] to-[#15130f]',
  'from-[#2f5160] via-[#192831] to-[#101619]',
  'from-[#51446b] via-[#272232] to-[#15131a]',
  'from-[#58632c] via-[#292d1a] to-[#14160f]',
];
const symbols = ['L', 'L', 'E', 'AI', 'G'];

export const ProjectsSection: React.FC = () => {
  const reduceMotion = useReducedMotion();
  return (
    <section id="projects" className="relative border-b border-white/[0.07] py-24 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mb-12 grid gap-6 sm:mb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8"><span className="font-mono text-[10px] uppercase tracking-[.2em] text-[#c9ff5f]">03 / Selected experiments</span><h2 className="mt-4 max-w-3xl text-4xl font-medium leading-[1.08] sm:text-5xl lg:text-6xl">Ideas made <span className="text-[#7f8b81]">tangible.</span></h2></div>
          <p className="max-w-sm text-sm leading-7 text-[#89938b] lg:col-span-4 lg:justify-self-end">A few things I’ve explored in code. Each link leads to its original repository.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-6">
          {PROJECTS.map((project, index) => (
            <motion.article key={project.name} initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .05 }} className={`group overflow-hidden rounded-3xl border border-white/[0.08] bg-[#101513] transition-all duration-300 hover:-translate-y-1 hover:border-[#c9ff5f]/25 ${index < 2 ? 'xl:col-span-3' : 'xl:col-span-2'}`}>
              <a href={project.url} target="_blank" rel="noreferrer" aria-label={`View ${project.name} repository on GitHub`} className="block">
                <div className={`relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br ${hues[index]}`}>
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.12) 1px,transparent 1px)', backgroundSize: '32px 32px', maskImage: 'radial-gradient(ellipse at center, black, transparent 75%)' }} />
                  <div className="absolute h-36 w-36 rounded-full border border-white/10 transition-transform duration-700 group-hover:scale-125" />
                  <div className="absolute h-24 w-24 rounded-full border border-white/10 transition-transform duration-700 group-hover:scale-90" />
                  <span className="relative font-serif text-7xl font-medium tracking-[-.1em] text-white/90 drop-shadow-lg">{symbols[index]}</span>
                  <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/20 px-3 py-1 font-mono text-[9px] uppercase tracking-[.15em] text-white/75">{String(index + 1).padStart(2, '0')} / Repository</span>
                  <span className="absolute bottom-4 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white transition-all group-hover:border-[#c9ff5f] group-hover:bg-[#c9ff5f] group-hover:text-[#11150d]"><ArrowUpRight size={16} /></span>
                </div>
              </a>
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3"><h3 className="text-xl font-medium">{project.name}</h3><a href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} on GitHub`} className="mt-1 text-[#738077] hover:text-[#c9ff5f]"><ArrowUpRight size={16} /></a></div>
                <p className="mt-2 min-h-12 text-sm leading-6 text-[#89938b]">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">{project.languages.slice(0, 4).map((language) => <span key={language} className="rounded-md bg-white/[0.055] px-2 py-1 font-mono text-[9px] text-[#b0bbb1]">{language}</span>)}</div>
                <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4 font-mono text-[10px] text-[#78837a]"><div className="flex items-center gap-4"><span className="inline-flex items-center gap-1.5"><Star size={12} />{project.stars}</span><span className="inline-flex items-center gap-1.5"><GitFork size={12} />{project.forks}</span></div><span>Updated {project.updated}</span></div>
              </div>
            </motion.article>
          ))}
        </div>
        <p className="mt-5 text-right font-mono text-[9px] uppercase tracking-wider text-[#667168]">Repository counts checked Nov 3, 2026</p>
      </div>
    </section>
  );
};
