import React from 'react';
import { ArrowUpRight, GraduationCap } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const EducationSection: React.FC = () => (
  <section id="journey" className="section section--journey" aria-labelledby="journey-title">
    <div className="page-shell journey-layout">
      <div className="section-side" data-reveal>
        <p className="eyebrow"><span className="section-number">04</span> EDUCATION &amp; JOURNEY</p>
        <h2 id="journey-title" className="section-heading">Still at the <span className="text-silver">beginning.</span></h2>
        <p className="section-intro">My work and learning are evolving. I’m sharing the journey as it happens.</p>
      </div>

      <div className="journey-track">
        <article className="journey-entry" data-reveal>
          <span className="journey-entry__marker"><GraduationCap size={19} aria-hidden="true" /></span>
          <div><span className="eyebrow">FORMAL EDUCATION</span><h3>+2 Computer Science</h3><p>{PERSONAL_INFO.institution}</p><span className="journey-entry__meta">Nepal</span></div>
          <ArrowUpRight className="journey-entry__arrow" size={18} aria-hidden="true" />
        </article>
        <article className="journey-entry" data-reveal>
          <span className="journey-entry__marker journey-entry__marker--dot" aria-hidden="true" />
          <div><span className="eyebrow">CURRENT FOCUS</span><h3>Learn through building</h3><p>Exploring web development, application development, and the foundations of full-stack software through public projects.</p><a className="text-link" href="#projects">See the repositories <ArrowUpRight size={14} aria-hidden="true" /></a></div>
          <span className="journey-entry__meta">ONGOING</span>
        </article>
      </div>
    </div>
  </section>
);
