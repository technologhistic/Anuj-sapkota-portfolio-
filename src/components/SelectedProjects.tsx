import React, { useState } from 'react';
import { ArrowUpRight, Github, ExternalLink, BookOpen, Layers, CheckCircle2, Terminal, Cpu, Sparkles } from 'lucide-react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { PROJECTS, Project } from '../data/portfolioData';

interface SelectedProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const SelectedProjects: React.FC<SelectedProjectsProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const shouldReduceMotion = useReducedMotion();

  const categories = ['All', 'Full-Stack', 'Design Systems', 'Developer Tools', 'Web Apps'];

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 sm:py-32 md:py-40 lg:py-48 border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-16 sm:mb-20 md:mb-28 pb-6 sm:pb-8 border-b border-white/[0.08]"
        >
          <div className="space-y-2 sm:space-y-3 max-w-2xl">
            <span className="block text-[11px] uppercase font-mono tracking-[0.25em] text-[#858997]">
              CHAPTER 01 // SELECTED WORKS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#F1F0EC] tracking-tight leading-[1.1]">
              Architectural <span className="italic font-light text-[#C5C7CC]">Craft</span> &amp; Engineering
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#858997] font-light leading-[1.8]">
              An asymmetric portfolio of production-grade systems, mathematical token calculus, and developer tooling.
            </p>
          </div>

          {/* Interactive Category Segmented Control (Horizontally scrollable on mobile) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#14161A] border border-white/10 rounded-sm overflow-x-auto max-w-full shrink-0 no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-3 sm:px-3.5 py-2 min-h-[40px] sm:min-h-[44px] text-xs font-mono transition-colors rounded-sm whitespace-nowrap shrink-0 flex items-center justify-center ${
                  activeCategory === category
                    ? 'text-[#090A0C] font-medium'
                    : 'text-[#858997] hover:text-[#F1F0EC]'
                }`}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId={shouldReduceMotion ? undefined : 'activeCategoryPill'}
                    className="absolute inset-0 bg-[#F1F0EC] rounded-sm z-0"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Premium Asymmetric Project Grid */}
        <div className="space-y-20 sm:space-y-28 md:space-y-36">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              // Asymmetric Layout Style based on Index
              const isFlagship = idx === 0;
              const isAlternating = idx % 2 === 1;

              return (
                <motion.article
                  key={project.id}
                  layout={!shouldReduceMotion}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#14161A]/40 border border-white/[0.08] hover:border-white/20 transition-all rounded-sm overflow-hidden shadow-2xl group"
                >
                  {/* Layout Variant 1: Full-Width Flagship Bento Spread (Project 0) */}
                  {isFlagship ? (
                    <div className="p-6 sm:p-10 lg:p-14 space-y-10 sm:space-y-12">
                      {/* Top Meta Strip */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
                        <div className="flex items-center gap-3 text-xs font-mono text-[#858997] tracking-wider uppercase">
                          <span className="text-[#F1F0EC] font-semibold">FLAGSHIP SYSTEM 01</span>
                          <span aria-hidden="true" className="text-white/20">/</span>
                          <span>{project.category}</span>
                          <span aria-hidden="true" className="text-white/20">/</span>
                          <span>{project.year}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>PRODUCTION READY</span>
                        </div>
                      </div>

                      {/* Main Screenshot Container */}
                      <div
                        onClick={() => onSelectProject(project)}
                        className="relative cursor-pointer overflow-hidden rounded-sm border border-white/10 bg-[#090A0C] aspect-video group/img shadow-2xl"
                      >
                        <motion.img
                          whileHover={shouldReduceMotion ? {} : { scale: 1.025 }}
                          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                          src={project.image}
                          alt={`${project.title} High-Resolution System Screenshot`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center filter contrast-[1.05]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover/img:opacity-40 transition-opacity" />

                        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#F1F0EC]">
                          <span className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-sm border border-white/10">
                            <BookOpen className="w-3.5 h-3.5 text-[#C5C7CC]" />
                            <span>Click to Read Comprehensive Technical Case Study</span>
                          </span>
                          <span className="bg-black/80 backdrop-blur-md px-3 py-2 rounded-sm border border-white/10 font-mono text-xs text-[#858997] hidden sm:inline">
                            60 FPS TICK STREAM
                          </span>
                        </div>
                      </div>

                      {/* Details & Contributions Split */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pt-4">
                        {/* Left Details (7 cols) */}
                        <div className="lg:col-span-7 space-y-6">
                          <div className="space-y-2">
                            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F1F0EC] group-hover:text-white transition-colors leading-[1.15]">
                              {project.title}
                            </h3>
                            <p className="text-base sm:text-lg font-serif italic font-light text-[#C5C7CC]">
                              {project.subtitle}
                            </p>
                            <p className="text-sm sm:text-base text-[#858997] leading-[1.8] font-light pt-2">
                              {project.summary}
                            </p>
                          </div>

                          {/* My Architectural Contributions */}
                          <div className="space-y-3 pt-2">
                            <span className="block text-xs font-mono uppercase tracking-[0.2em] text-[#F1F0EC] flex items-center gap-2">
                              <Cpu className="w-3.5 h-3.5 text-[#858997]" />
                              <span>My Key Architectural Contributions</span>
                            </span>
                            <div className="space-y-2.5">
                              {project.myContributions.map((contrib, cIdx) => (
                                <div key={cIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[#C5C7CC] font-light leading-[1.7]">
                                  <span className="font-mono text-xs text-[#858997] mt-0.5">0{cIdx + 1}.</span>
                                  <span>{contrib}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Tech Stack Unboxed Tags */}
                          <div className="pt-4 border-t border-white/[0.08] space-y-2">
                            <span className="block text-[11px] font-mono uppercase tracking-[0.2em] text-[#858997]">
                              Technologies &amp; Architecture
                            </span>
                            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-xs font-mono text-[#858997]">
                              {project.techStack.map((tech, tIdx) => (
                                <span key={tech} className="flex items-center gap-2.5">
                                  <span className="text-[#C5C7CC]">{tech}</span>
                                  {tIdx < project.techStack.length - 1 && (
                                    <span aria-hidden="true" className="text-white/20">·</span>
                                  )}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right Metrics & Actions (5 cols) */}
                        <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-[#090A0C]/50 border border-white/[0.06] p-6 sm:p-8 rounded-sm">
                          {/* Metrics Grid */}
                          <div className="space-y-4">
                            <span className="block text-xs font-mono uppercase tracking-[0.2em] text-[#858997]">
                              Benchmarked Metrics
                            </span>
                            <div className="grid grid-cols-2 gap-5">
                              {project.metrics.map((m, mIdx) => (
                                <div key={mIdx} className="space-y-1 p-3 bg-[#14161A]/60 border border-white/[0.05] rounded-sm">
                                  <span className="block text-2xl sm:text-3xl font-serif text-[#F1F0EC] tabular-nums font-normal">
                                    {m.value}
                                  </span>
                                  <span className="text-[#858997] text-[11px] uppercase tracking-wider block">
                                    {m.label}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Direct Action Hub */}
                          <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {project.liveUrl && (
                                <motion.a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  whileHover={shouldReduceMotion ? {} : { y: -2 }}
                                  whileTap={shouldReduceMotion ? {} : { y: 0 }}
                                  className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3 text-xs uppercase font-mono tracking-wider font-semibold text-[#090A0C] bg-[#F1F0EC] hover:bg-white rounded-sm transition-all shadow-md group/live"
                                >
                                  <span>Live Demo</span>
                                  <ExternalLink className="w-3.5 h-3.5 group-hover/live:translate-x-0.5 transition-transform" />
                                </motion.a>
                              )}

                              {project.githubUrl && (
                                <motion.a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  whileHover={shouldReduceMotion ? {} : { y: -2 }}
                                  whileTap={shouldReduceMotion ? {} : { y: 0 }}
                                  className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-mono text-[#F1F0EC] bg-[#14161A] hover:bg-[#1D2026] border border-white/10 hover:border-white/25 rounded-sm transition-all group/git"
                                  title="Inspect GitHub Source Code"
                                >
                                  <Github className="w-3.5 h-3.5 text-[#C5C7CC]" />
                                  <span>GitHub</span>
                                  <ArrowUpRight className="w-3 h-3 text-[#858997] group-hover/git:text-white transition-colors" />
                                </motion.a>
                              )}
                            </div>

                            <motion.button
                              whileHover={shouldReduceMotion ? {} : { y: -2 }}
                              whileTap={shouldReduceMotion ? {} : { y: 0 }}
                              onClick={() => onSelectProject(project)}
                              className="w-full min-h-[44px] inline-flex items-center justify-center gap-2.5 px-5 py-3 text-xs uppercase font-mono tracking-wider font-medium text-[#C5C7CC] hover:text-[#F1F0EC] border border-white/10 hover:border-white/25 rounded-sm bg-transparent hover:bg-white/[0.03] transition-all"
                            >
                              <span>Read Technical Case Study</span>
                              <BookOpen className="w-3.5 h-3.5" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Layout Variant 2 & 3: Asymmetric Alternating Split (Projects 1, 2, 3) */
                    <div className="p-6 sm:p-10 lg:p-14">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                        {/* Media Column (Alternates order on desktop, stacks on mobile) */}
                        <div className={`lg:col-span-7 ${isAlternating ? 'lg:order-2' : 'lg:order-1'}`}>
                          <div
                            onClick={() => onSelectProject(project)}
                            className="relative cursor-pointer overflow-hidden rounded-sm border border-white/10 bg-[#090A0C] aspect-video group/img shadow-xl ring-1 ring-white/5"
                          >
                            <motion.img
                              whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                              src={project.image}
                              alt={`${project.title} Screenshot Preview`}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover object-center filter contrast-[1.05]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover/img:opacity-40 transition-opacity" />

                            <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 flex items-center justify-between text-xs font-mono text-[#F1F0EC]">
                              <span className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/10 text-xs">
                                <BookOpen className="w-3.5 h-3.5 text-[#C5C7CC]" />
                                <span>Inspect Case Study</span>
                              </span>
                              <span className="bg-black/80 backdrop-blur-md px-2.5 py-1.5 rounded-sm border border-white/10 font-mono text-[11px] text-[#858997]">
                                {project.year}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Content & Contribution Column */}
                        <div className={`lg:col-span-5 space-y-6 ${isAlternating ? 'lg:order-1' : 'lg:order-2'}`}>
                          {/* Zero-Pill Clean Metadata */}
                          <div className="flex items-center gap-2.5 text-xs font-mono text-[#858997] tracking-wider uppercase">
                            <span className="text-[#F1F0EC] font-semibold">PROJECT 0{idx + 1}</span>
                            <span aria-hidden="true" className="text-white/20">/</span>
                            <span>{project.category}</span>
                            <span aria-hidden="true" className="text-white/20">/</span>
                            <span>{project.year}</span>
                          </div>

                          <div className="space-y-2">
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#F1F0EC] group-hover:text-white transition-colors leading-[1.15]">
                              {project.title}
                            </h3>
                            <p className="text-sm sm:text-base font-serif italic font-light text-[#C5C7CC]">
                              {project.subtitle}
                            </p>
                            <p className="text-xs sm:text-sm text-[#858997] leading-[1.8] font-light pt-1">
                              {project.summary}
                            </p>
                          </div>

                          {/* My Contributions Highlights */}
                          <div className="space-y-2.5 pt-2 border-t border-white/[0.06]">
                            <span className="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#F1F0EC]">
                              Key Contributions:
                            </span>
                            <div className="space-y-2">
                              {project.myContributions.slice(0, 3).map((contrib, cIdx) => (
                                <div key={cIdx} className="flex items-start gap-2.5 text-xs text-[#C5C7CC] font-light leading-[1.65]">
                                  <span className="font-mono text-xs text-[#858997] mt-0.5">•</span>
                                  <span>{contrib}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Metrics Strip */}
                          <div className="grid grid-cols-2 gap-4 py-3 border-y border-white/[0.06] text-xs font-mono">
                            {project.metrics.slice(0, 2).map((m, mIdx) => (
                              <div key={mIdx} className="space-y-0.5">
                                <span className="block text-xl sm:text-2xl font-serif text-[#F1F0EC] tabular-nums font-normal">
                                  {m.value}
                                </span>
                                <span className="text-[#858997] text-[10px] uppercase tracking-wider block">
                                  {m.label}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Tech Stack List */}
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[#858997]">
                            {project.techStack.map((tech, tIdx) => (
                              <span key={tech} className="flex items-center gap-2">
                                <span className="text-[#C5C7CC]">{tech}</span>
                                {tIdx < project.techStack.length - 1 && (
                                  <span aria-hidden="true" className="text-white/20">·</span>
                                )}
                              </span>
                            ))}
                          </div>

                          {/* Action Buttons Hub (Responsive Touch Targets) */}
                          <div className="flex flex-wrap items-center gap-3 pt-2">
                            {project.liveUrl && (
                              <motion.a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                                whileTap={shouldReduceMotion ? {} : { y: 0 }}
                                className="min-h-[44px] flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold text-[#090A0C] bg-[#F1F0EC] hover:bg-white rounded-sm transition-all shadow-sm"
                              >
                                <span>Live Demo</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </motion.a>
                            )}

                            {project.githubUrl && (
                              <motion.a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                                whileTap={shouldReduceMotion ? {} : { y: 0 }}
                                className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono text-[#C5C7CC] hover:text-[#F1F0EC] border border-white/10 hover:border-white/25 rounded-sm bg-[#14161A] transition-colors"
                                title="Inspect Source Code on GitHub"
                              >
                                <Github className="w-3.5 h-3.5" />
                                <span>GitHub</span>
                              </motion.a>
                            )}

                            <motion.button
                              whileHover={shouldReduceMotion ? {} : { y: -2 }}
                              whileTap={shouldReduceMotion ? {} : { y: 0 }}
                              onClick={() => onSelectProject(project)}
                              className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono text-[#858997] hover:text-[#F1F0EC] transition-colors"
                            >
                              <span>Case Study</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
