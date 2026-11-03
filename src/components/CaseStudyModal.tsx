import React, { useState } from 'react';
import { X, Check, Copy, ArrowUpRight, Github, ExternalLink, Activity, Layers, Zap } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.caseStudy.codeSnippet) {
      navigator.clipboard.writeText(project.caseStudy.codeSnippet.code);
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 lg:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#090A0C] border border-white/10 rounded-sm shadow-2xl overflow-hidden my-4 sm:my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-5 bg-[#14161A]/95 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono text-[#858997] tracking-wider uppercase">
            <span className="text-[#F1F0EC] font-semibold">
              CASE STUDY
            </span>
            <span aria-hidden="true" className="text-white/20">/</span>
            <span>{project.category}</span>
            <span aria-hidden="true" className="text-white/20">/</span>
            <span>{project.year}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center text-[#C5C7CC] hover:text-white border border-white/10 hover:border-white/30 rounded-sm transition-colors"
            aria-label="Close case study modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content with Generous Padding */}
        <div className="p-5 sm:p-12 lg:p-16 space-y-10 sm:space-y-14 max-h-[82vh] overflow-y-auto">
          {/* Title Lockup */}
          <div className="space-y-3">
            <h2
              id="case-study-title"
              className="text-4xl sm:text-5xl font-serif text-[#F1F0EC] leading-tight"
            >
              {project.title}
            </h2>
            <p className="text-lg sm:text-xl font-serif italic text-[#C5C7CC] font-light leading-relaxed">
              {project.subtitle}
            </p>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/[0.08]">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-medium text-[#090A0C] bg-[#F1F0EC] hover:bg-white rounded-sm transition-all shadow-sm"
                >
                  <span>Launch Live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-[#F1F0EC] bg-[#14161A] hover:bg-[#1D2026] border border-white/10 rounded-sm transition-all"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Inspect Source</span>
                </a>
              )}
            </div>
          </div>

          {/* Banner Preview Visual */}
          {project.image && (
            <div className="relative rounded-sm overflow-hidden border border-white/10 bg-[#14161A] shadow-lg">
              <img
                src={project.image}
                alt={`${project.title} detailed visual`}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[440px] object-cover"
              />
            </div>
          )}

          {/* Executive Overview */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 border-b border-white/[0.08] pb-12">
            <div className="md:col-span-4 space-y-1">
              <span className="block text-[11px] uppercase font-mono tracking-[0.2em] text-[#858997]">
                CONTEXT &amp; OBJECTIVES
              </span>
              <h3 className="text-2xl font-serif text-[#F1F0EC]">The Problem Space</h3>
            </div>
            <div className="md:col-span-8 space-y-5 text-base text-[#C5C7CC] leading-[1.85] font-light">
              <p>{project.caseStudy.overview}</p>
              <div className="bg-[#14161A] p-6 border border-white/[0.07] rounded-sm space-y-2">
                <span className="block text-xs font-mono uppercase tracking-wider text-[#F1F0EC]">
                  Core Engineering Challenge:
                </span>
                <p className="text-sm text-[#858997] leading-[1.75] font-light">{project.caseStudy.challenge}</p>
              </div>
            </div>
          </div>

          {/* Architecture & Engineering Decisions */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 border-b border-white/[0.08] pb-12">
            <div className="md:col-span-4 space-y-1">
              <span className="block text-[11px] uppercase font-mono tracking-[0.2em] text-[#858997]">
                SYSTEM DESIGN
              </span>
              <h3 className="text-2xl font-serif text-[#F1F0EC]">Technical Solution</h3>
            </div>
            <div className="md:col-span-8 space-y-6">
              <p className="text-base text-[#C5C7CC] leading-[1.85] font-light">
                {project.caseStudy.solution}
              </p>
              <div className="space-y-3 pt-2">
                <span className="block text-xs font-mono uppercase tracking-[0.18em] text-[#858997]">
                  Architectural Pillars:
                </span>
                <ul className="space-y-3">
                  {project.caseStudy.architecture.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3.5 text-sm text-[#C5C7CC] font-light leading-[1.7]">
                      <span className="font-mono text-xs text-[#858997] mt-0.5">0{idx + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Performance Benchmarks Table */}
          {project.caseStudy.performanceHighlights && project.caseStudy.performanceHighlights.length > 0 && (
            <div className="border-b border-white/[0.08] pb-12 space-y-6">
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-[#F1F0EC]" />
                <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#F1F0EC]">
                  Performance Benchmarking &amp; Impact
                </h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono border border-white/[0.08] bg-[#14161A]/50">
                  <thead>
                    <tr className="border-b border-white/[0.08] text-[#858997] uppercase tracking-wider">
                      <th className="py-4 px-6">Metric</th>
                      <th className="py-4 px-6">Baseline</th>
                      <th className="py-4 px-6 text-[#F1F0EC]">Optimized</th>
                      <th className="py-4 px-6">Intervention Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.05]">
                    {project.caseStudy.performanceHighlights.map((row, idx) => (
                      <tr key={idx} className="text-[#C5C7CC]">
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

          {/* Interactive Code Snippet Walkthrough */}
          {project.caseStudy.codeSnippet && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs font-mono text-[#858997]">
                  <Layers className="w-3.5 h-3.5" />
                  <span className="text-[#F1F0EC] font-medium">{project.caseStudy.codeSnippet.filename}</span>
                  <span>({project.caseStudy.codeSnippet.language})</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#C5C7CC] hover:text-[#F1F0EC] border border-white/10 hover:border-white/20 rounded-sm bg-[#14161A] transition-colors"
                >
                  {copiedSnippet ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-[#14161A] border border-white/10 rounded-sm p-6 overflow-x-auto text-xs font-mono text-[#C5C7CC] leading-[1.8]">
                <pre>{project.caseStudy.codeSnippet.code}</pre>
              </div>
            </div>
          )}

          {/* Tech Stack Breakdown */}
          <div className="pt-6 border-t border-white/[0.08] space-y-3">
            <span className="block text-[11px] font-mono uppercase tracking-[0.2em] text-[#858997]">
              Technologies &amp; Standards Utilized
            </span>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-[#C5C7CC]">
              {project.techStack.map((tech, index) => (
                <span key={tech} className="flex items-center gap-2.5">
                  <span>{tech}</span>
                  {index < project.techStack.length - 1 && (
                    <span aria-hidden="true" className="text-white/20">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-8 py-5 bg-[#14161A]/95 border-t border-white/10 text-xs font-mono text-[#858997]">
          <span>{project.caseStudy.impact}</span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-medium text-[#090A0C] bg-[#F1F0EC] hover:bg-white rounded-sm transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
