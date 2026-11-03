import React from 'react';
import { ArrowUpRight, GraduationCap } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const EducationSection: React.FC = () => (
  <section id="education" className="border-b border-[#d7d2c7] bg-[#ebe7dc] py-20 sm:py-28 lg:py-32">
    <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:px-12">
      <div className="lg:col-span-3"><span className="font-mono text-[10px] uppercase tracking-[.16em] text-[#3548c3]">04 / Education</span></div>
      <div className="grid gap-6 border-t border-[#cfc9bc] pt-6 sm:grid-cols-[52px_1fr_auto] sm:items-start lg:col-span-9">
        <span className="grid h-11 w-11 place-items-center bg-[#3548c3] text-white"><GraduationCap size={19} /></span>
        <div><p className="font-serif text-3xl leading-tight text-[#1d1d1a] sm:text-4xl">+2 in Computer Science</p><p className="mt-2 text-sm text-[#55554e]">{PERSONAL_INFO.institution}</p><p className="mt-4 max-w-xl text-sm leading-7 text-[#61615a]">My formal studies are one part of my development. I’m also learning through experimentation and building software projects.</p></div>
        <span className="inline-flex min-h-11 items-center gap-1 text-xs text-[#3548c3] sm:justify-self-end">Nepal <ArrowUpRight size={13} /></span>
      </div>
    </div>
  </section>
);
