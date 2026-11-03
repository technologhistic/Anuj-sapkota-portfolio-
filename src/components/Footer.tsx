import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => (
  <footer className="border-t border-black/[0.08] py-8">
    <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 text-xs font-mono text-[#716B61]">
      <div><span className="text-[#24231F]">{PERSONAL_INFO.brand}</span><span className="mx-2">/</span>{PERSONAL_INFO.name}<span className="mx-2">·</span>{PERSONAL_INFO.location}</div>
      <a href="#hero" className="inline-flex items-center gap-2 hover:text-[#24231F]">Back to top <ArrowUp size={14} /></a>
    </div>
  </footer>
);
