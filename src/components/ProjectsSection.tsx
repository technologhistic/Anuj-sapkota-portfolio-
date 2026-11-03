import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';

export const ProjectsSection: React.FC = () => (
  <section id="projects" className="section section--projects" aria-labelledby="projects-title">
    <div className="page-shell">
      <div className="section-header section-header--projects" data-reveal>
        <div><p className="eyebrow"><span className="section-number">03</span> SELECTED PROJECTS</p><h2 id="projects-title" className="section-heading">Work in <span className="text-silver">progress.</span></h2></div>
        <p className="section-intro">A selection of public repositories—small experiments, useful tools, and learning in the open.</p>
      </div>

      <div className="project-grid">
        {PROJECTS.map((project, index) => (
          <article className={`project-card${index === 0 ? ' project-card--featured' : ''}`} key={project.name} data-reveal style={{ '--reveal-order': index } as React.CSSProperties}>
            <a className="project-image" href={project.demo ?? project.repository} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} ${project.demo ? 'live demo' : 'repository'}`}>
              <img src={project.image} alt={project.imageAlt} loading="lazy" width="1200" height="1200" />
              <span className="project-image__kind">{project.imageKind}</span>
              <span className="project-image__arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
            </a>
            <div className="project-details">
              <div className="project-heading"><div><span className="eyebrow">{project.category}</span><h3>{project.name}</h3></div><span className="project-number">0{index + 1}</span></div>
              <p>{project.description}</p>
              <ul className="project-tags" aria-label={project.technologies.length ? `Technologies used in ${project.name}` : 'Technology data not listed in this repository'}>
                {project.technologies.length ? project.technologies.map((item) => <li key={item}>{item}</li>) : <li>Technology details not listed</li>}
              </ul>
              <div className="project-links">
                <a href={project.repository} target="_blank" rel="noreferrer"><Github size={15} aria-hidden="true" />Repository <ArrowUpRight size={13} aria-hidden="true" /></a>
                {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Live demo{project.demoNote ? ` · ${project.demoNote}` : ''} <ArrowUpRight size={13} aria-hidden="true" /></a>}
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="project-source-note">Project previews link to their published demo or repository. Technologies are shown only where repository metadata or source identifies them.</p>
    </div>
  </section>
);
