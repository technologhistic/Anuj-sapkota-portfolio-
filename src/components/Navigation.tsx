import React, { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavigationProps { activeSection: string }
const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

export const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <a href="#home" className="wordmark" aria-label={`${PERSONAL_INFO.name}, home`} onClick={closeMenu}>
        <span>{PERSONAL_INFO.name}</span><small>PORTFOLIO</small>
      </a>
      <nav className={`primary-nav${open ? ' primary-nav--open' : ''}`} id="primary-navigation" aria-label="Main navigation">
        {links.map((link) => <a key={link.href} href={link.href} onClick={closeMenu} aria-current={activeSection === link.href.slice(1) ? 'location' : undefined}>{link.label}</a>)}
        <a className="primary-nav__cta" href="#contact" onClick={closeMenu}>Let’s talk <ArrowUpRight size={14} aria-hidden="true" /></a>
      </nav>
      <button className="menu-toggle" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen((value) => !value)}>
        {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>
    </header>
  );
};
