import React from 'react';
import { GraduationCap, Award, BookOpen } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { EDUCATION } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="education" className="py-32 md:py-40 lg:py-48 border-b border-black/[0.06] relative">
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
            03 / EDUCATION
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#24231F] tracking-tight leading-[1.1]">
            Education &amp; <span className="italic font-light text-[#8B5E34]">Computer Science</span>
          </h2>
        </motion.div>

        {/* Education Timeline Card with Scroll Reveal & Hover Elevation */}
        <div className="space-y-12">
          {EDUCATION.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              whileHover={shouldReduceMotion ? {} : { y: -3 }}
              className="bg-[#FFFFFF]/60 border border-black/10 rounded-md p-8 sm:p-12 lg:p-16 space-y-12 shadow-[0_24px_60px_-36px_rgba(36,35,31,0.32)] hover:border-black/20 transition-colors"
            >
              {/* Header Zone */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 border-b border-black/[0.08] pb-10">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-2.5 text-xs font-mono text-[#716B61] tracking-wider uppercase">
                    <span className="text-[#24231F] font-semibold">{edu.period}</span>
                    <span aria-hidden="true" className="text-black/20">/</span>
                    <span>{edu.location}</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-serif text-[#24231F] leading-snug">
                    {edu.degree}
                  </h3>
                  <p className="text-base sm:text-lg text-[#5C5952] font-light">
                    {edu.institution}
                  </p>
                </div>

                <div className="text-left md:text-right flex flex-col md:items-end justify-center space-y-2">
                  <span className="inline-flex items-center gap-2 text-xs font-mono text-[#24231F] bg-[#F6F3EC] border border-black/10 px-4 py-2 rounded-md shadow-sm">
                    <Award className="w-4 h-4 text-[#5C5952]" />
                    <span>{edu.grade}</span>
                  </span>
                  <span className="text-xs font-mono text-[#716B61] block">
                    {edu.honors}
                  </span>
                </div>
              </div>

              {/* Core Computer Science Coursework */}
              <div className="space-y-6">
                <span className="block text-xs font-mono uppercase tracking-[0.2em] text-[#716B61] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#5C5952]" />
                  <span>Key Theoretical &amp; Applied Disciplines</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {edu.coreCourses.map((course) => (
                    <motion.div
                      key={course}
                      whileHover={shouldReduceMotion ? {} : { y: -2 }}
                      transition={{ duration: 0.15 }}
                      className="p-4 bg-[#F6F3EC]/60 border border-black/[0.05] rounded-md text-xs font-mono text-[#5C5952] leading-[1.6] hover:border-black/15 hover:text-[#24231F] transition-all"
                    >
                      {course}
                    </motion.div>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
