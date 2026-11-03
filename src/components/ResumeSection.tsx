import React, { useState } from 'react';
import { FileDown, Printer, Copy, Check, Eye, ExternalLink, ShieldCheck } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ResumeSectionProps {
  onOpenResumeModal: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenResumeModal }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="resume" className="py-32 md:py-40 lg:py-48 border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-24 pb-8 border-b border-white/[0.08]"
        >
          <span className="block text-[11px] uppercase font-mono tracking-[0.25em] text-[#858997] mb-3">
            CHAPTER 07 // CURRICULUM VITAE
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#F1F0EC] tracking-tight leading-[1.1]">
            Curriculum <span className="italic font-light text-[#C5C7CC]">Vitae</span> &amp; Credentials
          </h2>
        </motion.div>

        {/* Action Showcase Card with Generous Padding & Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#14161A]/70 border border-white/10 rounded-sm p-10 sm:p-14 lg:p-16 relative overflow-hidden shadow-2xl hover:border-white/20 transition-colors"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Description Column */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-2.5 text-xs font-mono text-[#858997] tracking-wider uppercase">
                <ShieldCheck className="w-4 h-4 text-[#F1F0EC]" />
                <span className="text-[#F1F0EC] font-semibold">ATS-OPTIMIZED SPECIFICATION</span>
                <span aria-hidden="true" className="text-white/20">/</span>
                <span>2025 REVISION</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-serif text-[#F1F0EC] leading-tight">
                Engineering Experience, System Architecture &amp; Credentials
              </h3>

              <p className="text-base sm:text-lg text-[#C5C7CC] font-light leading-[1.85] max-w-2xl">
                A single-page, ATS-optimized engineering curriculum vitae outlining core competencies in TypeScript, Next.js, performance profiling, academic coursework, and hackathon milestones.
              </p>

              {/* Highlights List with Generous Spacing */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-[#858997]">
                <div className="flex items-center gap-2.5">
                  <span className="text-[#F1F0EC]">✓</span>
                  <span>Parser &amp; screen-reader accessible</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#F1F0EC]">✓</span>
                  <span>Verifiable capstone &amp; honors</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#F1F0EC]">✓</span>
                  <span>Zero bloatware clean PDF render</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#F1F0EC]">✓</span>
                  <span>Direct recruiter summary available</span>
                </div>
              </div>
            </div>

            {/* Right Action Column */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <motion.button
                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                whileTap={shouldReduceMotion ? {} : { y: 0 }}
                onClick={onOpenResumeModal}
                className="w-full inline-flex items-center justify-center gap-3 px-7 py-4 text-xs uppercase font-mono tracking-wider font-semibold text-[#090A0C] bg-[#F1F0EC] hover:bg-white rounded-sm transition-all shadow-md group"
              >
                <Eye className="w-4 h-4" />
                <span>View &amp; Print Résumé</span>
              </motion.button>

              <motion.button
                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                whileTap={shouldReduceMotion ? {} : { y: 0 }}
                onClick={() => {
                  onOpenResumeModal();
                  setTimeout(() => window.print(), 300);
                }}
                className="w-full inline-flex items-center justify-center gap-2.5 px-7 py-4 text-xs uppercase font-mono tracking-wider font-medium text-[#F1F0EC] bg-[#090A0C] hover:bg-[#1A1D24] border border-white/10 hover:border-white/20 rounded-sm transition-all shadow-sm"
              >
                <Printer className="w-4 h-4 text-[#C5C7CC]" />
                <span>Instant Print / PDF</span>
              </motion.button>

              <button
                onClick={handleCopyEmail}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-mono text-[#858997] hover:text-[#F1F0EC] transition-colors"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[#F1F0EC]">Email Copied to Clipboard</span>
                  </>
                ) : (
                  <span>Copy Direct Contact Email</span>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
