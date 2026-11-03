import React from 'react';
import { Trophy, Code, BookOpen, Award, CheckCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ACHIEVEMENTS } from '../data/portfolioData';

export const AchievementsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="achievements" className="py-32 md:py-40 lg:py-48 border-b border-white/[0.06] relative bg-[#0E1013]/40">
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
            CHAPTER 06 // VERIFIABLE MILESTONES
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#F1F0EC] tracking-tight leading-[1.1]">
            Honors &amp; <span className="italic font-light text-[#C5C7CC]">Accreditations</span>
          </h2>
        </motion.div>

        {/* 2-Column Grid with Scroll Stagger & Hover Micro-Lift */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {ACHIEVEMENTS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              className="bg-[#14161A]/60 border border-white/[0.08] p-8 sm:p-10 lg:p-12 rounded-sm space-y-6 hover:border-white/20 transition-all flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-4">
                {/* Clean unboxed metadata (§1.A Rule) */}
                <div className="flex items-center justify-between text-xs font-mono text-[#858997] tracking-wider uppercase">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[#F1F0EC] font-semibold">HONOR 0{idx + 1}</span>
                    <span aria-hidden="true" className="text-white/20">/</span>
                    <span>{item.category}</span>
                  </div>
                  <span>{item.year}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif text-[#F1F0EC] leading-snug">
                  {item.title}
                </h3>
                <span className="block text-xs font-mono text-[#C5C7CC] uppercase tracking-wider">
                  {item.issuer}
                </span>

                <p className="text-sm sm:text-base text-[#858997] font-light leading-[1.8]">
                  {item.description}
                </p>
              </div>

              {item.metric && (
                <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#858997] uppercase tracking-wider">VERIFIED IMPACT</span>
                  <span className="text-[#F1F0EC] font-medium">{item.metric}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
