import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const AboutSection: React.FC = () => (
  <section id="about" className="py-28 md:py-36 border-b border-black/[0.06]">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="mb-14 pb-7 border-b border-black/[0.08]">
        <span className="block text-[11px] uppercase font-mono tracking-[0.25em] text-[#716B61] mb-3">01 / ABOUT</span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#24231F] tracking-tight">A work in <span className="italic font-light text-[#8B5E34]">progress</span></h2>
      </div>
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">
        <p className="lg:col-span-8 text-xl sm:text-2xl leading-[1.8] text-[#5C5952] font-light">{PERSONAL_INFO.bio}</p>
        <aside className="lg:col-span-4 bg-[#24231F] text-[#F6F3EC] rounded-lg p-8 sm:p-10 flex flex-col justify-between min-h-64">
          <span className="font-mono uppercase tracking-[0.2em] text-xs text-[#C7B9A5]">Developer philosophy</span>
          <p className="mt-12 font-serif text-3xl leading-snug">“{PERSONAL_INFO.philosophy}”</p>
          <p className="mt-8 font-mono uppercase tracking-wider text-xs text-[#C7B9A5]">{PERSONAL_INFO.brand}</p>
        </aside>
      </div>
    </div>
  </section>
);
