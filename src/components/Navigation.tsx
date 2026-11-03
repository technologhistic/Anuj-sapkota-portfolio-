import React, { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavigationProps { activeSection: string }
const links = [{ label: 'About', href: '#about' }, { label: 'Exploring', href: '#skills' }, { label: 'Projects', href: '#projects' }, { label: 'Journey', href: '#education' }];

export const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#090c0b]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-5 px-5 sm:px-8 lg:px-12">
        <a href="#hero" aria-label="Build with Onyx, home" className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c9ff5f] font-serif text-lg font-bold text-[#11150d] transition-transform group-hover:rotate-[-8deg]">O</span>
          <span className="leading-tight"><span className="block font-mono text-[9px] tracking-[.22em] text-[#c9ff5f]">BUILD WITH</span><span className="block font-serif text-base tracking-[.08em] text-[#f0f3ec]">ONYX</span></span>
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
          {links.map((link) => <a key={link.href} href={link.href} aria-current={activeSection === link.href.slice(1) ? 'location' : undefined} className={`text-xs transition-colors ${activeSection === link.href.slice(1) ? 'text-[#c9ff5f]' : 'text-[#9ca59e] hover:text-white'}`}>{link.label}</a>)}
        </nav>
        <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-xs text-white transition-all hover:border-[#c9ff5f]/60 hover:text-[#c9ff5f] sm:inline-flex">GitHub <ArrowUpRight size={14} /></a>
        <button onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white lg:hidden">{open ? <X size={18} /> : <Menu size={18} />}</button>
      </div>
      {open && <nav aria-label="Mobile navigation" className="border-t border-white/10 bg-[#090c0b] px-6 py-3 lg:hidden">{links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center border-b border-white/[0.06] text-sm text-[#bac2ba]">{link.label}</a>)}<a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="flex min-h-12 items-center text-sm text-[#c9ff5f]">GitHub profile ↗</a></nav>}
    </header>
  );
};
