import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => (
  <section id="contact" className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
    <div className="mx-auto grid max-w-7xl gap-8 bg-[#1d1d1a] p-7 text-[#f5f2ea] sm:p-10 md:grid-cols-[1fr_auto] md:items-end lg:p-14">
      <div><span className="font-mono text-[10px] uppercase tracking-[.16em] text-[#aab6ff]">05 / Keep in touch</span><h2 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.05] tracking-[-.04em] text-[#f5f2ea] sm:text-6xl">Follow the work as it <span className="italic text-[#aab6ff]">grows.</span></h2><p className="mt-5 max-w-lg text-sm leading-7 text-[#cbc9c1]">I share my projects and learning journey on GitHub.</p></div>
      <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-3 bg-[#3548c3] px-5 text-sm text-white transition-colors hover:bg-[#5263d1]">Find me on GitHub <ArrowUpRight size={15} /></a>
    </div>
  </section>
);
