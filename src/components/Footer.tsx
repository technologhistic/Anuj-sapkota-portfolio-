import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => (
  <footer className="border-t border-[#d7d2c7]">
    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 font-mono text-[9px] uppercase tracking-[.13em] text-[#61615a] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12"><span><span className="text-[#3548c3]">{PERSONAL_INFO.brand}</span><span className="mx-2">/</span>{PERSONAL_INFO.name}</span><span>Learn. Build. Experiment. Improve.</span><a href="#hero" className="inline-flex min-h-11 items-center gap-2 self-start transition-colors hover:text-[#3548c3] sm:self-auto">Back to top <ArrowUp size={12} /></a></div>
  </footer>
);
