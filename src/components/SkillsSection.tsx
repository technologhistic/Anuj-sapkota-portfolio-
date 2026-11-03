import React, { useState } from 'react';
import { Search, Code2, Cpu, Wrench, Shield, CheckCircle2 } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const shouldReduceMotion = useReducedMotion();

  const filteredCategories = SKILL_CATEGORIES.map((cat) => {
    const matchingSkills = cat.skills.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.context.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...cat,
      skills: matchingSkills,
    };
  }).filter((cat) => {
    if (selectedCategory !== 'All' && cat.title !== selectedCategory) {
      return false;
    }
    return cat.skills.length > 0;
  });

  return (
    <section id="skills" className="py-32 md:py-40 lg:py-48 border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 md:mb-24 pb-8 border-b border-white/[0.08]"
        >
          <div className="space-y-3 max-w-2xl">
            <span className="block text-[11px] uppercase font-mono tracking-[0.25em] text-[#858997]">
              CHAPTER 04 // CAPABILITY INVENTORY
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#F1F0EC] tracking-tight leading-[1.1]">
              Skills &amp; <span className="italic font-light text-[#C5C7CC]">Engineering</span> Matrix
            </h2>
            <p className="text-sm sm:text-base text-[#858997] font-light leading-[1.8]">
              A breakdown of foundational web technologies, performance profiling pipelines, and architectural frameworks.
            </p>
          </div>

          {/* Interactive Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#858997] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by technology or tool..."
              className="w-full bg-[#14161A] border border-white/10 rounded-sm py-2.5 pl-10 pr-4 text-xs font-mono text-[#F1F0EC] placeholder-[#858997] focus:outline-none focus:border-white/30 transition-colors shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] font-mono text-[#858997] hover:text-[#F1F0EC]"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Filter Buttons with Smooth Transitions */}
        <div className="flex flex-wrap items-center gap-2.5 mb-14">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 text-xs font-mono transition-colors rounded-sm ${
              selectedCategory === 'All'
                ? 'bg-[#F1F0EC] text-[#090A0C] font-medium'
                : 'bg-[#14161A] text-[#858997] hover:text-[#F1F0EC] border border-white/5'
            }`}
          >
            All Disciplines
          </button>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.title}
              onClick={() => setSelectedCategory(cat.title)}
              className={`px-4 py-2 text-xs font-mono transition-colors rounded-sm ${
                selectedCategory === cat.title
                  ? 'bg-[#F1F0EC] text-[#090A0C] font-medium'
                  : 'bg-[#14161A] text-[#858997] hover:text-[#F1F0EC] border border-white/5'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Skills Grid with Scroll Reveals & Hover Micro-elevation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: catIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={shouldReduceMotion ? {} : { y: -3 }}
              className="bg-[#14161A]/50 border border-white/[0.08] p-8 sm:p-10 lg:p-12 rounded-sm space-y-8 hover:border-white/20 transition-colors shadow-xl"
            >
              {/* Category Title & Note */}
              <div className="border-b border-white/[0.08] pb-5 space-y-2">
                <h3 className="text-2xl font-serif text-[#F1F0EC]">
                  {category.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#858997] font-light leading-[1.7]">
                  {category.description}
                </p>
              </div>

              {/* Skills List without ugly fake progress bars */}
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={shouldReduceMotion ? {} : { x: 3 }}
                    transition={{ duration: 0.15 }}
                    className="p-4 bg-[#090A0C]/60 border border-white/[0.05] rounded-sm space-y-1.5 hover:border-white/15 hover:bg-[#090A0C]/90 transition-all"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-medium text-[#F1F0EC] text-sm font-sans">
                        {skill.name}
                      </span>
                      <span className="text-[11px] text-[#858997] uppercase tracking-wider">
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#858997] leading-[1.7] font-light">
                      {skill.context}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="py-20 text-center text-xs font-mono text-[#858997] border border-dashed border-white/10 rounded-sm">
            No technical skills match the search "{searchQuery}".
          </div>
        )}
      </div>
    </section>
  );
};
