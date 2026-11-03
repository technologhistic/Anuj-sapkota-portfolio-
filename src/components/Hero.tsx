import React from 'react';
import { FileDown, ExternalLink } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import anujPortrait from '../assets/images/anuj_sapkota_portrait.png';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="hero" className="relative pt-36 pb-28 md:pt-48 md:pb-36 lg:pt-56 lg:pb-44 border-b border-black/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Editorial Kicker & Status */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-between gap-4 mb-14 text-xs font-mono text-[#716B61] tracking-[0.2em] uppercase border-b border-black/[0.06] pb-6"
        >
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span>Kathmandu, Nepal</span>
            <span aria-hidden="true" className="text-black/20">/</span>
            <span>27.7172° N, 85.3240° E</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2 text-[#24231F] font-medium tracking-normal"><span className="h-2 w-2 rounded-full bg-[#8B5E34]" aria-hidden="true" />Open to opportunities</span>
          </div>
        </motion.div>

        {/* Split Hero: Left Column Typography, Right Column Large Editorial Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-stretch mb-28 md:mb-36">
          {/* Left Column (7 cols): Typography, Identity, Core Actions */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Grand Wordmark with Cinematic Reveals */}
              <div className="mb-10 overflow-hidden">
                <motion.span
                  initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-[11px] uppercase tracking-[0.3em] font-mono text-[#716B61] mb-4"
                >
                  FRONTEND ENGINEERING · INTERFACE DESIGN
                </motion.span>

                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-normal text-[#24231F] tracking-[-0.035em] leading-[0.92]"
                  >
                    ANUJ <br />
                    <motion.span
                      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 35 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block italic font-light text-[#5C5952] tracking-[-0.02em]"
                    >
                      SAPKOTA
                    </motion.span>
                  </motion.h1>
                </div>
              </div>

              {/* Title & Domain */}
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs md:text-sm font-mono text-[#716B61] mb-10 md:mb-12 pb-6 md:pb-8 border-b border-black/[0.08]"
              >
                <span className="text-[#24231F] font-medium tracking-wider uppercase">
                  {PERSONAL_INFO.title}
                </span>
                <span aria-hidden="true" className="text-black/20">/</span>
                <a
                  href={`https://${PERSONAL_INFO.domain}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#5C5952] hover:text-[#24231F] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>{PERSONAL_INFO.domain}</span>
                  <ExternalLink className="w-3 h-3 text-[#716B61]" />
                </a>
              </motion.div>

              {/* Headline & Editorial Lead with Staggered Fade */}
              <div className="space-y-6 max-w-2xl mb-10 md:mb-14">
                <motion.h2
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#24231F] leading-[1.2] font-normal tracking-[-0.025em]"
                >
                  Thoughtful interfaces, built to <span className="italic font-light text-[#8B5E34]">work beautifully</span>.
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-xl text-base sm:text-lg text-[#5C5952] leading-[1.8]"
                >
                  I build clear, responsive web experiences with React and TypeScript.
                </motion.p>
              </div>
            </div>

            {/* View résumé action */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-5 pt-4 sm:pt-6"
            >
              <motion.button
                onClick={onOpenResume}
                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                whileTap={shouldReduceMotion ? {} : { y: 0 }}
                transition={{ duration: 0.15 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 min-h-[44px] text-xs uppercase tracking-wider font-mono font-medium bg-[#24231F] text-[#FFFFFF] hover:bg-[#8B5E34] border border-[#24231F] hover:border-[#8B5E34] transition-all rounded-md shadow-sm group"
              >
                <FileDown className="w-3.5 h-3.5 text-[#FFFFFF] transition-colors" />
                <span>View résumé</span>
              </motion.button>

              <motion.a
                href="#contact"
                whileHover={shouldReduceMotion ? {} : { x: 3 }}
                transition={{ duration: 0.15 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-4 text-xs uppercase tracking-wider font-mono font-medium text-[#716B61] hover:text-[#24231F] transition-colors"
              >
                <span>Get in touch</span>
                <span aria-hidden="true">→</span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column (5 cols): Large Architectural Editorial Portrait Frame */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Ambient Silver Backlight Glow */}
            <motion.div
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full"
            >
              <div
                className="absolute -inset-1 bg-gradient-to-b from-[#5C5952]/20 via-[#FFFFFF]/40 to-transparent blur-2xl -z-10 rounded-md opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                aria-hidden="true"
              />

              <div className="group relative w-full bg-[#FFFFFF] border border-black/10 p-2 sm:p-3 rounded-lg shadow-[0_18px_50px_-30px_rgba(36,35,31,0.35)]">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#050608] rounded-md">
                  <motion.img
                    initial={{ scale: shouldReduceMotion ? 1 : 1.03, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    src={anujPortrait}
                    alt="Anuj Sapkota, frontend developer in Kathmandu, Nepal"
                    decoding="async"
                    fetchPriority="high"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 px-2 pt-4 pb-2">
                  <div>
                    <p className="font-serif text-lg text-[#24231F]">Anuj Sapkota</p>
                    <p className="text-xs text-[#716B61]">Frontend developer</p>
                  </div>
                  <span className="text-[10px] font-mono tracking-[0.14em] uppercase text-[#8B5E34]">Kathmandu, Nepal</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};
