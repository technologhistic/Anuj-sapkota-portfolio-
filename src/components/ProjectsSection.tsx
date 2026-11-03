import React from 'react';
import { ArrowUpRight, GitFork, Star } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';

export const ProjectsSection: React.FC = () => {
  const reduceMotion = useReducedMotion();
  return (
    <section id="projects" className="py-28 md:py-36 border-b border-black/[0.06] bg-[#EEE9DF]/35">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-7 border-b border-black/[0.08]">
          <div>
            <span className="block text-[11px] uppercase font-mono tracking-[0.25em] text-[#716B61] mb-3">03 / REPOSITORIES</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#24231F] tracking-tight">Things I’ve <span className="italic font-light text-[#8B5E34]">been building</span></h2>
          </div>
          <a href="https://github.com/technologhistic?tab=repositories" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-[#8B5E34] hover:underline">Browse all repositories <ArrowUpRight size={16} /></a>
        </div>
        <p className="text-sm text-[#716B61] mb-8">Projects and repository stats are from my public GitHub profile. Stars and forks checked Nov 3, 2026.</p>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {PROJECTS.map((project, index) => (
            <motion.article key={project.name} initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="group rounded-lg border border-black/10 bg-[#F8F6F1] p-6 sm:p-7 flex flex-col min-h-[250px] hover:border-[#8B5E34]/40 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-serif text-2xl text-[#24231F]">{project.name}</h3>
                <a href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} on GitHub`} className="text-[#716B61] group-hover:text-[#8B5E34]"><ArrowUpRight size={18} /></a>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#716B61]">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">{project.languages.map((language) => <span key={language} className="rounded-full border border-black/10 px-2.5 py-1 text-[11px] text-[#5C5952]">{language}</span>)}</div>
              <div className="mt-auto pt-6 flex items-center justify-between gap-4 text-xs font-mono text-[#716B61]">
                <div className="flex gap-4"><span className="inline-flex items-center gap-1.5"><Star size={13} />{project.stars}</span><span className="inline-flex items-center gap-1.5"><GitFork size={13} />{project.forks}</span></div>
                <span>Updated {project.updated}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
