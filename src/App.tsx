import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { SelectedProjects } from './components/SelectedProjects';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { EducationSection } from './components/EducationSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ResumeSection } from './components/ResumeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ResumeModal } from './components/ResumeModal';
import { Project } from './data/portfolioData';

export default function App() {
  const [activeProjectForModal, setActiveProjectForModal] = useState<Project | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Handle ESC key for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeProjectForModal) setActiveProjectForModal(null);
        if (isResumeModalOpen) setIsResumeModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProjectForModal, isResumeModalOpen]);

  // Section observer for top bar active highlighting
  useEffect(() => {
    const sectionIds = ['hero', 'projects', 'case-studies', 'about', 'skills', 'education', 'achievements', 'resume', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.25 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#090A0C] text-[#C5C7CC] selection:bg-[#F1F0EC] selection:text-[#090A0C]">
      {/* Top Bar Navigation */}
      <Navigation
        activeSection={activeSection}
        onOpenResume={() => setIsResumeModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero */}
        <Hero onOpenResume={() => setIsResumeModalOpen(true)} />

        {/* 2. Selected Projects */}
        <SelectedProjects onSelectProject={(project) => setActiveProjectForModal(project)} />

        {/* 3. Detailed Project Case Studies */}
        <CaseStudiesSection />

        {/* 4. About Me */}
        <AboutSection />

        {/* 5. Technical Skills */}
        <SkillsSection />

        {/* 6. Education */}
        <EducationSection />

        {/* 7. Achievements */}
        <AchievementsSection />

        {/* 8. Downloadable Résumé */}
        <ResumeSection onOpenResumeModal={() => setIsResumeModalOpen(true)} />

        {/* 9. Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Case Study Modal */}
      <CaseStudyModal
        project={activeProjectForModal}
        onClose={() => setActiveProjectForModal(null)}
      />

      {/* Interactive Printable Résumé Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}
