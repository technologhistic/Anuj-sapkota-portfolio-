import React from 'react';
import { ArrowUp, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-24 md:py-32 bg-[#F6F3EC] border-t border-black/[0.08] text-xs font-mono text-[#716B61]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 pb-16 border-b border-black/[0.06]">
          <div className="space-y-4 max-w-lg">
            <span className="text-2xl sm:text-3xl font-serif text-[#24231F] tracking-normal block">
              {PERSONAL_INFO.name}
            </span>
            <p className="text-sm text-[#716B61] font-sans font-light leading-[1.8]">
              Frontend Developer &amp; Aspiring Software Engineer based in Kathmandu, Nepal. Dedicated to architectural discipline, sub-millisecond interaction design, and accessible systems.
            </p>
            <div className="flex items-center gap-2.5 text-xs text-[#5C5952] pt-2">
              <MapPin className="w-3.5 h-3.5 text-[#716B61]" />
              <span>Kathmandu, Nepal</span>
              <span aria-hidden="true" className="text-black/20">/</span>
              <span>27.7172° N, 85.3240° E</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <nav className="flex flex-wrap items-center gap-8 text-[11px] uppercase tracking-[0.2em] text-[#5C5952]">
              <a href="#about" className="hover:text-[#24231F] transition-colors">
                About
              </a>
              <a href="#skills" className="hover:text-[#24231F] transition-colors">
                Skills
              </a>
              <a href="#contact" className="hover:text-[#24231F] transition-colors">
                Contact
              </a>
            </nav>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono text-[#5C5952] hover:text-[#24231F] border border-black/10 hover:border-black/20 rounded-md bg-[#FFFFFF] transition-colors shadow-sm"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] text-[#716B61]">
          <div>
            © {new Date().getFullYear()} Anuj Sapkota. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`https://${PERSONAL_INFO.domain}`}
              className="text-[#5C5952] hover:text-[#24231F] transition-colors"
            >
              {PERSONAL_INFO.domain}
            </a>
            <span aria-hidden="true" className="text-black/20">/</span>
            <span>Obsidian &amp; Graphite Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
