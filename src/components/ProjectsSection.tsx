import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, X } from 'lucide-react';
import { PROJECTS, type PortfolioProject } from '../data/portfolioData';

type DrawerMotion = { x: number; y: number; vx: number; vy: number; alpha: number; alphaVelocity: number };
export const ProjectsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const dragStart = useRef<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerTriggerRef = useRef<HTMLElement | null>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLButtonElement>(null);
  const drawerMotionRef = useRef<DrawerMotion>({ x: 0, y: 0, vx: 0, vy: 0, alpha: 0, alphaVelocity: 0 });
  const swipeStartRef = useRef<number | null>(null);

  const closeDrawer = () => {
    if (selectedProject) setIsClosing(true);
  };

  const selectProject = (project: PortfolioProject) => {
    setIsClosing(false);
    setSelectedProject(project);
  };

  const showPreviousProject = () => setActiveIndex((index) => (index - 1 + PROJECTS.length) % PROJECTS.length);
  const showNextProject = () => setActiveIndex((index) => (index + 1) % PROJECTS.length);
  const finishSwipe = (endX: number) => {
    if (swipeStartRef.current === null) return;
    const distance = endX - swipeStartRef.current;
    if (Math.abs(distance) > 45) distance < 0 ? showNextProject() : showPreviousProject();
    swipeStartRef.current = null;
  };

  useEffect(() => {
    if (!selectedProject) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDrawer();
        return;
      }
      if (event.key !== 'Tab' || !drawerRef.current) return;
      const focusable = Array.from(drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not(:disabled), [tabindex]:not([tabindex="-1"])',
      )).filter((element) => element.getAttribute('aria-hidden') !== 'true');
      if (!focusable.length) {
        event.preventDefault();
        drawerRef.current.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !drawerRef.current.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !drawerRef.current.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      if (drawerTriggerRef.current?.isConnected) drawerTriggerRef.current.focus();
    };
  }, [selectedProject]);

  useLayoutEffect(() => {
    if (!selectedProject || !drawerRef.current || !backdropRef.current) return;
    const drawer = drawerRef.current;
    const backdrop = backdropRef.current;
    const mobile = window.matchMedia('(max-width: 720px)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motion = drawerMotionRef.current;
    const travel = reducedMotion ? 16 : mobile ? drawer.offsetHeight + 40 : drawer.offsetWidth + 40;

    if (!isClosing) {
      motion.x = mobile ? 0 : travel;
      motion.y = mobile ? travel : 0;
      motion.vx = motion.vy = motion.alphaVelocity = 0;
      motion.alpha = 0;
      drawer.style.setProperty('--drawer-spring-x', `${motion.x}px`);
      drawer.style.setProperty('--drawer-spring-y', `${motion.y}px`);
      drawer.style.setProperty('--drawer-scale', '.985');
      backdrop.style.setProperty('--drawer-backdrop-alpha', '0');
    }

    const destinationX = isClosing && !mobile ? (reducedMotion ? 16 : drawer.offsetWidth + 48) : 0;
    const destinationY = isClosing && mobile ? (reducedMotion ? 16 : drawer.offsetHeight + 48) : 0;
    const destinationAlpha = isClosing ? 0 : 1;
    let frame = 0;
    let previousTime = 0;

    const animate = (now: number) => {
      const dt = previousTime ? Math.min(2, Math.max(.5, (now - previousTime) / 16.667)) : 1;
      previousTime = now;
      const damping = Math.pow(.68, dt);
      motion.vx = (motion.vx + (destinationX - motion.x) * .14 * dt) * damping;
      motion.vy = (motion.vy + (destinationY - motion.y) * .14 * dt) * damping;
      motion.alphaVelocity = (motion.alphaVelocity + (destinationAlpha - motion.alpha) * .2 * dt) * damping;
      motion.x += motion.vx;
      motion.y += motion.vy;
      motion.alpha = Math.max(0, Math.min(1, motion.alpha + motion.alphaVelocity));
      drawer.style.setProperty('--drawer-spring-x', `${motion.x.toFixed(2)}px`);
      drawer.style.setProperty('--drawer-spring-y', `${motion.y.toFixed(2)}px`);
      const progress = Math.max(0, Math.min(1, 1 - Math.abs(mobile ? motion.y : motion.x) / travel));
      drawer.style.setProperty('--drawer-scale', `${(.985 + progress * .015).toFixed(4)}`);
      backdrop.style.setProperty('--drawer-backdrop-alpha', `${motion.alpha.toFixed(3)}`);

      const settled = Math.abs(destinationX - motion.x) < .45
        && Math.abs(destinationY - motion.y) < .45
        && Math.abs(motion.vx) < .45
        && Math.abs(motion.vy) < .45
        && Math.abs(destinationAlpha - motion.alpha) < .01;
      if (settled) {
        drawer.style.setProperty('--drawer-spring-x', `${destinationX}px`);
        drawer.style.setProperty('--drawer-spring-y', `${destinationY}px`);
        drawer.style.setProperty('--drawer-scale', '1');
        backdrop.style.setProperty('--drawer-backdrop-alpha', `${destinationAlpha}`);
        if (isClosing) {
          setSelectedProject(null);
          setIsClosing(false);
          setDragOffset(0);
        }
        return;
      }
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [selectedProject, isClosing]);

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

      <div
        className="project-orbit-stage"
        role="region"
        aria-label="Selected portfolio projects. Swipe horizontally or use the previous and next buttons."
        tabIndex={0}
        onPointerDown={(event) => {
          if ((event.target as HTMLElement).closest('a, button')) return;
          swipeStartRef.current = event.clientX;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={(event) => finishSwipe(event.clientX)}
        onPointerCancel={() => { swipeStartRef.current = null; }}
        onKeyDown={(event) => {
          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
          event.preventDefault();
          event.key === 'ArrowLeft' ? showPreviousProject() : showNextProject();
        }}
      >
        {(() => {
          const project = PROJECTS[activeIndex];
          const index = activeIndex;
          return <article className="project-card" key={project.name} aria-live="polite" aria-label={`Project ${activeIndex + 1} of ${PROJECTS.length}`}>
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
                <button className="project-details-button" type="button" onClick={(event) => { drawerTriggerRef.current = event.currentTarget; selectProject(project); }}>View details <ArrowUpRight size={13} aria-hidden="true" /></button>
                <a href={project.repository} target="_blank" rel="noreferrer"><Github size={15} aria-hidden="true" />Repository <ArrowUpRight size={13} aria-hidden="true" /></a>
                {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Live demo{project.demoNote ? ` · ${project.demoNote}` : ''} <ArrowUpRight size={13} aria-hidden="true" /></a>}
              </div>
            </div>
          </article>;
        })()}
      </div>
      <div className="project-carousel-controls" aria-label="Project selection">
        <button type="button" onClick={showPreviousProject} aria-label="Show previous project"><ArrowLeft size={17} aria-hidden="true" /></button>
        <span aria-live="polite">{String(activeIndex + 1).padStart(2, '0')} <span aria-hidden="true">/</span> {String(PROJECTS.length).padStart(2, '0')}</span>
        <button type="button" onClick={showNextProject} aria-label="Show next project"><ArrowRight size={17} aria-hidden="true" /></button>
      </div>
      <p className="project-source-note">Project previews link to their published demo or repository. Technologies are shown only where repository metadata or source identifies them.</p>
    </div>
    {selectedProject && <div className="project-drawer-layer" role="presentation">
      <button ref={backdropRef} className="project-drawer-backdrop" type="button" aria-label="Close project details" onClick={closeDrawer} />
      <aside ref={drawerRef} className="project-drawer" role="dialog" aria-modal="true" aria-labelledby="project-drawer-title" style={{ '--drawer-drag': `${dragOffset}px` } as React.CSSProperties}>
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
