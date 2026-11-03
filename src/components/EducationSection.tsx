import React from 'react';
import { GraduationCap } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  const reduceMotion = useReducedMotion();
  return (
    <section id="education" className="py-28 md:py-36 border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-14 pb-7 border-b border-black/[0.08]">
          <span className="block text-[11px] uppercase font-mono tracking-[0.25em] text-[#716B61] mb-3">04 / EDUCATION</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#24231F] tracking-tight">Learning <span className="italic font-light text-[#8B5E34]">by doing</span></h2>
        </div>
        <motion.article initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white/65 border border-black/10 rounded-lg p-8 sm:p-12 flex flex-col sm:flex-row gap-6 sm:gap-10">
          <div className="h-12 w-12 shrink-0 rounded-full bg-[#EEE9DF] flex items-center justify-center"><GraduationCap className="h-5 w-5 text-[#8B5E34]" /></div>
          <div>
            <span className="text-xs uppercase font-mono tracking-[0.18em] text-[#716B61]">Current education</span>
            <h3 className="mt-3 text-2xl sm:text-3xl font-serif text-[#24231F]">+2 in Computer Science</h3>
            <p className="mt-2 text-base text-[#5C5952]">{PERSONAL_INFO.institution}</p>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#716B61]">Focused on software development, with a growing interest in web and application development.</p>
          </div>
          <span className="sm:ml-auto self-start sm:self-center text-xs font-mono uppercase tracking-wider text-[#8B5E34]">Nepal</span>
        </motion.article>
      </div>
    </section>
  );
};
