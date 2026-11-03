import React, { useState, useEffect } from 'react';
import { ArrowDown, FileDown, ExternalLink, MapPin, Clock, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import anujPortrait from '../assets/images/anuj_sapkota_portrait.png';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [kathmanduTime, setKathmanduTime] = useState<string>('');
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kathmandu',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
        setKathmanduTime(timeStr);
      } catch {
        setKathmanduTime('NPT (UTC+5:45)');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Motion variants for cinematic text reveals
  const transitionConfig = {
    duration: shouldReduceMotion ? 0 : 0.85,
    ease: [0.16, 1, 0.3, 1],
  };

  return (
    <section id="hero" className="relative pt-36 pb-28 md:pt-48 md:pb-36 lg:pt-56 lg:pb-44 border-b border-white/[0.06] overflow-hidden">
      {/* Subtle ambient architectural background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Editorial Kicker & Status */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-between gap-4 mb-14 text-xs font-mono text-[#858997] tracking-[0.2em] uppercase border-b border-white/[0.06] pb-6"
        >
          <div className="flex items-center gap-2.5">
            <span>Kathmandu, Nepal</span>
            <span aria-hidden="true" className="text-white/20">/</span>
            <span>27.7172° N, 85.3240° E</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-[#C5C7CC]">
              <Clock className="w-3.5 h-3.5 text-[#858997]" />
              <span className="tabular-nums font-mono">{kathmanduTime || 'Loading...'} NPT</span>
            </span>
            <span aria-hidden="true" className="text-white/20">|</span>
            <span className="text-[#F1F0EC] font-medium tracking-normal">Available for Opportunities</span>
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
                  className="block text-[11px] uppercase tracking-[0.3em] font-mono text-[#858997] mb-4"
                >
                  CHAPTER 00 // IDENTITY
                </motion.span>

                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-normal text-[#F1F0EC] tracking-[-0.035em] leading-[0.92]"
                  >
                    ANUJ <br />
                    <motion.span
                      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 35 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block italic font-light text-[#C5C7CC] tracking-[-0.02em]"
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
                className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs md:text-sm font-mono text-[#858997] mb-10 md:mb-12 pb-6 md:pb-8 border-b border-white/[0.08]"
              >
                <span className="text-[#F1F0EC] font-medium tracking-wider uppercase">
                  {PERSONAL_INFO.title}
                </span>
                <span aria-hidden="true" className="text-white/20">/</span>
                <a
                  href={`https://${PERSONAL_INFO.domain}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#C5C7CC] hover:text-[#F1F0EC] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>{PERSONAL_INFO.domain}</span>
                  <ExternalLink className="w-3 h-3 text-[#858997]" />
                </a>
              </motion.div>

              {/* Headline & Editorial Lead with Staggered Fade */}
              <div className="space-y-6 max-w-2xl mb-10 md:mb-14">
                <motion.h2
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#F1F0EC] leading-[1.2] font-normal tracking-[-0.025em]"
                >
                  Building digital experiences with <span className="italic font-light text-[#C5C7CC]">purpose</span>.
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="text-base sm:text-lg text-[#C5C7CC] leading-[1.85] font-light"
                >
                  {PERSONAL_INFO.bioLead}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  className="text-sm sm:text-base text-[#858997] leading-[1.85] font-light"
                >
                  {PERSONAL_INFO.bioExtended}
                </motion.p>
              </div>
            </div>

            {/* Actions: Explore Projects and Download Résumé with Micro-interactions */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-5 pt-4 sm:pt-6"
            >
              <motion.a
                href="#projects"
                whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.01 }}
                whileTap={shouldReduceMotion ? {} : { y: 0 }}
                transition={{ duration: 0.15 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 min-h-[44px] text-xs uppercase tracking-wider font-mono font-medium text-[#090A0C] bg-[#F1F0EC] hover:bg-white transition-all rounded-sm shadow-md hover:shadow-xl group"
              >
                <span>Explore Projects</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
              </motion.a>

              <motion.button
                onClick={onOpenResume}
                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                whileTap={shouldReduceMotion ? {} : { y: 0 }}
                transition={{ duration: 0.15 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 min-h-[44px] text-xs uppercase tracking-wider font-mono font-medium text-[#F1F0EC] bg-[#14161A] hover:bg-[#1A1D24] border border-white/10 hover:border-white/25 transition-all rounded-sm shadow-sm group"
              >
                <FileDown className="w-3.5 h-3.5 text-[#C5C7CC] group-hover:text-white transition-colors" />
                <span>Download Résumé</span>
              </motion.button>

              <motion.a
                href="#contact"
                whileHover={shouldReduceMotion ? {} : { x: 3 }}
                transition={{ duration: 0.15 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-4 text-xs uppercase tracking-wider font-mono font-medium text-[#858997] hover:text-[#F1F0EC] transition-colors"
              >
                <span>Direct Contact</span>
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
                className="absolute -inset-1 bg-gradient-to-b from-[#C5C7CC]/20 via-[#14161A]/40 to-transparent blur-2xl -z-10 rounded-sm opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative w-full bg-[#14161A] border border-white/10 ring-1 ring-white/5 p-2 sm:p-3 rounded-sm group overflow-hidden shadow-[0_0_60px_-15px_rgba(197,199,204,0.09)] hover:shadow-[0_0_80px_-10px_rgba(197,199,204,0.18)] transition-all duration-700 flex flex-col">
                {/* Corner Architectural Frame Marks in Silver with Subtle Hover Animation */}
                <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-[#C5C7CC]/40 group-hover:border-[#F1F0EC] transition-colors duration-500 z-20 pointer-events-none" />
                <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-[#C5C7CC]/40 group-hover:border-[#F1F0EC] transition-colors duration-500 z-20 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-[#C5C7CC]/40 group-hover:border-[#F1F0EC] transition-colors duration-500 z-20 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-[#C5C7CC]/40 group-hover:border-[#F1F0EC] transition-colors duration-500 z-20 pointer-events-none" />

                {/* Top Subtle Silver Metadata Header */}
                <div className="px-2 py-1.5 mb-1.5 flex items-center justify-between text-[11px] font-mono text-[#858997] border-b border-white/[0.06]">
                  <span className="flex items-center gap-1.5 text-[#C5C7CC]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5C7CC]/60 animate-pulse" />
                    <span>PLATE 01 // PORTRAIT</span>
                  </span>
                  <span>KATHMANDU · NEPAL</span>
                </div>

                {/* Portrait Image Container with Dark Background & Subtle Silver Lighting */}
                <div className="relative w-full h-[400px] sm:h-[520px] lg:h-[600px] overflow-hidden bg-[#050608] rounded-sm flex items-center justify-center">
                  {/* Subtle Silver Radial Rim Lighting behind the portrait */}
                  <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(197,199,204,0.16),transparent_65%)] pointer-events-none z-0"
                    aria-hidden="true"
                  />

                  {/* Authentic Uploaded Photograph of Anuj Sapkota with Cinematic Slow Zoom-In/Out */}
                  <motion.img
                    initial={{ scale: shouldReduceMotion ? 1 : 1.06, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    src={anujPortrait}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        '/assets/aistudio/file_000000003fec8211acc8f2335dc06a55_8d6a5bbd.png';
                    }}
                    alt="Anuj Sapkota — Frontend Developer & Aspiring Software Engineer"
                    referrerPolicy="no-referrer"
                    className="relative z-10 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />

                  {/* Measured Bottom Contrast Scrim for Editorial Typography */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#090A0C] via-[#090A0C]/35 to-transparent opacity-90 pointer-events-none z-10"
                    aria-hidden="true"
                  />

                  {/* Editorial Caption Overlay */}
                  <div className="absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between text-xs font-mono">
                    <div className="space-y-0.5">
                      <p className="text-[#F1F0EC] font-serif text-lg tracking-normal">
                        Anuj Sapkota
                      </p>
                      <p className="text-[#C5C7CC] text-[11px] font-sans font-light">
                        Frontend Developer / Aspiring Software Engineer
                      </p>
                      <p className="text-[#858997] text-[10px] flex items-center gap-1.5 font-mono pt-1">
                        <MapPin className="w-3 h-3 text-[#C5C7CC]" />
                        <span>Kathmandu, Nepal · 27.7172° N, 85.3240° E</span>
                      </p>
                    </div>
                    <div className="text-right text-[#858997] text-[11px] font-mono">
                      <span className="text-[#F1F0EC] font-medium">AUTHENTIC</span>
                      <span className="block text-[10px] text-[#858997]">PORTRAIT</span>
                    </div>
                  </div>
                </div>

                {/* Sub-card metadata strip */}
                <div className="mt-2 pt-2 px-2 flex items-center justify-between text-[11px] font-mono text-[#858997]">
                  <span className="text-[#C5C7CC]">STUDIO SPECIFICATION</span>
                  <span>MONOCHROME ARCHITECTURE</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Full-Width Metric Proof Strip with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-b border-white/[0.08] py-12 md:py-16 bg-[#14161A]/30"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="space-y-2">
              <span className="block text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F1F0EC] tabular-nums font-normal tracking-tight">
                0.00
              </span>
              <span className="block text-[11px] font-mono uppercase text-[#858997] tracking-[0.18em]">
                Layout Shift (CLS)
              </span>
              <span className="text-xs text-[#C5C7CC] font-light">Predictable DOM, zero layout jank</span>
            </div>

            <div className="space-y-2">
              <span className="block text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F1F0EC] tabular-nums font-normal tracking-tight">
                100%
              </span>
              <span className="block text-[11px] font-mono uppercase text-[#858997] tracking-[0.18em]">
                TypeScript Strictness
              </span>
              <span className="text-xs text-[#C5C7CC] font-light">End-to-end type soundness</span>
            </div>

            <div className="space-y-2">
              <span className="block text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F1F0EC] tabular-nums font-normal tracking-tight">
                20+
              </span>
              <span className="block text-[11px] font-mono uppercase text-[#858997] tracking-[0.18em]">
                Engineered Solutions
              </span>
              <span className="text-xs text-[#C5C7CC] font-light">Web apps, tokens &amp; tooling</span>
            </div>

            <div className="space-y-2">
              <span className="block text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F1F0EC] tabular-nums font-normal tracking-tight">
                &lt; 1.0s
              </span>
              <span className="block text-[11px] font-mono uppercase text-[#858997] tracking-[0.18em]">
                LCP Target Budget
              </span>
              <span className="text-xs text-[#C5C7CC] font-light">Optimized bundle budgets</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
