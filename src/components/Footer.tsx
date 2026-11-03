import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => (
  <footer className="border-t border-white/[0.07] bg-[#080a09]">
    <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-7 font-mono text-[10px] uppercase tracking-[.14em] text-[#68736b] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
      <span><span className="text-[#c9ff5f]">{PERSONAL_INFO.brand}</span><span className="mx-2 text-white/20">/</span>{PERSONAL_INFO.name}</span>
      <span className="normal-case tracking-normal">Learn. Build. Experiment. Improve.</span>
      <a href="#hero" className="inline-flex min-h-11 items-center gap-2 text-[#a6b0a7] transition-colors hover:text-[#c9ff5f]">Back to top <ArrowUp size={13} /></a>
    </div>
  </footer>
);
