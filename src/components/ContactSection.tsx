import React from 'react';
import { ArrowUpRight, MoveUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => (
  <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
    <div className="absolute inset-x-0 bottom-0 h-80 bg-[radial-gradient(ellipse_at_50%_100%,rgba(201,255,95,.09),transparent_65%)]" />
    <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
      <div className="overflow-hidden rounded-[2rem] border border-[#c9ff5f]/20 bg-[#111714] p-8 sm:p-12 lg:p-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8"><span className="font-mono text-[10px] uppercase tracking-[.2em] text-[#c9ff5f]">05 / Follow along</span><h2 className="mt-5 max-w-3xl text-4xl font-medium leading-[1.05] sm:text-6xl lg:text-7xl">The next idea is <span className="text-[#78857a]">always loading.</span></h2><p className="mt-6 max-w-lg text-sm leading-7 text-[#a1aba2]">I’m learning, building, and sharing my progress in public. Find the source and follow along on GitHub.</p></div>
          <div className="lg:col-span-4 lg:justify-self-end"><a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="group inline-flex min-h-14 items-center gap-4 rounded-full bg-[#c9ff5f] px-6 font-medium text-[#11150d] transition-transform hover:translate-y-[-2px]">Visit my GitHub <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#11150d]/10"><ArrowUpRight size={16} /></span></a></div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-5 font-mono text-[10px] uppercase tracking-[.15em] text-[#68746a]"><span>{PERSONAL_INFO.brand}</span><span className="inline-flex items-center gap-2"><MoveUpRight size={13} />{PERSONAL_INFO.philosophy}</span></div>
      </div>
    </div>
  </section>
);
