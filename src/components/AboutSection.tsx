import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const AboutSection: React.FC = () => (
  <section id="about" className="section section--about" aria-labelledby="about-title">
    <div className="page-shell about-layout">
      <div className="section-side" data-reveal>
        <p className="eyebrow"><span className="section-number">01</span> ABOUT</p>
        <p className="section-side-note">A little about the person<br />behind the projects.</p>
      </div>
      <div className="about-main">
        <h2 id="about-title" className="section-heading" data-reveal>Curiosity, turned into <span className="text-silver">code.</span></h2>
        <div className="about-copy-grid" data-reveal>
          <p className="about-copy">{PERSONAL_INFO.bio}</p>
          <div className="about-note">
            <span className="eyebrow">MY APPROACH</span>
            <p>“{PERSONAL_INFO.philosophy}”</p>
            <a className="text-link" href="#journey">Follow my journey <ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="about-facts" data-reveal>
          <div><span className="eyebrow">CURRENTLY</span><strong>+2 Computer Science</strong></div>
          <div><span className="eyebrow">INSTITUTION</span><strong>{PERSONAL_INFO.institution}</strong></div>
          <div><span className="eyebrow">BASED IN</span><strong>{PERSONAL_INFO.location}</strong></div>
        </div>
      </div>
    </div>
  </section>
);
