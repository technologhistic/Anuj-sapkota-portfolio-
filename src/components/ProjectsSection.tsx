import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, Github, X } from 'lucide-react';
import { PROJECTS, type PortfolioProject } from '../data/portfolioData';

type DrawerMotion = { x: number; y: number; vx: number; vy: number; alpha: number; alphaVelocity: number };
type OrbitMotion = {
  angle: number; velocity: number; targetAngle: number | null; dragging: boolean; lastPointerX: number;
  pointerX: number; pointerY: number; lightX: number; lightY: number;
};

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const dragStart = useRef<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerTriggerRef = useRef<HTMLElement | null>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLButtonElement>(null);
  const drawerMotionRef = useRef<DrawerMotion>({ x: 0, y: 0, vx: 0, vy: 0, alpha: 0, alphaVelocity: 0 });
  const orbitStageRef = useRef<HTMLDivElement>(null);
  const orbitCardsRef = useRef<Array<HTMLElement | null>>([]);
  const orbitMotionRef = useRef<OrbitMotion>({ angle: 0, velocity: 0, targetAngle: null, dragging: false, lastPointerX: 0, pointerX: 0, pointerY: 0, lightX: 50, lightY: 50 });
  const orbitFrameRef = useRef(0);
  const startOrbitRef = useRef<() => void>(() => {});
  const reducedMotionRef = useRef(false);
  const pendingProjectRef = useRef<PortfolioProject | null>(null);

  const closeDrawer = () => {
    if (selectedProject) setIsClosing(true);
  };

  useLayoutEffect(() => {
    const stage = orbitStageRef.current;
    if (!stage) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = preference.matches;
    const motion = orbitMotionRef.current;
    let lastTime = 0;

    const renderOrbit = () => {
      const rect = stage.getBoundingClientRect();
      const radiusX = Math.min(rect.width * .34, 360);
      const radiusY = Math.min(rect.height * .13, 92);
      const depth = Math.min(rect.width * .23, 240);
      const count = PROJECTS.length;
      orbitCardsRef.current.forEach((card, index) => {
        if (!card) return;
        const theta = motion.angle + (index / count) * Math.PI * 2;
        const sine = Math.sin(theta);
        const cosine = Math.cos(theta);
        const front = (cosine + 1) / 2;
        const x = sine * radiusX;
        const y = cosine * radiusY;
        const z = cosine * depth;
        const scale = .73 + front * .27;
        const rotateY = sine * 16 + motion.lightX / 50 - 1;
        const rotateX = (50 - motion.lightY) * .035;
        card.style.transform = `translate3d(-50%, -50%, 0) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${rotateY.toFixed(2)}deg) rotateX(${rotateX.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        card.style.zIndex = `${Math.round(10 + cosine * 10)}`;
        card.style.opacity = `${(.58 + front * .42).toFixed(3)}`;
        card.style.filter = `brightness(${(.58 + front * .42).toFixed(3)})`;
        card.style.setProperty('--orbit-light-x', `${motion.lightX.toFixed(1)}%`);
        card.style.setProperty('--orbit-light-y', `${motion.lightY.toFixed(1)}%`);
      });
    };

    const animate = (now: number) => {
      orbitFrameRef.current = 0;
      const dt = lastTime ? Math.min(2, Math.max(.5, (now - lastTime) / 16.667)) : 1;
      lastTime = now;
      const damping = Math.pow(.78, dt);
      if (motion.dragging) {
        motion.velocity *= damping;
      } else if (motion.targetAngle !== null) {
        motion.velocity = (motion.velocity + (motion.targetAngle - motion.angle) * .085 * dt) * damping;
        motion.angle += motion.velocity * dt;
        if (Math.abs(motion.targetAngle - motion.angle) < .002 && Math.abs(motion.velocity) < .002) {
          motion.angle = motion.targetAngle;
          motion.velocity = 0;
          motion.targetAngle = null;
          if (pendingProjectRef.current) {
            setSelectedProject(pendingProjectRef.current);
            pendingProjectRef.current = null;
          }
        }
      } else {
        motion.angle += motion.velocity * dt;
        motion.velocity *= damping;
        if (!reducedMotionRef.current) motion.angle += .0032 * dt;
      }

      const lightEase = 1 - Math.pow(.76, dt);
      motion.lightX += (motion.pointerX - motion.lightX) * lightEase;
      motion.lightY += (motion.pointerY - motion.lightY) * lightEase;
      renderOrbit();

      const lightMoving = Math.abs(motion.pointerX - motion.lightX) > .12 || Math.abs(motion.pointerY - motion.lightY) > .12;
      if (!reducedMotionRef.current || motion.dragging || motion.targetAngle !== null || lightMoving || Math.abs(motion.velocity) > .002) {
        orbitFrameRef.current = requestAnimationFrame(animate);
      }
    };

    const startOrbit = () => {
      if (!orbitFrameRef.current) {
        lastTime = 0;
        orbitFrameRef.current = requestAnimationFrame(animate);
      }
    };
    startOrbitRef.current = startOrbit;
    renderOrbit();
    startOrbit();
    const onResize = () => { renderOrbit(); startOrbit(); };
    window.addEventListener('resize', onResize);

    const onMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;
      startOrbit();
    };
    preference.addEventListener('change', onMotionPreference);
    return () => {
      cancelAnimationFrame(orbitFrameRef.current);
      orbitFrameRef.current = 0;
      startOrbitRef.current = () => {};
      preference.removeEventListener('change', onMotionPreference);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const updatePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const stage = orbitStageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const motion = orbitMotionRef.current;
    motion.pointerX = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
    motion.pointerY = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));
    startOrbitRef.current();
  };

  const startOrbitDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('a, button')) return;
    const motion = orbitMotionRef.current;
    motion.dragging = true;
    motion.lastPointerX = event.clientX;
    motion.velocity = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePointer(event);
    startOrbitRef.current();
  };

  const rotateOrbit = (event: React.PointerEvent<HTMLDivElement>) => {
    const motion = orbitMotionRef.current;
    updatePointer(event);
    if (!motion.dragging) return;
    const delta = event.clientX - motion.lastPointerX;
    motion.angle += delta * .008;
    motion.velocity = delta * .00035;
    motion.lastPointerX = event.clientX;
    startOrbitRef.current();
  };

  const endOrbitDrag = () => {
    const motion = orbitMotionRef.current;
    if (!motion.dragging) return;
    motion.dragging = false;
    motion.pointerX = 50;
    motion.pointerY = 50;
    startOrbitRef.current();
  };

  const selectProject = (project: PortfolioProject, index: number) => {
    const motion = orbitMotionRef.current;
    const step = (Math.PI * 2) / PROJECTS.length;
    const frontAngle = -index * step;
    const target = frontAngle + Math.round((motion.angle - frontAngle) / (Math.PI * 2)) * Math.PI * 2;
    setIsClosing(false);
    if (reducedMotionRef.current) {
      motion.angle = target;
      motion.velocity = 0;
      motion.targetAngle = null;
      setSelectedProject(project);
      startOrbitRef.current();
      return;
    }
    pendingProjectRef.current = project;
    motion.targetAngle = target;
    motion.velocity = 0;
    startOrbitRef.current();
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
    const motion = drawerMotionRef.current;
    const travel = mobile ? drawer.offsetHeight + 40 : drawer.offsetWidth + 40;

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

    const destinationX = isClosing && !mobile ? drawer.offsetWidth + 48 : 0;
    const destinationY = isClosing && mobile ? drawer.offsetHeight + 48 : 0;
    const destinationAlpha = isClosing ? 0 : 1;
    if (reducedMotionRef.current) {
      motion.x = destinationX;
      motion.y = destinationY;
      motion.vx = motion.vy = motion.alphaVelocity = 0;
      motion.alpha = destinationAlpha;
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
        ref={orbitStageRef}
        className="project-orbit-stage"
        role="region"
        aria-label="Interactive circular orbit of portfolio projects. Drag horizontally or swipe to rotate."
        tabIndex={0}
        onPointerDown={startOrbitDrag}
        onPointerMove={rotateOrbit}
        onPointerUp={endOrbitDrag}
        onPointerCancel={endOrbitDrag}
        onPointerLeave={() => {
          if (!orbitMotionRef.current.dragging) {
            orbitMotionRef.current.pointerX = 50;
            orbitMotionRef.current.pointerY = 50;
            startOrbitRef.current();
          }
        }}
        onKeyDown={(event) => {
          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
          event.preventDefault();
          const motion = orbitMotionRef.current;
          motion.targetAngle = motion.angle + (event.key === 'ArrowLeft' ? -.5 : .5);
          if (reducedMotionRef.current) {
            motion.angle = motion.targetAngle;
            motion.targetAngle = null;
          }
          startOrbitRef.current();
        }}
      >
        {PROJECTS.map((project, index) => (
          <article ref={(element) => { orbitCardsRef.current[index] = element; }} className="project-card" key={project.name}>
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
                <button className="project-details-button" type="button" onClick={(event) => { drawerTriggerRef.current = event.currentTarget; selectProject(project, index); }}>View details <ArrowUpRight size={13} aria-hidden="true" /></button>
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
