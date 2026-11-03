import React from 'react';
import { Terminal, ShieldCheck, HeartHandshake, Code2, Sparkles, Compass } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const principles = [
    {
      title: 'Aesthetics Rooted in System Rigor',
      description:
        'Visual elegance is not cosmetic decoration applied at the end; it emerges from clean token mathematics, harmonic typography scales, and consistent spatial pacing.',
    },
    {
      title: 'Performance as an Invariant',
      description:
        'A user interface must respond within 100ms. I measure time-to-interactive, bundle footprints, and DOM recycling with the same discipline as server latencies.',
    },
    {
      title: 'Accessibility Is Foundational',
      description:
        'Every component is architected for screen readers, keyboard traversal, and high-contrast legibility first. Inclusive design leads to mathematically superior software.',
    },
    {
      title: 'Declarative, Deterministic State',
      description:
        'Eliminating impossible UI states through finite state machines and transient subscriptions instead of sprawling, uncoordinated boolean flags.',
    },
  ];

  return (
    <section id="about" className="py-32 md:py-40 lg:py-48 border-b border-white/[0.06] relative">
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
            CHAPTER 03 // ETHOS &amp; ROOTS
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#F1F0EC] tracking-tight leading-[1.1]">
            Engineering With <span className="italic font-light text-[#C5C7CC]">Purpose</span>
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
            className="lg:col-span-7 space-y-8 text-base sm:text-lg text-[#C5C7CC] font-light leading-[1.85]"
          >
            <p className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#F1F0EC] leading-[1.3] font-normal tracking-[-0.02em]">
              I believe modern frontend engineering sits at the exact intersection of <span className="italic font-light text-[#C5C7CC]">classical computer science</span> and <span className="italic font-light text-[#C5C7CC]">architectural precision</span>.
            </p>

            <p>
              Growing up with an innate curiosity for how digital systems work, I began exploring web standards from Kathmandu, Nepal. Over years of focused study in Computer Science and Information Technology, I came to realize that the difference between an average interface and a world-class application lies in the microscopic details: sub-millisecond input handling, strict typing, and calm, unhurried visual rhythm.
            </p>

            <p className="text-sm sm:text-base text-[#858997] leading-[1.85] font-light">
              When I construct a web application, I approach it like a structural engineer. What happens when network latency spikes? How does memory behave when thousands of DOM nodes are added? Does the interface remain fully navigable for someone using only a keyboard? Every line of TypeScript is written with deliberate intent.
            </p>

            {/* Quick Fact Badges (Clean unboxed style) */}
            <div className="pt-8 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-mono">
              <div className="space-y-1">
                <span className="block text-[#858997] uppercase text-[11px] tracking-wider">Origin Base</span>
                <span className="text-[#F1F0EC] text-sm">Kathmandu, Nepal</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[#858997] uppercase text-[11px] tracking-wider">Active Timezone</span>
                <span className="text-[#F1F0EC] text-sm">NPT (UTC+5:45)</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[#858997] uppercase text-[11px] tracking-wider">Degree</span>
                <span className="text-[#F1F0EC] text-sm">B.Sc. CSIT</span>
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
            <div className="bg-[#14161A]/70 border border-white/10 p-8 sm:p-10 lg:p-12 rounded-sm space-y-8 shadow-xl hover:border-white/20 transition-colors">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F1F0EC] flex items-center gap-2.5">
                  <Terminal className="w-4 h-4 text-[#858997]" />
                  <span>Engineering Manifesto</span>
                </span>
                <span className="text-[11px] font-mono text-[#858997] tracking-wider">DOCTRINE</span>
              </div>

              <div className="space-y-6">
                {principles.map((p, idx) => (
                  <div key={idx} className="space-y-2 group">
                    <h3 className="text-base sm:text-lg font-serif text-[#F1F0EC] flex items-center gap-2.5 group-hover:text-white transition-colors">
                      <span className="font-mono text-xs text-[#858997]">0{idx + 1}.</span>
                      <span>{p.title}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#858997] leading-[1.75] pl-6 font-light">
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-[#858997]">
                <span className="tracking-wider">FOUNDATIONAL DISCIPLINE</span>
                <span className="text-[#C5C7CC]">TypeScript · React · Next.js</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
