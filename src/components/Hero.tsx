import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { CONTACT_EMAIL, PERSONAL_INFO } from '../data/portfolioData';

type CardSpring = {
  x: number; y: number; z: number; vx: number; vy: number; vz: number;
  dropY: number; dropVelocity: number; pullY: number; pullVelocity: number; targetPullY: number;
  inputX: number; inputY: number; lightX: number; lightY: number;
  targetLightX: number; targetLightY: number;
};

type DragOrigin = { pointerX: number; pointerY: number };

export const Hero: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const pendulumRef = useRef<HTMLDivElement>(null);
  const springRef = useRef<CardSpring>({
    x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, inputX: 0, inputY: 0,
    dropY: -800, dropVelocity: 0, pullY: 0, pullVelocity: 0, targetPullY: 0,
    lightX: 50, lightY: 50, targetLightX: 50, targetLightY: 50,
  });
  const draggingRef = useRef(false);
  const dropStartedRef = useRef(false);
  const dragOriginRef = useRef<DragOrigin | null>(null);
  const frameRef = useRef(0);

  const moveLight = (clientX: number, clientY: number) => {
    const surface = stageRef.current;
    if (!surface) return;
    const rect = surface.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((clientX - rect.left) / rect.width) * 2 - 1));
    const y = Math.max(-1, Math.min(1, ((clientY - rect.top) / rect.height) * 2 - 1));
    const spring = springRef.current;
    spring.inputX = -y * 18;
    spring.inputY = x * 22;
    spring.targetLightX = (x + 1) * 50;
    spring.targetLightY = (y + 1) * 50;
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (!dropStartedRef.current) return;
    dragOriginRef.current = { pointerX: event.clientX, pointerY: event.clientY };
    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    moveLight(event.clientX, event.clientY);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!draggingRef.current) return;
    const origin = dragOriginRef.current;
    if (!origin) return;
    springRef.current.targetPullY = Math.max(0, Math.min(240, event.clientY - origin.pointerY));
    moveLight(event.clientX, event.clientY);
  };

  const releasePointer = () => {
    if (draggingRef.current) {
      draggingRef.current = false;
      setIsDragging(false);
    }
    springRef.current.inputX = 0;
    springRef.current.inputY = 0;
    springRef.current.targetPullY = 0;
    springRef.current.targetLightX = 50;
    springRef.current.targetLightY = 50;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      springRef.current.inputX = 0;
      springRef.current.inputY = 0;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      springRef.current.inputY = event.key === 'ArrowLeft' ? -10 : 10;
      event.preventDefault();
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      springRef.current.inputX = event.key === 'ArrowUp' ? 8 : -8;
      event.preventDefault();
    }
  };

  useEffect(() => {
    let titleFrame = 0;
    let titleStartTime = 0;
    let titleStarted = false;
    let dropTriggered = false;
    const titleLines = Array.from(titleRef.current?.querySelectorAll<HTMLElement>('.hero-title-line > span') ?? []);
    const completeTitle = () => {
      if (dropTriggered) return;
      dropTriggered = true;
      window.dispatchEvent(new Event('portfolio:hero-name-complete'));
    };

    const animateTitle = (now: number) => {
      const start = titleStartTime || now;
      titleStartTime = start;
      titleLines.forEach((line, index) => {
        const progress = Math.max(0, Math.min(1, (now - start - index * 90) / 600));
        const eased = 1 - (1 - progress) ** 3;
        line.style.opacity = `${eased}`;
        line.style.transform = `translate3d(0, ${(1 - eased) * 110}%, 0)`;
      });

      if (now - start >= 690) {
        titleFrame = 0;
        titleLines.forEach((line) => {
          line.style.removeProperty('opacity');
          line.style.removeProperty('transform');
        });
        completeTitle();
        return;
      }
      titleFrame = requestAnimationFrame(animateTitle);
    };

    const startTitle = () => {
      if (titleStarted) return;
      titleStarted = true;
      titleLines.forEach((line) => {
        line.style.opacity = '0';
        line.style.transform = 'translate3d(0, 110%, 0)';
      });
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        titleLines.forEach((line) => {
          line.style.removeProperty('opacity');
          line.style.removeProperty('transform');
        });
        completeTitle();
        return;
      }
      titleStartTime = 0;
      titleFrame = requestAnimationFrame(animateTitle);
    };

    let lastTime = 0;
    const startDrop = () => { dropStartedRef.current = true; };
    const handleIntroStart = () => {
      startTitle();
    };
    window.addEventListener('portfolio:intro-start', handleIntroStart);
    window.addEventListener('portfolio:hero-name-complete', startDrop);
    if (document.documentElement.dataset.portfolioIntroComplete === 'true') startTitle();
    const animate = (now: number) => {
      const spring = springRef.current;
      const dt = lastTime ? Math.min(2, Math.max(0.5, (now - lastTime) / 16.667)) : 1;
      lastTime = now;
      const time = now / 1000;
      const idleX = Math.sin(time * 1.1) * 1.35;
      const idleY = Math.sin(time * 0.82 + 0.7) * 1.8;
      const idleZ = Math.sin(time * 0.92) * 2.1;
      const targetX = idleX + spring.inputX;
      const targetY = idleY + spring.inputY;
      const targetZ = idleZ + spring.inputY * 0.12;
      const stiffness = (draggingRef.current ? 0.13 : 0.075) * dt;
      const damping = Math.pow(0.78, dt);
      spring.vx = (spring.vx + (targetX - spring.x) * stiffness) * damping;
      spring.vy = (spring.vy + (targetY - spring.y) * stiffness) * damping;
      spring.vz = (spring.vz + (targetZ - spring.z) * stiffness) * damping;
      if (dropStartedRef.current) {
        const dropStiffness = 0.045 * dt;
        spring.dropVelocity = (spring.dropVelocity + (0 - spring.dropY) * dropStiffness) * Math.pow(0.76, dt);
        spring.dropY += spring.dropVelocity;
      }
      const pullStiffness = (draggingRef.current ? 0.16 : 0.075) * dt;
      spring.pullVelocity = (spring.pullVelocity + (spring.targetPullY - spring.pullY) * pullStiffness) * Math.pow(0.7, dt);
      spring.pullY += spring.pullVelocity;
      spring.x += spring.vx;
      spring.y += spring.vy;
      spring.z += spring.vz;
      const lightStiffness = 0.14 * dt;
      spring.lightX += (spring.targetLightX - spring.lightX) * lightStiffness;
      spring.lightY += (spring.targetLightY - spring.lightY) * lightStiffness;

      const card = cardRef.current;
      if (card) {
        card.style.setProperty('--tilt-x', `${spring.x.toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${spring.y.toFixed(2)}deg`);
        card.style.setProperty('--light-x', `${spring.lightX.toFixed(1)}%`);
        card.style.setProperty('--light-y', `${spring.lightY.toFixed(1)}%`);
      }
      if (pendulumRef.current) {
        pendulumRef.current.style.setProperty('--swing-angle', `${spring.z.toFixed(2)}deg`);
        pendulumRef.current.style.setProperty('--drop-y', `${spring.dropY.toFixed(1)}px`);
        pendulumRef.current.style.setProperty('--pull-y', `${spring.pullY.toFixed(1)}px`);
      }
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frameRef.current);
      if (titleFrame) cancelAnimationFrame(titleFrame);
      window.removeEventListener('portfolio:intro-start', handleIntroStart);
      window.removeEventListener('portfolio:hero-name-complete', startDrop);
    };
  }, []);

  return (
    <section id="home" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-scene" aria-hidden="true">
        <div className="hero-metal-ring" />
        <span className="scene-index">PORTFOLIO / 001</span>
      </div>

      <div className="page-shell hero-layout">
        <div className="hero-copy">
          <p className="eyebrow hero-kicker"><span className="eyebrow-rule" />CS STUDENT · WEB & APP DEVELOPMENT · NEPAL</p>
          <h1 id="hero-title" className="hero-title" tabIndex={-1} ref={titleRef}>
            <span className="hero-title-line"><span>ANUJ</span></span>
            <span className="hero-title-line hero-title-line--silver"><span>SAPKOTA</span></span>
          </h1>
          <p className="hero-script" aria-hidden="true"><svg viewBox="0 0 240 75"><text x="4" y="58">Anuj</text></svg></p>
          <p className="hero-intro hero-copyline">A Computer Science student building toward full-stack development—learning by making thoughtful web and app experiences.</p>
          <div className="hero-actions">
            <a className="button button--light" href="#projects">View my work <ArrowDown size={16} aria-hidden="true" /></a>
            <a className="button button--outline" href="#contact">Contact me <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          <div className="hero-bottomline">
            <span>LEARN. BUILD. EXPERIMENT. IMPROVE.</span>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
        </div>

        <div
          className="hero-portrait-wrap"
          ref={stageRef}
          onPointerMove={(event) => {
            if (event.pointerType !== 'touch' || draggingRef.current) moveLight(event.clientX, event.clientY);
          }}
        >
          <div className="portrait-orbit portrait-orbit--one" aria-hidden="true" />
          <div className="portrait-orbit portrait-orbit--two" aria-hidden="true" />
          <div className={`portrait-pendulum${isDragging ? ' portrait-pendulum--dragging' : ''}`} ref={pendulumRef}>
            <div className="portrait-lanyard-system">
              <div className="portrait-strap" aria-hidden="true" />
              <div className="portrait-clip" aria-hidden="true" />
            </div>
            <article
              ref={cardRef}
              className={`portrait-card${isDragging ? ' portrait-card--dragging' : ''}`}
              aria-label="Interactive ID card for Anuj Sapkota. Move the pointer or touch and drag the card to tilt it. Use arrow keys to tilt and Escape to center it."
              tabIndex={0}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={releasePointer}
              onPointerCancel={releasePointer}
              onLostPointerCapture={releasePointer}
              onPointerLeave={() => { if (!draggingRef.current) releasePointer(); }}
              onKeyDown={handleKeyDown}
            >
              <div className="portrait-slot" aria-hidden="true" />
              <div className="portrait-image-frame">
                <picture>
                  <source srcSet="/anuj-photo.webp" type="image/webp" />
                  <img src="/anuj-photo.png" alt="Portrait of Anuj Sapkota" width="1343" height="1171" fetchPriority="high" />
                </picture>
                <span className="portrait-image-mark" aria-hidden="true">AS / 01</span>
              </div>
              <div className="portrait-card__identity">
                <p className="portrait-card__label">COMPUTER SCIENCE STUDENT</p>
                <h2>{PERSONAL_INFO.name}</h2>
                <p>Web &amp; application development</p>
              </div>
              <div className="portrait-card__foot"><span>ID 001</span><span>+2 CS</span></div>
            </article>
          </div>
          <p className="portrait-caption">A work in progress <span>— 2026</span></p>
        </div>
      </div>

      <div className="hero-scroll-cue" aria-hidden="true"><span>SCROLL TO EXPLORE</span><span className="hero-scroll-cue__line" /></div>
    </section>
  );
};
