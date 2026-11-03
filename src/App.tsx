import React, { useEffect, useRef, useState } from 'react';
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
  const pageRef = useRef<HTMLDivElement>(null);

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
  }, { scope: pageRef });

  return (
    <div className="app-shell" ref={pageRef}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="scroll-progress" aria-hidden="true" />
      <Navigation activeSection={activeSection} />
      <main id="main-content"><Hero /><AboutSection /><SkillsSection /><ProjectsSection /><EducationSection /><ContactSection /></main>
      <Footer />
    </div>
  );
}
