import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Github, X } from 'lucide-react';
import { PROJECTS, type PortfolioProject } from '../data/portfolioData';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStart = useRef<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeDrawer = () => {
    setSelectedProject(null);
    setDragOffset(0);
  };

  useEffect(() => {
    if (!selectedProject) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') closeDrawer(); };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedProject]);

  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') return;
    dragStart.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const dragDrawer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStart.current === null) return;
    setDragOffset(Math.max(0, event.clientY - dragStart.current));
  };
  const endDrag = () => {
    if (dragOffset > 110) closeDrawer();
    else setDragOffset(0);
    dragStart.current = null;
  };

  return (
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
                <button className="project-details-button" type="button" onClick={() => setSelectedProject(project)}>View details <ArrowUpRight size={13} aria-hidden="true" /></button>
                <a href={project.repository} target="_blank" rel="noreferrer"><Github size={15} aria-hidden="true" />Repository <ArrowUpRight size={13} aria-hidden="true" /></a>
                {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Live demo{project.demoNote ? ` · ${project.demoNote}` : ''} <ArrowUpRight size={13} aria-hidden="true" /></a>}
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="project-source-note">Project previews link to their published demo or repository. Technologies are shown only where repository metadata or source identifies them.</p>
    </div>
    {selectedProject && <div className="project-drawer-layer" role="presentation">
      <button className="project-drawer-backdrop" type="button" aria-label="Close project details" onClick={closeDrawer} />
      <aside className="project-drawer" role="dialog" aria-modal="true" aria-labelledby="project-drawer-title" style={{ '--drawer-drag': `${dragOffset}px` } as React.CSSProperties}>
        <div className="project-drawer__grabber" onPointerDown={startDrag} onPointerMove={dragDrawer} onPointerUp={endDrag} onPointerCancel={endDrag}><span aria-hidden="true" /></div>
        <div className="project-drawer__top"><span className="eyebrow">PROJECT DETAILS</span><button ref={closeButtonRef} className="project-drawer__close" type="button" onClick={closeDrawer} aria-label="Close project details"><X size={19} aria-hidden="true" /></button></div>
        <img className="project-drawer__image" src={selectedProject.image} alt={selectedProject.imageAlt} width="1200" height="1200" />
        <p className="eyebrow">{selectedProject.category}</p>
        <h3 id="project-drawer-title">{selectedProject.name}</h3>
        <p className="project-drawer__description">{selectedProject.description}</p>
        <ul className="project-tags" aria-label={`Technologies used in ${selectedProject.name}`}>{selectedProject.technologies.length ? selectedProject.technologies.map((item) => <li key={item}>{item}</li>) : <li>Technology details not listed</li>}</ul>
        <div className="project-drawer__links"><a className="button button--light" href={selectedProject.repository} target="_blank" rel="noreferrer"><Github size={16} aria-hidden="true" />Repository</a>{selectedProject.demo && <a className="button button--outline" href={selectedProject.demo} target="_blank" rel="noreferrer">Open demo <ArrowUpRight size={16} aria-hidden="true" /></a>}</div>
      </aside>
    </div>}
  </section>
  );
};
