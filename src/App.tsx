import React, { useEffect, useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  useEffect(() => {
    const ids = ['hero', 'about', 'skills', 'projects', 'education', 'contact'];
    const observers = ids.flatMap((id) => {
      const element = document.getElementById(id);
      if (!element) return [];
      const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActiveSection(id); }, { threshold: 0.25 });
      observer.observe(element);
      return [observer];
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <div className="site-shell relative min-h-screen overflow-x-clip text-[#bac2ba] selection:bg-[#c9ff5f] selection:text-[#11150d]">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[#c9ff5f] focus:px-4 focus:py-3 focus:text-sm focus:text-[#11150d]">Skip to content</a>
      <Navigation activeSection={activeSection} />
      <main id="main-content"><Hero /><AboutSection /><SkillsSection /><ProjectsSection /><EducationSection /><ContactSection /></main>
      <Footer />
    </div>
  );
}
