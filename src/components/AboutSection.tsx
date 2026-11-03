import React from 'react';
import { ArrowDownRight, Compass, Layers3, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

const principles = [
  { icon: Compass, number: '01', title: 'Stay curious', text: 'Follow questions far enough to understand how things work.' },
  { icon: Layers3, number: '02', title: 'Make it real', text: 'Turn ideas into small, working pieces that can be explored and improved.' },
  { icon: Sparkles, number: '03', title: 'Keep improving', text: 'Treat every build as a chance to learn what to do better next time.' },
];

export const AboutSection: React.FC = () => (
  <section id="about" className="relative border-b border-white/[0.07] py-24 sm:py-32 lg:py-36">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <span className="font-mono text-[10px] uppercase tracking-[.2em] text-[#c9ff5f]">01 / A little about me</span>
          <h2 className="mt-5 max-w-xl text-4xl font-medium leading-[1.08] sm:text-5xl lg:text-6xl">A curious mind, <span className="text-[#7f8b81]">a growing craft.</span></h2>
          <p className="mt-7 text-base leading-8 text-[#aab3ab]">{PERSONAL_INFO.bio}</p>
          <a href="#skills" className="mt-8 inline-flex items-center gap-3 text-sm text-[#c9ff5f] hover:text-white">What I’m exploring <ArrowDownRight size={16} /></a>
        </div>
        <div className="lg:col-span-7 lg:pt-10">
          <div className="overflow-hidden rounded-3xl border border-white/[0.09] bg-[#101513]">
            <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-5 sm:px-8"><span className="font-mono text-[10px] uppercase tracking-[.18em] text-[#c9ff5f]">My approach</span><span className="font-mono text-[10px] text-[#677269]">LEARN → BUILD → REFINE</span></div>
            {principles.map(({ icon: Icon, number, title, text }) => <div key={number} className="group grid grid-cols-[38px_1fr] gap-4 border-b border-white/[0.06] px-6 py-6 last:border-0 sm:grid-cols-[46px_1fr_24px] sm:items-center sm:px-8 sm:py-7"><span className="font-mono text-xs text-[#707a72]">{number}</span><div><h3 className="text-xl font-medium transition-colors group-hover:text-[#c9ff5f]">{title}</h3><p className="mt-1 text-sm text-[#869087]">{text}</p></div><Icon size={18} className="hidden text-[#68746a] transition-colors group-hover:text-[#c9ff5f] sm:block" /></div>)}
          </div>
          <p className="mt-5 text-right font-mono text-[10px] uppercase tracking-[.14em] text-[#606b62]">“{PERSONAL_INFO.philosophy}”</p>
        </div>
      </div>
    </div>
  </section>
);
