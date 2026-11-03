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
    <section id="skills" className="py-32 md:py-40 lg:py-48 border-b border-black/[0.06] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 md:mb-24 pb-8 border-b border-black/[0.08]"
        >
          <div className="space-y-3 max-w-2xl">
            <span className="block text-[11px] uppercase font-mono tracking-[0.25em] text-[#716B61]">
              02 / SKILLS
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#24231F] tracking-tight leading-[1.1]">
              Tools for thoughtful <span className="italic font-light text-[#8B5E34]">interfaces</span>
            </h2>
            <p className="text-sm sm:text-base text-[#716B61] font-light leading-[1.8]">
              A practical overview of the languages, frameworks, and tools I work with.
            </p>
          </div>

          {/* Interactive Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#716B61] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Filter skills by technology or tool"
              placeholder="Search skills and tools"
              className="w-full bg-[#FFFFFF] border border-black/10 rounded-md py-2.5 pl-10 pr-4 text-xs font-mono text-[#24231F] placeholder-[#716B61] focus:border-black/30 transition-colors shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear skill search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] font-mono text-[#716B61] hover:text-[#24231F]"
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
            aria-pressed={selectedCategory === 'All'}
            className={`min-h-[44px] px-4 py-2 text-xs font-mono transition-colors rounded-md ${
              selectedCategory === 'All'
                ? 'bg-[#24231F] text-[#F6F3EC] font-medium'
                : 'bg-[#FFFFFF] text-[#716B61] hover:text-[#24231F] border border-black/5'
            }`}
          >
            All Disciplines
          </button>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.title}
              onClick={() => setSelectedCategory(cat.title)}
              aria-pressed={selectedCategory === cat.title}
              className={`min-h-[44px] px-4 py-2 text-xs font-mono transition-colors rounded-md ${
                selectedCategory === cat.title
                  ? 'bg-[#24231F] text-[#F6F3EC] font-medium'
                  : 'bg-[#FFFFFF] text-[#716B61] hover:text-[#24231F] border border-black/5'
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
              className="bg-[#FFFFFF]/50 border border-black/[0.08] p-8 sm:p-10 lg:p-12 rounded-md space-y-8 hover:border-black/20 transition-colors shadow-[0_18px_45px_-30px_rgba(36,35,31,0.28)]"
            >
              {/* Category Title & Note */}
              <div className="border-b border-black/[0.08] pb-5 space-y-2">
                <h3 className="text-2xl font-serif text-[#24231F]">
                  {category.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#716B61] font-light leading-[1.7]">
                  {category.description}
                </p>
              </div>

              {/* Skills and proficiency */}
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={shouldReduceMotion ? {} : { x: 3 }}
                    transition={{ duration: 0.15 }}
                    className="p-4 bg-[#F6F3EC]/60 border border-black/[0.05] rounded-md space-y-1.5 hover:border-black/15 hover:bg-[#F6F3EC]/90 transition-all"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-medium text-[#24231F] text-sm font-sans">
                        {skill.name}
                      </span>
                      <span className="text-[11px] text-[#716B61] uppercase tracking-wider">
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#716B61] leading-[1.7] font-light">
                      {skill.context}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="py-20 text-center text-xs font-mono text-[#716B61] border border-dashed border-black/10 rounded-md">
            No technical skills match the search "{searchQuery}".
          </div>
        )}
      </div>
    </section>
  );
};
