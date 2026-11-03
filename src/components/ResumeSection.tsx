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
    <section id="resume" className="py-32 md:py-40 lg:py-48 border-b border-black/[0.06] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-24 pb-8 border-b border-black/[0.08]"
        >
          <span className="block text-[11px] uppercase font-mono tracking-[0.25em] text-[#716B61] mb-3">
            05 / RÉSUMÉ
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#24231F] tracking-tight leading-[1.1]">
            Curriculum <span className="italic font-light text-[#5C5952]">Vitae</span> &amp; Credentials
          </h2>
        </motion.div>

        {/* Action Showcase Card with Generous Padding & Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#FFFFFF]/70 border border-black/10 rounded-md p-10 sm:p-14 lg:p-16 relative overflow-hidden shadow-[0_24px_60px_-36px_rgba(36,35,31,0.32)] hover:border-black/20 transition-colors"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Description Column */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-2.5 text-xs font-mono text-[#716B61] tracking-wider uppercase">
                <ShieldCheck className="w-4 h-4 text-[#24231F]" />
                <span className="text-[#24231F] font-semibold">ATS-OPTIMIZED SPECIFICATION</span>
                <span aria-hidden="true" className="text-black/20">/</span>
                <span>PRINT-READY FORMAT</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-serif text-[#24231F] leading-tight">
                Education, skills and recognition
              </h3>

              <p className="text-base sm:text-lg text-[#5C5952] font-light leading-[1.85] max-w-2xl">
                A concise overview of my education, technical skills, and achievements, formatted for viewing or printing.
              </p>

              {/* Highlights List with Generous Spacing */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-[#716B61]">
                <div className="flex items-center gap-2.5">
                  <span className="text-[#24231F]">✓</span>
                  <span>Education and coursework</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#24231F]">✓</span>
                  <span>Technical skills</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#24231F]">✓</span>
                  <span>Achievements and recognition</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#24231F]">✓</span>
                  <span>Print-ready layout</span>
                </div>
              </div>
            </div>

            {/* Right Action Column */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <motion.button
                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                whileTap={shouldReduceMotion ? {} : { y: 0 }}
                onClick={onOpenResumeModal}
                className="w-full inline-flex items-center justify-center gap-3 px-7 py-4 text-xs uppercase font-mono tracking-wider font-semibold text-[#F6F3EC] bg-[#24231F] hover:bg-[#8B5E34] rounded-md transition-all shadow-md group"
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
                className="w-full inline-flex items-center justify-center gap-2.5 px-7 py-4 text-xs uppercase font-mono tracking-wider font-medium text-[#24231F] bg-[#F6F3EC] hover:bg-[#EEE9DF] border border-black/10 hover:border-black/20 rounded-md transition-all shadow-sm"
              >
                <Printer className="w-4 h-4 text-[#5C5952]" />
                <span>Instant Print / PDF</span>
              </motion.button>

              <button
                onClick={handleCopyEmail}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-mono text-[#716B61] hover:text-[#24231F] transition-colors"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[#24231F]">Email Copied to Clipboard</span>
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
