import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { REPOSITORY_LANGUAGES } from '../data/portfolioData';

const interests = ['Frontend development', 'Backend development', 'Full-stack development', 'Application interfaces', 'Application architecture', 'Cross-platform development'];

export const SkillsSection: React.FC = () => {
  const reduceMotion = useReducedMotion();
  return (
    <section id="skills" className="py-28 md:py-36 border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-14 pb-7 border-b border-black/[0.08]">
          <span className="block text-[11px] uppercase font-mono tracking-[0.25em] text-[#716B61] mb-3">02 / EXPLORING</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#24231F] tracking-tight">Curiosity in <span className="italic font-light text-[#8B5E34]">practice</span></h2>
          <p className="mt-4 text-sm sm:text-base text-[#716B61] leading-relaxed">Areas I’m exploring as I grow in software development.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <h3 className="font-serif text-2xl text-[#24231F] mb-6">Development interests</h3>
            <div className="flex flex-wrap gap-3">
              {interests.map((interest) => <span key={interest} className="px-4 py-3 rounded-md border border-black/10 bg-white/60 text-sm text-[#5C5952]">{interest}</span>)}
            </div>
          </div>
          <div>
            <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
              <h3 className="font-serif text-2xl text-[#24231F]">Languages in my repositories</h3>
              <a href="https://github.com/technologhistic?tab=repositories" target="_blank" rel="noreferrer" className="text-xs font-mono text-[#8B5E34] hover:underline">SOURCE: GITHUB ↗</a>
            </div>
            <p className="text-sm text-[#716B61] leading-relaxed mb-6">These languages are reported by GitHub for my public repositories. They describe repository contents, not a proficiency rating.</p>
            <div className="flex flex-wrap gap-3">
              {REPOSITORY_LANGUAGES.map((language, index) => (
                <motion.span key={language} initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="px-4 py-3 rounded-md bg-[#24231F] text-[#F6F3EC] text-sm">{language}</motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
