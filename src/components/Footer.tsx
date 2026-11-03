import React from 'react';
import { ArrowUp, Github, Mail } from 'lucide-react';
import { CONTACT_EMAIL, GITHUB_URL, PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => (
  <footer className="site-footer">
    <div className="page-shell footer-main">
      <div><a className="footer-brand" href="#home">{PERSONAL_INFO.name}<span> / PORTFOLIO</span></a><p>{PERSONAL_INFO.philosophy}</p></div>
      <nav className="footer-nav" aria-label="Footer navigation">
        <a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#journey">Journey</a><a href="#contact">Contact</a>
      </nav>
      <div className="footer-socials"><a href={GITHUB_URL} target="_blank" rel="noreferrer"><Github size={15} aria-hidden="true" /> GitHub</a><a href={`mailto:${CONTACT_EMAIL}`}><Mail size={15} aria-hidden="true" /> Email</a></div>
    </div>
    <div className="page-shell footer-bottom"><span>© {new Date().getFullYear()} {PERSONAL_INFO.name} · Nepal</span><a href="#home">Back to top <ArrowUp size={14} aria-hidden="true" /></a></div>
  </footer>
);
