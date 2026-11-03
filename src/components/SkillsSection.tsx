import React from 'react';
import { Braces, Database, Layers3, Palette, Smartphone, Sparkles } from 'lucide-react';
import { REPOSITORY_LANGUAGES } from '../data/portfolioData';

const areas = [
  { icon: Braces, title: 'Frontend development', note: 'Interfaces and web projects', technologies: ['TypeScript', 'JavaScript', 'HTML', 'CSS'] },
  { icon: Database, title: 'Backend & data', note: 'Server routes and app data', technologies: ['Node.js', 'Supabase'] },
  { icon: Smartphone, title: 'Application development', note: 'Mobile app exploration', technologies: ['Kotlin'] },
  { icon: Sparkles, title: 'AI integrations', note: 'Experimenting through public projects', technologies: ['OpenRouter', 'Qwen 3', 'Google GenAI'] },
  { icon: Palette, title: 'Interface design', note: 'Learning by shaping useful digital experiences', technologies: [] },
  { icon: Layers3, title: 'Full-stack learning', note: 'Connecting the parts into working products', technologies: [] },
];

export const SkillsSection: React.FC = () => (
  <section id="skills" className="section section--skills" aria-labelledby="skills-title">
    <div className="page-shell">
      <div className="section-header" data-reveal>
        <div><p className="eyebrow"><span className="section-number">02</span> SKILLS &amp; CURIOSITY</p><h2 id="skills-title" className="section-heading">What I’m <span className="text-silver">exploring.</span></h2></div>
        <p className="section-intro">Hands-on technologies surfaced in my public repositories, alongside the areas I’m learning about.</p>
      </div>

      <div className="skills-grid">
        {areas.map(({ icon: Icon, title, note, technologies }, index) => (
          <article className="skill-item" key={title} data-reveal style={{ '--reveal-order': index } as React.CSSProperties}>
            <div className="skill-item__top"><span className="skill-item__number">0{index + 1}</span><Icon size={19} strokeWidth={1.4} aria-hidden="true" /></div>
            <h3>{title}</h3>
            <p>{note}</p>
            {technologies.length > 0 && <ul className="technology-list" aria-label={`Technologies shown in repositories for ${title}`}>
              {technologies.map((technology) => <li key={technology}>{technology}</li>)}
            </ul>}
          </article>
        ))}
      </div>

      <div className="language-ledger" data-reveal>
        <div><span className="eyebrow">LANGUAGE METADATA</span><p>Languages appearing in the public repositories</p></div>
        <ul>{REPOSITORY_LANGUAGES.map((language) => <li key={language}>{language}<span aria-hidden="true"> /</span></li>)}</ul>
      </div>
      <p className="skills-disclaimer">Repository language labels are evidence of code in a project, not ratings of proficiency.</p>
    </div>
  </section>
);
