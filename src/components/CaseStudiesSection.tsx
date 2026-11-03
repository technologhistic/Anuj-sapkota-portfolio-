import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Check, Copy, ArrowUpRight, Cpu, Layers, Zap, Terminal } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

export const CaseStudiesSection: React.FC = () => {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const currentProject = PROJECTS[selectedCaseIdx];
  const { caseStudy } = currentProject;

  const handleCopyCode = () => {
    if (caseStudy.codeSnippet) {
      navigator.clipboard.writeText(caseStudy.codeSnippet.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <section id="case-studies" className="py-32 md:py-40 lg:py-48 border-b border-white/[0.06] bg-[#0E1013]/60 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20 pb-8 border-b border-white/[0.08]"
        >
          <span className="block text-[11px] uppercase font-mono tracking-[0.25em] text-[#858997] mb-3">
            CHAPTER 02 // TECHNICAL RETROSPECTIVES
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#F1F0EC] tracking-tight leading-[1.1] mb-5">
            System <span className="italic font-light text-[#C5C7CC]">Architecture</span> &amp; Case Studies
          </h2>
          <p className="text-base sm:text-lg text-[#858997] max-w-2xl font-light leading-[1.8]">
            In-depth engineering analyses on offscreen state buffers, sub-millisecond render loops, mathematical token calculus, and performance benchmarks.
          </p>
        </motion.div>

        {/* Case Study Selector Tabs with Smooth Active State */}
        <div className="flex flex-wrap gap-2.5 mb-12 pb-6 border-b border-white/[0.06]">
          {PROJECTS.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => {
                setSelectedCaseIdx(idx);
                setCopiedCode(false);
              }}
              className={`relative px-5 py-3 text-xs font-mono transition-colors rounded-sm text-left flex items-center gap-2.5 border ${
                selectedCaseIdx === idx
                  ? 'text-[#F1F0EC] border-white/20 font-medium'
                  : 'bg-transparent text-[#858997] border-transparent hover:text-[#C5C7CC] hover:bg-white/[0.02]'
              }`}
            >
              {selectedCaseIdx === idx && (
                <motion.div
                  layoutId={shouldReduceMotion ? undefined : 'activeCaseStudyTab'}
                  className="absolute inset-0 bg-[#14161A] rounded-sm z-0 shadow-md"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 text-[11px] text-[#858997]">0{idx + 1}.</span>
              <span className="relative z-10">{proj.title}</span>
            </button>
          ))}
        </div>

        {/* Selected Case Study Body Container with Smooth Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#14161A]/80 border border-white/10 rounded-sm p-8 sm:p-12 lg:p-16 space-y-16 shadow-2xl"
          >
            {/* Header & Meta */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-10 border-b border-white/[0.08]">
              <div className="space-y-3 max-w-3xl">
                <div className="flex items-center gap-2.5 text-xs font-mono text-[#858997] tracking-wider uppercase">
                  <span className="text-[#F1F0EC] font-semibold">RETROSPECTIVE 0{selectedCaseIdx + 1}</span>
                  <span aria-hidden="true" className="text-white/20">/</span>
                  <span>{currentProject.category}</span>
                  <span aria-hidden="true" className="text-white/20">/</span>
                  <span>{currentProject.year}</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-serif text-[#F1F0EC] leading-tight">
                  {currentProject.title}: <span className="italic font-light text-[#C5C7CC]">{currentProject.subtitle}</span>
                </h3>
                <p className="text-base text-[#C5C7CC] font-light leading-[1.8] pt-2">
                  {caseStudy.overview}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {currentProject.liveUrl && (
                  <motion.a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={shouldReduceMotion ? {} : { y: -2 }}
                    whileTap={shouldReduceMotion ? {} : { y: 0 }}
                    className="px-5 py-3 text-xs font-mono font-medium text-[#090A0C] bg-[#F1F0EC] hover:bg-white rounded-sm transition-all inline-flex items-center gap-2 shadow-sm"
                  >
                    <span>Launch Live</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </motion.a>
                )}
              </div>
            </div>

            {/* Two-Column Problem vs Solution Analysis with Generous Padding */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-4 p-8 bg-[#090A0C]/70 border border-white/[0.06] rounded-sm hover:border-white/15 transition-colors">
                <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-rose-400">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>The Engineering Challenge</span>
                </span>
                <p className="text-sm sm:text-base text-[#C5C7CC] leading-[1.8] font-light">
                  {caseStudy.challenge}
                </p>
              </div>

              <div className="space-y-4 p-8 bg-[#090A0C]/70 border border-white/[0.06] rounded-sm hover:border-white/15 transition-colors">
                <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-emerald-400">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Engineered Resolution</span>
                </span>
                <p className="text-sm sm:text-base text-[#C5C7CC] leading-[1.8] font-light">
                  {caseStudy.solution}
                </p>
              </div>
            </div>

            {/* Architectural Breakdown */}
            <div className="space-y-6">
              <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F1F0EC] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#858997]" />
                <span>Architectural Invariants &amp; Data Pipeline</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {caseStudy.architecture.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-[#090A0C]/40 border border-white/[0.05] rounded-sm flex items-start gap-3.5 hover:border-white/15 hover:bg-[#090A0C]/60 transition-all"
                  >
                    <span className="font-mono text-xs text-[#858997] mt-0.5">
                      0{idx + 1}.
                    </span>
                    <span className="text-xs sm:text-sm text-[#C5C7CC] leading-[1.7] font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Table */}
            {caseStudy.performanceHighlights && caseStudy.performanceHighlights.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F1F0EC] flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#858997]" />
                    <span>Performance Optimization Ledger</span>
                  </h4>
                  <span className="text-xs font-mono text-[#858997]">Measured on Mobile &amp; Desktop</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono border border-white/[0.08] bg-[#090A0C]/50">
                    <thead>
                      <tr className="border-b border-white/[0.08] text-[#858997] uppercase tracking-wider">
                        <th className="py-4 px-6">Metric</th>
                        <th className="py-4 px-6">Standard / Baseline</th>
                        <th className="py-4 px-6 text-[#F1F0EC]">Engineered Outcome</th>
                        <th className="py-4 px-6">Optimization Mechanism</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.05]">
                      {caseStudy.performanceHighlights.map((row, idx) => (
                        <tr key={idx} className="text-[#C5C7CC] hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 px-6 font-medium text-[#F1F0EC]">{row.metric}</td>
                          <td className="py-4 px-6 text-[#858997] tabular-nums">{row.before || '—'}</td>
                          <td className="py-4 px-6 text-[#F1F0EC] font-semibold tabular-nums">{row.after}</td>
                          <td className="py-4 px-6 text-[#858997] font-light">{row.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Interactive Code Walkthrough */}
            {caseStudy.codeSnippet && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs font-mono text-[#858997]">
                    <Terminal className="w-3.5 h-3.5 text-[#C5C7CC]" />
                    <span className="text-[#F1F0EC] font-medium">{caseStudy.codeSnippet.filename}</span>
                    <span>({caseStudy.codeSnippet.language})</span>
                  </div>
                  <motion.button
                    whileHover={shouldReduceMotion ? {} : { y: -1 }}
                    whileTap={shouldReduceMotion ? {} : { y: 0 }}
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono text-[#C5C7CC] hover:text-[#F1F0EC] border border-white/10 hover:border-white/20 rounded-sm bg-[#090A0C] transition-colors shadow-sm"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Snippet</span>
                      </>
                    )}
                  </motion.button>
                </div>

                <div className="bg-[#090A0C] border border-white/10 rounded-sm p-6 overflow-x-auto text-xs font-mono text-[#C5C7CC] leading-[1.8] shadow-inner">
                  <pre>{caseStudy.codeSnippet.code}</pre>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
