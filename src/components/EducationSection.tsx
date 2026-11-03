import React from 'react';
import { ArrowUpRight, GraduationCap } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  const reduceMotion = useReducedMotion();
  return (
    <section id="education" className="border-b border-white/[0.07] bg-[#0d110f] py-24 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5"><span className="font-mono text-[10px] uppercase tracking-[.2em] text-[#c9ff5f]">04 / The journey</span><h2 className="mt-4 text-4xl font-medium leading-[1.08] sm:text-5xl lg:text-6xl">Grounded in learning. <span className="text-[#7f8b81]">Looking ahead.</span></h2></div>
          <motion.article initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#121815] p-7 sm:p-9 lg:col-span-7 lg:p-10">
            <div className="pointer-events-none absolute -right-6 -top-16 h-52 w-52 rounded-full border border-[#c9ff5f]/10" /><div className="pointer-events-none absolute -right-1 -top-9 h-40 w-40 rounded-full border border-[#c9ff5f]/10" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#c9ff5f]/10 text-[#c9ff5f]"><GraduationCap size={22} /></div>
              <div className="flex-1"><span className="font-mono text-[10px] uppercase tracking-[.17em] text-[#879188]">Education</span><h3 className="mt-2 text-2xl font-medium sm:text-3xl">+2 Computer Science</h3><p className="mt-2 text-sm text-[#a3ada4]">{PERSONAL_INFO.institution}</p><div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-5"><span className="text-xs text-[#7f8b81]">Currently focused on software development</span><span className="inline-flex items-center gap-2 text-xs text-[#c9ff5f]">Nepal <ArrowUpRight size={13} /></span></div></div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};
