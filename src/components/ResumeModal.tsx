import React, { useState } from 'react';
import { X, Printer, Download, Copy, Check, FileText, ExternalLink, Mail, MapPin } from 'lucide-react';
import { PERSONAL_INFO, SKILL_CATEGORIES, EDUCATION, ACHIEVEMENTS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const resumeText = `ANUJ SAPKOTA
Frontend Developer / Aspiring Software Engineer
Email: ${PERSONAL_INFO.email}
Portfolio: https://${PERSONAL_INFO.domain}
Location: ${PERSONAL_INFO.location}
GitHub: ${PERSONAL_INFO.socials.github}
LinkedIn: ${PERSONAL_INFO.socials.linkedin}

PROFESSIONAL SUMMARY
${PERSONAL_INFO.bioLead}
${PERSONAL_INFO.bioExtended}

EDUCATION
${EDUCATION[0].degree}
${EDUCATION[0].institution}, ${EDUCATION[0].location} (${EDUCATION[0].period})
Grade: ${EDUCATION[0].grade} | ${EDUCATION[0].honors}
Relevant Coursework: ${EDUCATION[0].coreCourses.join(', ')}

TECHNICAL SKILLS
${SKILL_CATEGORIES.map((c) => `${c.title}: ${c.skills.map((s) => s.name).join(', ')}`).join('\n')}

HONORS & ACHIEVEMENTS
${ACHIEVEMENTS.map((a) => `- ${a.title} (${a.year}): ${a.description}`).join('\n')}
`;

    navigator.clipboard.writeText(resumeText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#F6F3EC] border border-black/10 rounded-md shadow-[0_24px_60px_-36px_rgba(36,35,31,0.32)] overflow-hidden my-4 sm:my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header (Hidden in print) */}
        <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 sm:py-4 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-black/10 no-print">
          <div className="flex items-center gap-2 text-xs font-mono text-[#716B61]">
            <FileText className="w-4 h-4 text-[#24231F]" />
            <span className="text-[#24231F] font-medium">ANUJ_SAPKOTA_RESUME</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">ATS-Ready</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 min-h-[36px] text-xs font-mono text-[#5C5952] hover:text-[#24231F] border border-black/10 hover:border-black/20 rounded-md bg-[#F6F3EC] transition-colors"
              title="Copy plain-text summary"
            >
              {copiedText ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Copy Text</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 min-h-[36px] text-xs font-mono font-medium text-[#F6F3EC] bg-[#24231F] hover:bg-[#8B5E34] rounded-md transition-all shadow-sm"
              title="Print or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#5C5952] hover:text-[#8B5E34] border border-black/10 hover:border-black/25 rounded-md transition-colors"
              aria-label="Close résumé modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Container */}
        <div className="p-6 sm:p-14 max-h-[84vh] overflow-y-auto bg-[#EEE9DF] text-[#5C5952]">
          {/* Resume Paper Layout */}
          <div className="bg-[#FFFFFF] border border-black/10 p-8 sm:p-14 rounded-md space-y-10 font-sans shadow-[0_24px_60px_-36px_rgba(36,35,31,0.32)] print:border-none print:p-0 print:bg-white print:text-black">
            {/* Header Lockup */}
            <div className="border-b border-black/10 print:border-neutral-300 pb-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div className="space-y-1">
                  <h1
                    id="resume-title"
                    className="text-4xl sm:text-5xl font-serif text-[#24231F] print:text-black tracking-tight leading-tight"
                  >
                    {PERSONAL_INFO.name}
                  </h1>
                  <p className="text-xs sm:text-sm font-mono text-[#716B61] print:text-neutral-600 tracking-wider uppercase">
                    {PERSONAL_INFO.title}
                  </p>
                </div>

                <div className="text-left sm:text-right text-xs font-mono space-y-1.5 text-[#716B61] print:text-neutral-700">
                  <div className="flex items-center sm:justify-end gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#5C5952] print:text-neutral-500" />
                    <span>{PERSONAL_INFO.email}</span>
                  </div>
                  <div className="flex items-center sm:justify-end gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#5C5952] print:text-neutral-500" />
                    <span>{PERSONAL_INFO.location}</span>
                  </div>
                  <div className="pt-0.5">
                    <a
                      href={`https://${PERSONAL_INFO.domain}`}
                      className="text-[#24231F] print:text-neutral-900 underline font-medium"
                    >
                      {PERSONAL_INFO.domain}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-[#24231F] print:text-black border-b border-black/[0.08] print:border-neutral-300 pb-2">
                Executive Profile
              </h2>
              <p className="text-xs sm:text-sm text-[#5C5952] print:text-neutral-800 leading-[1.8] font-light">
                {PERSONAL_INFO.bioLead} {PERSONAL_INFO.bioExtended}
              </p>
            </div>

            {/* Technical Skills */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-[#24231F] print:text-black border-b border-black/[0.08] print:border-neutral-300 pb-2">
                Technical Competencies
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                {SKILL_CATEGORIES.map((cat) => (
                  <div key={cat.title} className="space-y-1">
                    <span className="text-[#24231F] print:text-black font-semibold block text-xs uppercase tracking-wider">
                      {cat.title}
                    </span>
                    <span className="text-[#716B61] print:text-neutral-700 text-xs leading-relaxed block font-light">
                      {cat.skills.map((s) => s.name).join(' · ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#24231F] print:text-black border-b border-black/[0.08] print:border-neutral-300 pb-1">
                Education
              </h2>
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <span className="font-semibold text-[#24231F] print:text-black">
                      {edu.degree}
                    </span>
                    <span className="font-mono text-[#716B61] print:text-neutral-600">
                      {edu.period}
                    </span>
                  </div>
                  <div className="text-[#5C5952] print:text-neutral-700">
                    {edu.institution}, {edu.location}
                  </div>
                  <div className="text-[11px] font-mono text-[#716B61] print:text-neutral-600">
                    Honors: {edu.grade} · {edu.honors}
                  </div>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#24231F] print:text-black border-b border-black/[0.08] print:border-neutral-300 pb-1">
                Honors &amp; Milestones
              </h2>
              <ul className="space-y-1.5 text-xs text-[#5C5952] print:text-neutral-800 list-disc list-inside">
                {ACHIEVEMENTS.map((a) => (
                  <li key={a.id}>
                    <span className="font-medium text-[#24231F] print:text-black">{a.title}</span>: {a.description} ({a.year})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
