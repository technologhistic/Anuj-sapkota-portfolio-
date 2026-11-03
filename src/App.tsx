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

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [welcomeOpen, setWelcomeOpen] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const pageRef = useRef<HTMLDivElement>(null);
  const welcomeSkipRef = useRef<HTMLButtonElement>(null);
  const closeWelcome = useCallback(() => {
    const skipHadFocus = welcomeSkipRef.current === document.activeElement;
    setWelcomeOpen(false);
    if (skipHadFocus) requestAnimationFrame(() => document.getElementById('hero-title')?.focus());
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

  useGSAP(() => {
    if (!welcomeOpen) return;
    const intro = gsap.timeline({ onComplete: closeWelcome });
    intro
      .fromTo('.welcome-halo', { autoAlpha: 0, scale: 0.82, rotate: -14 }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.8, ease: 'power2.out' })
      .fromTo('.welcome-kicker', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.38, ease: 'power2.out' }, '-=0.36')
      .fromTo('.welcome-name span', { autoAlpha: 0, yPercent: 115, rotateX: -45 }, { autoAlpha: 1, yPercent: 0, rotateX: 0, duration: 0.76, stagger: 0.09, ease: 'power3.out' }, '-=0.08')
      .fromTo('.welcome-rule', { scaleX: 0 }, { scaleX: 1, duration: 0.48, ease: 'power2.inOut' }, '-=0.4')
      .fromTo('.welcome-caption', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.34, ease: 'power2.out' }, '-=0.22')
      .to('.welcome-screen', { yPercent: -100, duration: 0.64, ease: 'power3.inOut' }, '+=0.28');
    return () => intro.kill();
  }, { scope: pageRef, dependencies: [welcomeOpen], revertOnUpdate: true });

  useGSAP(() => {
    if (welcomeOpen) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .from('.hero-kicker', { autoAlpha: 0, y: 16, duration: 0.55 })
        .from('.hero-title-line > span', { yPercent: 112, duration: 0.95, stagger: 0.12 }, '-=0.28')
        .from('.hero-metal-ring', { autoAlpha: 0, scale: 0.82, duration: 1.35, ease: 'power2.out' }, '-=0.86')
        .from('.hero-copyline', { autoAlpha: 0, y: 22, duration: 0.65 }, '-=0.35')
        .from('.hero-actions > *', { autoAlpha: 0, y: 14, duration: 0.45, stagger: 0.08 }, '-=0.34')
        .from('.hero-portrait-wrap', { autoAlpha: 0, y: 32, rotateY: -10, duration: 0.95 }, '-=0.7')
        .from('.hero-script text', { strokeDashoffset: 260, duration: 1.05, ease: 'power2.inOut' }, '-=0.7');

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.fromTo(element, { autoAlpha: 0, y: 28 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.72,
          delay: Number(element.style.getPropertyValue('--reveal-order') || 0) * 0.055,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        });
      });

      gsap.to('.scroll-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.35 },
      });
    });
    return () => media.revert();
  }, { scope: pageRef, dependencies: [welcomeOpen], revertOnUpdate: true });

  return (
    <div className="app-shell" ref={pageRef}>
      {welcomeOpen && <div className="welcome-screen" role="status" aria-live="polite" aria-label="Welcome to Anuj Sapkota’s portfolio">
        <div className="welcome-halo" aria-hidden="true" />
        <div className="welcome-content">
          <p className="welcome-kicker">WELCOME TO MY PORTFOLIO</p>
          <h1 className="welcome-name" aria-label="Anuj"><span aria-hidden="true">A</span><span aria-hidden="true">n</span><span aria-hidden="true">u</span><span aria-hidden="true">j</span></h1>
          <span className="welcome-rule" aria-hidden="true" />
          <p className="welcome-caption">ANUJ SAPKOTA <span aria-hidden="true">/</span> NEPAL</p>
        </div>
        <button ref={welcomeSkipRef} className="welcome-skip" type="button" onClick={closeWelcome}>Skip intro <span aria-hidden="true">↗</span></button>
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
