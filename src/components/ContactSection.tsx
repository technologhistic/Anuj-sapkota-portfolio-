import React from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => (
  <section id="contact" className="py-28 md:py-36">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="rounded-lg bg-[#24231F] text-[#F6F3EC] p-8 sm:p-12 md:p-16 flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div>
          <span className="block text-[11px] uppercase font-mono tracking-[0.25em] text-[#C7B9A5] mb-4">05 / FIND ME</span>
          <h2 className="font-serif text-4xl sm:text-6xl leading-tight">Let’s keep <span className="italic text-[#C7B9A5]">building.</span></h2>
          <p className="mt-5 text-sm sm:text-base text-[#D2CCC1]">Follow my work and current projects on GitHub.</p>
          <p className="mt-6 inline-flex items-center gap-2 text-xs font-mono text-[#C7B9A5]"><MapPin size={14} />{PERSONAL_INFO.location}</p>
        </div>
        <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 self-start md:self-auto rounded-md bg-[#F6F3EC] text-[#24231F] px-6 py-4 text-xs font-mono uppercase tracking-wider hover:bg-[#C7B9A5] transition-colors">GitHub profile <ArrowUpRight size={16} /></a>
      </div>
    </div>
  </section>
);
