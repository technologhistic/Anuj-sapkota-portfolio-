import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Pause, Play } from 'lucide-react';
import { CONTACT_EMAIL, PERSONAL_INFO } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const [motionPaused, setMotionPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const hangRef = useRef<HTMLDivElement>(null);
  const pendulumRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const pausedRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const swingLimitRef = useRef(35);
  const physicsRef = useRef({ angle: 0, velocity: 2.8, dragging: false, lastAngle: 0 });

  const swingLimit = () => swingLimitRef.current;

  const angleFromPointer = (event: React.PointerEvent<HTMLElement>) => {
    const stage = hangRef.current?.getBoundingClientRect();
    if (!stage) return 0;
    const dx = event.clientX - (stage.left + stage.width / 2);
    const dy = Math.max(1, event.clientY - stage.top);
    const angle = Math.atan2(-dx, dy) * 180 / Math.PI;
    const limit = swingLimit();
    return Math.max(-limit, Math.min(limit, angle));
  };

  const startDrag = (event: React.PointerEvent<HTMLElement>) => {
    const physics = physicsRef.current;
    physics.dragging = true;
    physics.lastAngle = physics.angle = angleFromPointer(event);
    physics.velocity = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const dragCard = (event: React.PointerEvent<HTMLElement>) => {
    const physics = physicsRef.current;
    if (!physics.dragging) return;
    const nextAngle = angleFromPointer(event);
    physics.velocity = Math.max(-8, Math.min(8, nextAngle - physics.lastAngle));
    physics.lastAngle = physics.angle = nextAngle;
  };

  const endDrag = () => {
    const physics = physicsRef.current;
    if (!physics.dragging) return;
    physics.dragging = false;
    setIsDragging(false);
    if (reducedMotionRef.current || pausedRef.current) {
      physics.angle = 0;
      physics.velocity = 0;
    }
  };

  const swingWithKeyboard = (event: React.KeyboardEvent<HTMLElement>) => {
    const physics = physicsRef.current;
    if (event.key === 'Escape') {
      physics.angle = 0;
      physics.velocity = 0;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      const limit = swingLimit();
      const direction = event.key === 'ArrowLeft' ? -1 : 1;
      physics.angle = Math.max(-limit, Math.min(limit, physics.angle + direction * 5));
      physics.velocity = reducedMotionRef.current ? 0 : direction * 1.8;
    }
    else return;
    event.preventDefault();
  };

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = motionPreference.matches;
    if (motionPreference.matches) physicsRef.current.velocity = 0;

    const updateSwingLimit = () => {
      const stage = hangRef.current?.getBoundingClientRect();
      const card = cardRef.current;
      if (!stage || !card) return;
      const pivotX = stage.left + stage.width / 2;
      const halfCard = card.offsetWidth / 2;
      const halfHeight = card.offsetHeight / 2;
      const sideRoom = Math.max(0, Math.min(pivotX, window.innerWidth - pivotX) - 12);
      const armLength = 144 + halfHeight;
      let limit = 0;
      for (let degrees = 0.5; degrees <= 45; degrees += 0.5) {
        const radians = degrees * Math.PI / 180;
        const rotatedExtent = armLength * Math.sin(radians) + halfCard * Math.cos(radians) + halfHeight * Math.sin(radians);
        if (rotatedExtent > sideRoom) break;
        limit = degrees;
      }
      swingLimitRef.current = limit;
      physicsRef.current.angle = Math.max(-swingLimitRef.current, Math.min(swingLimitRef.current, physicsRef.current.angle));
    };
    updateSwingLimit();
    window.addEventListener('resize', updateSwingLimit);

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;
      if (event.matches) {
        physicsRef.current.angle = 0;
        physicsRef.current.velocity = 0;
      }
    };
    motionPreference.addEventListener('change', handleMotionPreference);

    let frame = 0;
    const animate = () => {
      const physics = physicsRef.current;
      if (!physics.dragging && !pausedRef.current) {
        if (reducedMotionRef.current) {
          physics.velocity = 0;
        } else {
          physics.velocity = (physics.velocity - physics.angle * 0.012) * 0.99;
          physics.angle += physics.velocity;
          const limit = swingLimit();
          if (Math.abs(physics.angle) > limit) {
            physics.angle = Math.sign(physics.angle) * limit;
            physics.velocity *= -0.42;
          }
          if (Math.abs(physics.angle) < 0.015 && Math.abs(physics.velocity) < 0.015) {
            physics.angle = 0;
            physics.velocity = 0;
          }
        }
      }
      if (pendulumRef.current) pendulumRef.current.style.transform = `rotate(${physics.angle.toFixed(3)}deg)`;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      motionPreference.removeEventListener('change', handleMotionPreference);
      window.removeEventListener('resize', updateSwingLimit);
    };
  }, []);

  const toggleMotion = () => setMotionPaused((paused) => {
    pausedRef.current = !paused;
    if (!paused) physicsRef.current.velocity = 0;
    return !paused;
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

        <div className="hero-portrait-wrap" ref={hangRef}>
          <div className="portrait-orbit portrait-orbit--one" aria-hidden="true" />
          <div className="portrait-orbit portrait-orbit--two" aria-hidden="true" />
          <div className="portrait-pendulum" ref={pendulumRef}>
            <div className="portrait-strap" aria-hidden="true" />
            <div className="portrait-clip" aria-hidden="true" />
            <article
              ref={cardRef}
              className={`portrait-card${isDragging ? ' portrait-card--dragging' : ''}`}
              aria-label="Interactive hanging ID card for Anuj Sapkota. Drag it to swing, or use the left and right arrow keys. Press Escape to center it."
              tabIndex={0}
              onPointerDown={startDrag}
              onPointerMove={dragCard}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onLostPointerCapture={endDrag}
              onKeyDown={swingWithKeyboard}
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
                <h2>Anuj Sapkota</h2>
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
