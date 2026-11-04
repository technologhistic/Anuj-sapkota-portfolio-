import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const sections = ['home', 'about', 'skills', 'projects', 'journey', 'contact'];
const INTRO_DURATION = 4000;
const REDUCED_INTRO_DURATION = 2000;
const INTRO_EXIT_DURATION = 650;
const prefersReducedMotion = () => typeof window !== 'undefined'
  && typeof window.matchMedia === 'function'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [welcomeOpen, setWelcomeOpen] = useState(true);
  const [welcomeLeaving, setWelcomeLeaving] = useState(false);
  const welcomeOpenRef = useRef(true);
  const pageRef = useRef<HTMLDivElement>(null);
  const closeWelcome = useCallback(() => {
    if (!welcomeOpenRef.current) return;
    welcomeOpenRef.current = false;
    setWelcomeLeaving(true);
    const exitDuration = prefersReducedMotion() ? 0 : INTRO_EXIT_DURATION;
    window.setTimeout(() => {
      setWelcomeOpen(false);
      requestAnimationFrame(() => {
        document.documentElement.dataset.portfolioIntroComplete = 'true';
        window.dispatchEvent(new Event('portfolio:intro-start'));
      });
    }, exitDuration);
  }, []);

  useEffect(() => {
    if (!welcomeOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [welcomeOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-30% 0px -56% 0px', threshold: [0, 0.15, 0.4, 0.7] });

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!welcomeOpen) return;
    const timer = window.setTimeout(
      closeWelcome,
      prefersReducedMotion() ? REDUCED_INTRO_DURATION : INTRO_DURATION,
    );
    return () => window.clearTimeout(timer);
  }, [closeWelcome, welcomeOpen]);

  useGSAP(() => {
    if (welcomeOpen) return;
    const media = gsap.matchMedia();
    const installPageAnimations = (reducedMotion: boolean) => {
      const travel = (fullDistance: number) => reducedMotion ? Math.min(fullDistance, 6) : fullDistance;
      const duration = (fullDuration: number, reducedDuration = 0.42) => reducedMotion ? reducedDuration : fullDuration;
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .from('.hero-kicker', { autoAlpha: 0, y: travel(16), duration: duration(0.55) })
        .from('.hero-metal-ring', { autoAlpha: 0, scale: reducedMotion ? 1 : 0.82, duration: duration(1.35), ease: 'power2.out' }, '-=0.86')
        .from('.hero-intro', { autoAlpha: 0, y: travel(22), duration: duration(0.65) }, '-=0.35')
        .from('.hero-actions > *', { autoAlpha: 0, y: travel(14), duration: duration(0.45), stagger: reducedMotion ? 0.025 : 0.08 }, '-=0.34')
        .from('.hero-portrait-wrap', { autoAlpha: 0, y: travel(32), rotateY: travel(-10), duration: duration(0.95) }, 0);

      intro.fromTo('.hero-script text', { strokeDashoffset: 1400 }, {
        strokeDashoffset: 0,
        duration: reducedMotion ? 0.75 : 1.4,
        ease: 'power2.inOut',
      }, '-=0.7');
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.fromTo(element, { autoAlpha: 0, y: reducedMotion ? 7 : 28 }, {
          autoAlpha: 1,
          y: 0,
          duration: reducedMotion ? 0.42 : 0.72,
          delay: Number(element.style.getPropertyValue('--reveal-order') || 0) * 0.055,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        });
      });

      gsap.to('.scroll-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: reducedMotion ? true : 0.35 },
      });
    };

    media.add('(prefers-reduced-motion: no-preference)', () => installPageAnimations(false));
    media.add('(prefers-reduced-motion: reduce)', () => installPageAnimations(true));
    const hasMatchingMotionQuery = window.matchMedia?.('(prefers-reduced-motion: no-preference)').matches
      || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!hasMatchingMotionQuery) installPageAnimations(false);
    return () => media.revert();
  }, { scope: pageRef, dependencies: [welcomeOpen], revertOnUpdate: true });

  return (
    <div className="app-shell" ref={pageRef}>
      {welcomeOpen && <div id="welcome" className={`welcome-screen${welcomeLeaving ? ' welcome-screen--leaving' : ''}`} role="status" aria-live="polite" aria-label="Welcome to Anuj Sapkota’s portfolio">
        <div className="welcome-content">
          <h1 className="welcome-name" aria-label="Anuj">{'Anuj'.split('').map((letter, index) => <span key={`${letter}-${index}`} className="welcome-letter" style={{ '--intro-index': index } as React.CSSProperties} aria-hidden="true">{letter}</span>)}</h1>
          <span className="welcome-rule" aria-hidden="true" />
          <p className="welcome-caption">CREATIVE DEVELOPER</p>
        </div>
        <button className="welcome-skip" type="button" onClick={closeWelcome}>Skip intro <span aria-hidden="true">↗</span></button>
      </div>}
      <div className="portfolio-content" inert={welcomeOpen}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <div className="scroll-progress" aria-hidden="true" />
        <Navigation activeSection={activeSection} />
        <main id="main-content"><Hero /><AboutSection /><SkillsSection /><ProjectsSection /><EducationSection /><ContactSection /></main>
        <Footer />
      </div>
    </div>
  );
}
