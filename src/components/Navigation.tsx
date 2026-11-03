import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavigationProps { activeSection: string }
const links = [
  { label: 'About', href: '#about' },
  { label: 'Exploring', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F6F3EC]/90 backdrop-blur-md border-b border-black/[0.07]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-[72px] flex items-center justify-between gap-6">
        <a href="#hero" className="flex flex-col leading-tight text-[#24231F]">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8B5E34]">{PERSONAL_INFO.brand}</span>
          <span className="font-serif text-lg">{PERSONAL_INFO.name}</span>
        </a>
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-7">
          {links.map((link) => <a key={link.href} href={link.href} aria-current={activeSection === link.href.slice(1) ? 'location' : undefined} className={`text-[11px] uppercase tracking-[0.16em] font-mono transition-colors ${activeSection === link.href.slice(1) ? 'text-[#8B5E34]' : 'text-[#716B61] hover:text-[#24231F]'}`}>{link.label}</a>)}
        </nav>
        <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hidden sm:inline-flex px-4 py-2.5 rounded-md bg-[#24231F] text-[#F6F3EC] font-mono text-[11px] uppercase tracking-wider hover:bg-[#8B5E34] transition-colors">GitHub ↗</a>
        <button onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} className="lg:hidden w-11 h-11 inline-flex items-center justify-center border border-black/10 rounded-md text-[#24231F]">{open ? <X size={19} /> : <Menu size={19} />}</button>
      </div>
      {open && <nav aria-label="Mobile navigation" className="lg:hidden bg-[#F6F3EC] border-t border-black/10 px-6 py-3">{links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="flex min-h-11 items-center border-b border-black/[0.06] text-xs font-mono uppercase tracking-wider text-[#5C5952]">{link.label}</a>)}</nav>}
    </header>
  );
};
