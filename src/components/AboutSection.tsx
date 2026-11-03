import React from 'react';
import { Terminal } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

export const AboutSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const principles = [
    {
      title: 'Thoughtful by design',
      description:
        'Good visual design comes from clear hierarchy, consistent spacing, and details that support the content.',
    },
    {
      title: 'Responsive and reliable',
      description:
        'Interfaces should feel quick and work well across screen sizes, devices, and network conditions.',
    },
    {
      title: 'Accessibility from the start',
      description:
        'Keyboard access, readable contrast, and clear feedback are part of a complete interface.',
    },
    {
      title: 'Simple, predictable code',
      description:
        'I prefer components and state flows that are easy to understand, maintain, and extend.',
    },
  ];

  return (
    <section id="about" className="py-32 md:py-40 lg:py-48 border-b border-black/[0.06] relative">
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
            01 / ABOUT
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#24231F] tracking-tight leading-[1.1]">
            Engineering With <span className="italic font-light text-[#8B5E34]">Purpose</span>
          </h2>
        </motion.div>

        {/* Editorial Split Layout with Generous Spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-16">
          {/* Left Column: Monograph Narrative with Staggered Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8 text-base sm:text-lg text-[#5C5952] font-light leading-[1.85]"
          >
            <p className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#24231F] leading-[1.3] font-normal tracking-[-0.02em]">
              I build interfaces that feel considered on screen and dependable under the hood.
            </p>

            <p>
              I’m Anuj, a frontend developer based in Kathmandu, Nepal. I studied Computer Science and Information Technology and work with React, TypeScript, and modern web tools to create clear, responsive experiences.
            </p>

            <p className="text-sm sm:text-base text-[#716B61] leading-[1.85] font-light">
              I care about accessible interaction, practical performance, and keeping interfaces straightforward to use.
            </p>

            {/* Quick Fact Badges (Clean unboxed style) */}
            <div className="pt-8 border-t border-black/[0.08] grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-mono">
              <div className="space-y-1">
                <span className="block text-[#716B61] uppercase text-[11px] tracking-wider">Based in</span>
                <span className="text-[#24231F] text-sm">Kathmandu, Nepal</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[#716B61] uppercase text-[11px] tracking-wider">Time zone</span>
                <span className="text-[#24231F] text-sm">NPT (UTC+5:45)</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[#716B61] uppercase text-[11px] tracking-wider">Degree</span>
                <span className="text-[#24231F] text-sm">B.Sc. CSIT</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Workstation & Tooling Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-[#FFFFFF]/70 border border-black/10 p-8 sm:p-10 lg:p-12 rounded-md space-y-8 shadow-[0_18px_45px_-30px_rgba(36,35,31,0.28)] hover:border-black/20 transition-colors">
              <div className="flex items-center justify-between border-b border-black/[0.08] pb-5">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#24231F] flex items-center gap-2.5">
                  <Terminal className="w-4 h-4 text-[#716B61]" />
                  <span>How I work</span>
                </span>
                <span className="text-[11px] font-mono text-[#716B61] tracking-wider">APPROACH</span>
              </div>

              <div className="space-y-6">
                {principles.map((p, idx) => (
                  <div key={idx} className="space-y-2 group">
                    <h3 className="text-base sm:text-lg font-serif text-[#24231F] flex items-center gap-2.5 group-hover:text-[#8B5E34] transition-colors">
                      <span className="font-mono text-xs text-[#716B61]">0{idx + 1}.</span>
                      <span>{p.title}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#716B61] leading-[1.75] pl-6 font-light">
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-black/[0.08] flex items-center justify-between text-xs font-mono text-[#716B61]">
                <span className="tracking-wider">CORE TOOLS</span>
                <span className="text-[#5C5952]">TypeScript · React · Next.js</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
