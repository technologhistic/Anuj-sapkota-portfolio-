import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Pause, Play } from 'lucide-react';
import { CONTACT_EMAIL, PERSONAL_INFO } from '../data/portfolioData';

type CardSpring = { x: number; y: number; vx: number; vy: number; targetX: number; targetY: number; lightX: number; lightY: number };

export const Hero: React.FC = () => {
  const [motionPaused, setMotionPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const springRef = useRef<CardSpring>({ x: 0, y: 0, vx: 0, vy: 0, targetX: 0, targetY: 0, lightX: 50, lightY: 50 });
  const pausedRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const draggingRef = useRef(false);
  const startSpringRef = useRef<() => void>(() => {});

  const moveLight = (clientX: number, clientY: number) => {
    const card = cardRef.current;
    if (!card || pausedRef.current || reducedMotionRef.current) return;
    const rect = card.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((clientX - rect.left) / rect.width) * 2 - 1));
    const y = Math.max(-1, Math.min(1, ((clientY - rect.top) / rect.height) * 2 - 1));
    const spring = springRef.current;
    spring.targetX = -y * 12;
    spring.targetY = x * 15;
    spring.lightX = (x + 1) * 50;
    spring.lightY = (y + 1) * 50;
    startSpringRef.current();
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'touch') return;
    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    moveLight(event.clientX, event.clientY);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch' && !draggingRef.current) return;
    moveLight(event.clientX, event.clientY);
  };

  const releasePointer = () => {
    if (draggingRef.current) {
      draggingRef.current = false;
      setIsDragging(false);
    }
    springRef.current.targetX = 0;
    springRef.current.targetY = 0;
    startSpringRef.current();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      springRef.current.targetX = 0;
      springRef.current.targetY = 0;
      startSpringRef.current();
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      springRef.current.targetY = event.key === 'ArrowLeft' ? -10 : 10;
      startSpringRef.current();
      event.preventDefault();
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      springRef.current.targetX = event.key === 'ArrowUp' ? 8 : -8;
      startSpringRef.current();
      event.preventDefault();
    }
  };

  useEffect(() => {
    const motionPreference = typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null;
    reducedMotionRef.current = motionPreference?.matches ?? false;
    let frame = 0;
    let lastTime = 0;

    const animate = (now: number) => {
      const spring = springRef.current;
      const dt = lastTime ? Math.min(2, (now - lastTime) / 16.667) : 1;
      lastTime = now;
      const stiffness = reducedMotionRef.current || pausedRef.current ? 0 : 0.12;
      const damping = Math.pow(0.72, dt);
      spring.vx = (spring.vx + (spring.targetX - spring.x) * stiffness * dt) * damping;
      spring.vy = (spring.vy + (spring.targetY - spring.y) * stiffness * dt) * damping;
      spring.x += spring.vx * dt;
      spring.y += spring.vy * dt;
      if (Math.abs(spring.x) < 0.015 && Math.abs(spring.vx) < 0.015) spring.x = spring.vx = 0;
      if (Math.abs(spring.y) < 0.015 && Math.abs(spring.vy) < 0.015) spring.y = spring.vy = 0;

      const card = cardRef.current;
      if (card) {
        card.style.setProperty('--tilt-x', `${spring.x.toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${spring.y.toFixed(2)}deg`);
        card.style.setProperty('--light-x', `${spring.lightX.toFixed(1)}%`);
        card.style.setProperty('--light-y', `${spring.lightY.toFixed(1)}%`);
      }
      if (spring.x || spring.y || spring.vx || spring.vy || spring.targetX || spring.targetY) {
        frame = requestAnimationFrame(animate);
      } else {
        frame = 0;
        lastTime = 0;
      }
    };
    const startSpring = () => {
      if (!frame) {
        lastTime = 0;
        frame = requestAnimationFrame(animate);
      }
    };
    startSpringRef.current = startSpring;
    startSpring();

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;
      if (event.matches) {
        springRef.current.targetX = 0;
        springRef.current.targetY = 0;
        startSpring();
      }
    };
    motionPreference?.addEventListener?.('change', handleMotionPreference);
    if (motionPreference && !motionPreference.addEventListener) motionPreference.addListener(handleMotionPreference);
    return () => {
      cancelAnimationFrame(frame);
      startSpringRef.current = () => {};
      motionPreference?.removeEventListener?.('change', handleMotionPreference);
      if (motionPreference && !motionPreference.removeEventListener) motionPreference.removeListener(handleMotionPreference);
    };
  }, []);

  const toggleMotion = () => setMotionPaused((paused) => {
    const next = !paused;
    pausedRef.current = next;
    if (next) {
      springRef.current.targetX = 0;
      springRef.current.targetY = 0;
      startSpringRef.current();
    }
    return next;
  });

  return (
    <section id="home" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-scene" aria-hidden="true">
        <div className="hero-metal-ring" />
        <span className="scene-index">PORTFOLIO / 001</span>
      </div>

      <div className="page-shell hero-layout">
        <div className="hero-copy">
          <p className="eyebrow hero-kicker"><span className="eyebrow-rule" />CS STUDENT · WEB & APP DEVELOPMENT · NEPAL</p>
          <h1 id="hero-title" className="hero-title" tabIndex={-1}>
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

        <div className="hero-portrait-wrap">
          <div className="portrait-orbit portrait-orbit--one" aria-hidden="true" />
          <div className="portrait-orbit portrait-orbit--two" aria-hidden="true" />
          <div className={`portrait-pendulum${isDragging ? ' portrait-pendulum--active' : ''}`}>
            <div className="portrait-strap" aria-hidden="true" />
            <div className="portrait-clip" aria-hidden="true" />
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
              onPointerLeave={(event) => { if (event.pointerType !== 'touch' && !draggingRef.current) releasePointer(); }}
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
          <button className="motion-toggle" type="button" onClick={toggleMotion} aria-label={motionPaused ? 'Resume card motion' : 'Pause card motion'} aria-pressed={motionPaused}>
            {motionPaused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
            <span>{motionPaused ? 'RESUME' : 'PAUSE MOTION'}</span>
          </button>
          <p className="portrait-caption">A work in progress <span>— 2026</span></p>
        </div>
      </div>

      <div className="hero-scroll-cue" aria-hidden="true"><span>SCROLL TO EXPLORE</span><span className="hero-scroll-cue__line" /></div>
    </section>
  );
};
