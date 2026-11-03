import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const AboutSection: React.FC = () => (
  <section id="about" className="border-b border-[#d7d2c7] py-20 sm:py-28 lg:py-36">
    <div className="mx-auto grid max-w-7xl gap-9 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:px-12">
      <div className="lg:col-span-3"><span className="font-mono text-[10px] uppercase tracking-[.16em] text-[#3548c3]">01 / About</span><div className="mt-8 hidden font-serif text-[8rem] leading-none text-[#e2ded4] lg:block">01</div></div>
      <div className="lg:col-span-9">
        <h2 className="max-w-4xl font-serif text-4xl leading-[1.12] tracking-[-.045em] sm:text-5xl lg:text-6xl">Part student. Part maker. <span className="italic text-[#3548c3]">Always curious.</span></h2>
        <div className="mt-8 grid gap-8 border-t border-[#d7d2c7] pt-7 md:grid-cols-[1.1fr_.9fr] md:gap-14">
          <p className="text-base leading-8 text-[#393933]">{PERSONAL_INFO.bio}</p>
          <div className="flex flex-col justify-between gap-8">
            <div><span className="font-mono text-[10px] uppercase tracking-[.14em] text-[#61615a]">The way I like to work</span><p className="mt-3 font-serif text-3xl leading-tight text-[#1d1d1a]">“{PERSONAL_INFO.philosophy}”</p></div>
            <a href="#skills" className="inline-flex min-h-11 items-center gap-2 self-start text-sm text-[#3548c3] underline decoration-[#b9bde0] underline-offset-4">What I’m exploring <ArrowDownRight size={15} /></a>
          </div>
        </div>
      </div>
    </div>
  </section>
);
