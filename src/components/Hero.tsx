import React, { useState } from 'react';
import { ArrowDown, ArrowUpRight, Pause, Play } from 'lucide-react';
import { CONTACT_EMAIL, PERSONAL_INFO } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const [motionPaused, setMotionPaused] = useState(false);

  const tiltCard = (event: React.PointerEvent<HTMLElement>) => {
    if (motionPaused) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty('--tilt-x', `${(-y * 8).toFixed(2)}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${(x * 10).toFixed(2)}deg`);
  };

  const resetTilt = (element: HTMLElement) => {
    element.style.setProperty('--tilt-x', '0deg');
    element.style.setProperty('--tilt-y', '0deg');
  };

  const tiltWithKeyboard = (event: React.KeyboardEvent<HTMLElement>) => {
    const amount = 7;
    if (event.key === 'ArrowLeft') event.currentTarget.style.setProperty('--tilt-y', `${-amount}deg`);
    else if (event.key === 'ArrowRight') event.currentTarget.style.setProperty('--tilt-y', `${amount}deg`);
    else if (event.key === 'ArrowUp') event.currentTarget.style.setProperty('--tilt-x', `${amount}deg`);
    else if (event.key === 'ArrowDown') event.currentTarget.style.setProperty('--tilt-x', `${-amount}deg`);
    else if (event.key === 'Escape') resetTilt(event.currentTarget);
    else return;
    event.preventDefault();
  };

  return (
    <section id="home" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-scene" aria-hidden="true">
        <div className="scene-grid" />
        <div className="scene-orbit scene-orbit--outer" />
        <div className="scene-orbit scene-orbit--inner" />
        <div className="scene-slab" />
        <span className="scene-index">ONYX / 001</span>
      </div>

      <div className="page-shell hero-layout">
        <div className="hero-copy">
          <p className="eyebrow hero-kicker"><span className="eyebrow-rule" />CS STUDENT · WEB & APP DEVELOPMENT · NEPAL</p>
          <h1 id="hero-title" className="hero-title">
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
          <div className="lanyard" aria-hidden="true"><span /></div>
          <div className={`portrait-swing${motionPaused ? ' portrait-swing--paused' : ''}`}>
            <article
              className="portrait-card"
              aria-label="Interactive profile card for Anuj Sapkota. Use the arrow keys to tilt it, or move a pointer across it."
              tabIndex={0}
              onPointerMove={tiltCard}
              onPointerLeave={(event) => resetTilt(event.currentTarget)}
              onPointerUp={(event) => resetTilt(event.currentTarget)}
              onKeyDown={tiltWithKeyboard}
              onBlur={(event) => resetTilt(event.currentTarget)}
            >
              <div className="portrait-card__topline"><span>BUILD WITH ONYX</span><span>NEPAL</span></div>
              <div className="portrait-image-frame">
                <img src="/anuj-photo.png" alt="Portrait of Anuj Sapkota" width="1335" height="1180" fetchPriority="high" />
                <span className="portrait-image-mark" aria-hidden="true">AS / 01</span>
              </div>
              <div className="portrait-card__identity">
                <p className="portrait-card__label">COMPUTER SCIENCE STUDENT</p>
                <h2>Anuj Sapkota</h2>
                <p>Web &amp; application development</p>
              </div>
              <div className="portrait-card__foot"><span>LIBERTY SECONDARY SCHOOL</span><span>+2 CS</span></div>
            </article>
          </div>
          <button className="motion-toggle" type="button" onClick={() => setMotionPaused((value) => !value)} aria-label={motionPaused ? 'Resume card motion' : 'Pause card motion'} aria-pressed={motionPaused}>
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
