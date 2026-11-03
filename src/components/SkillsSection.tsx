import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { REPOSITORY_LANGUAGES } from '../data/portfolioData';

const interests = [
  { number: '01', title: 'Web development', details: 'Frontend · Backend · Full-stack' },
  { number: '02', title: 'Application development', details: 'Interfaces · Architecture · Cross-platform exploration' },
  { number: '03', title: 'Programming languages', details: 'Learning through experimentation and project work' },
];

export const SkillsSection: React.FC = () => (
  <section id="skills" className="border-b border-[#d7d2c7] bg-[#ebe7dc] py-20 sm:py-28 lg:py-36">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
      <div className="grid gap-8 border-b border-[#cfc9bc] pb-9 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8"><span className="font-mono text-[10px] uppercase tracking-[.16em] text-[#3548c3]">02 / Areas of curiosity</span><h2 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.1] tracking-[-.04em] sm:text-5xl lg:text-6xl">A map of where I’m <span className="italic text-[#3548c3]">headed.</span></h2></div>
        <p className="max-w-sm text-sm leading-7 text-[#55554e] lg:col-span-4 lg:justify-self-end">These are interests I’m actively exploring as I grow in software development.</p>
      </div>
      <div className="grid gap-10 py-8 md:grid-cols-3 md:gap-0">
        {interests.map((item, index) => <article key={item.number} className={`relative ${index ? 'md:border-l md:border-[#cfc9bc] md:pl-7' : 'md:pr-7'} ${index === 1 ? 'md:px-7' : ''} ${index === 2 ? 'md:pl-7' : ''}`}><span className="font-mono text-[10px] text-[#3548c3]">{item.number}</span><h3 className="mt-4 max-w-xs font-serif text-2xl leading-tight sm:text-3xl">{item.title}</h3><p className="mt-4 text-xs leading-6 text-[#61615a]">{item.details}</p></article>)}
      </div>
      <div className="grid gap-5 border-t border-[#cfc9bc] pt-7 md:grid-cols-[1fr_2fr] md:items-start">
        <div><h3 className="font-mono text-[10px] uppercase tracking-[.14em] text-[#61615a]">Languages present in my public repos</h3><p className="mt-2 text-xs text-[#61615a]">GitHub language metadata · no proficiency levels</p></div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">{REPOSITORY_LANGUAGES.map((language) => <span key={language} className="font-serif text-xl text-[#1d1d1a]">{language}<span className="text-[#3548c3]">.</span></span>)}<a href="https://github.com/technologhistic?tab=repositories" target="_blank" rel="noreferrer" aria-label="Check language details on GitHub" className="inline-flex min-h-11 items-center text-xs text-[#3548c3] underline decoration-[#b9bde0] underline-offset-4">View source <ArrowUpRight size={13} className="ml-1" /></a></div>
      </div>
    </div>
  </section>
);
