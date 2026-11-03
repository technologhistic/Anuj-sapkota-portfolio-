import React, { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavigationProps { activeSection: string }
const links = [{ label: 'About', href: '#about' }, { label: 'Exploring', href: '#skills' }, { label: 'Projects', href: '#projects' }, { label: 'Education', href: '#education' }];

export const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#d7d2c7] bg-[#f5f2ea]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-5 px-5 sm:px-8 lg:px-12">
        <a href="#hero" className="flex items-center gap-3 text-[#1d1d1a]" aria-label="Build With Onyx, home">
          <span className="grid h-9 w-9 place-items-center bg-[#3548c3] font-serif text-xl italic text-white">O</span>
          <span className="leading-tight"><span className="block font-mono text-[9px] uppercase tracking-[.18em]">{PERSONAL_INFO.brand}</span><span className="block text-[11px] text-[#61615a]">Anuj Sapkota</span></span>
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {links.map((link) => <a key={link.href} href={link.href} aria-current={activeSection === link.href.slice(1) ? 'location' : undefined} className={`relative py-2 text-xs transition-colors ${activeSection === link.href.slice(1) ? 'text-[#3548c3]' : 'text-[#61615a] hover:text-[#1d1d1a]'}`}>{link.label}{activeSection === link.href.slice(1) && <span className="absolute inset-x-0 bottom-0 h-px bg-[#3548c3]" />}</a>)}
          <a href="#contact" className="ml-2 inline-flex min-h-10 items-center gap-2 border border-[#1d1d1a] px-4 text-xs text-[#1d1d1a] transition-colors hover:bg-[#1d1d1a] hover:text-[#f5f2ea]">Say hello <ArrowUpRight size={13} /></a>
        </nav>
        <button onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} className="inline-flex h-11 w-11 items-center justify-center border border-[#d7d2c7] text-[#1d1d1a] md:hidden">{open ? <X size={18} /> : <Menu size={18} />}</button>
      </div>
      {open && <nav aria-label="Mobile navigation" className="border-t border-[#d7d2c7] bg-[#f5f2ea] px-6 py-3 md:hidden">{links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center border-b border-[#d7d2c7] text-sm text-[#393933]">{link.label}</a>)}<a href="#contact" onClick={() => setOpen(false)} className="flex min-h-12 items-center text-sm text-[#3548c3]">Say hello ↗</a></nav>}
    </header>
  );
};
