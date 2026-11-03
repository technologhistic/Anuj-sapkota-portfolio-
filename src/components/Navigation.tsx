import React, { useState, useEffect } from 'react';
import { FileText, ArrowUpRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useReducedMotion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavigationProps {
  onOpenResume: () => void;
  activeSection: string;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenResume, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F6F3EC]/90 backdrop-blur-md border-b border-black/[0.07] py-4 shadow-[0_4px_24px_rgba(36,35,31,0.08)]'
          : 'bg-transparent py-6'
      }`}
    >
      {/* Scroll Progress Hairline Indicator */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#5C5952] to-transparent origin-left z-50 pointer-events-none"
          style={{ scaleX: scrollYProgress }}
        />
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Bar Contract: 3 zones separated by gap-8 */}
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element in display face) */}
          <motion.a
            href="#"
            whileHover={shouldReduceMotion ? {} : { x: 2 }}
            transition={{ duration: 0.2 }}
            className="text-base md:text-lg font-normal tracking-tight text-[#24231F] hover:text-[#8B5E34] transition-colors whitespace-nowrap shrink-0 group flex items-center gap-2.5"
          >
            <span className="font-serif tracking-[-0.01em] text-lg md:text-xl font-normal text-[#24231F]">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[11px] font-mono text-[#716B61] font-normal hidden sm:inline tracking-wider group-hover:text-[#5C5952] transition-colors">
              / FRONTEND DEVELOPMENT
            </span>
          </motion.a>

          {/* Zone 2: 4-5 single-line clean text links with subtle hover effect */}
          <nav
            aria-label="Main navigation"
            onMouseLeave={() => setHoveredNav(null)}
            className="hidden lg:flex items-center gap-9 text-[11px] tracking-[0.2em] uppercase font-mono text-[#5C5952] relative"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              const isHovered = hoveredNav === link.label;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? 'location' : undefined}
                  onMouseEnter={() => setHoveredNav(link.label)}
                  className={`transition-colors whitespace-nowrap shrink-0 relative py-1.5 ${
                    isActive ? 'text-[#24231F] font-medium' : 'text-[#716B61] hover:text-[#24231F]'
                  }`}
                >
                  <span>{link.label}</span>

                  {/* Active or Hover Underline */}
                  {(isActive || isHovered) && (
                    <motion.span
                      layoutId={shouldReduceMotion ? undefined : 'navIndicator'}
                      className={`absolute bottom-0 left-0 right-0 h-[1.5px] ${
                        isActive ? 'bg-[#24231F]' : 'bg-[#5C5952]/50'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action + Quick Résumé Action with elegant hover micro-interactions */}
          <div className="flex items-center gap-4 shrink-0">
            <motion.button
              whileHover={shouldReduceMotion ? {} : { y: -1 }}
              whileTap={shouldReduceMotion ? {} : { y: 0 }}
              onClick={onOpenResume}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 min-h-[44px] py-2 text-xs font-mono text-[#5C5952] hover:text-[#24231F] border border-black/10 hover:border-black/25 transition-all rounded-md whitespace-nowrap bg-[#FFFFFF]/80 shadow-sm"
              title="Open Résumé"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Résumé</span>
            </motion.button>

            <motion.a
              href="#contact"
              whileHover={shouldReduceMotion ? {} : { y: -1, scale: 1.01 }}
              whileTap={shouldReduceMotion ? {} : { y: 0 }}
              transition={{ duration: 0.15 }}
              className="inline-flex min-h-[44px] items-center gap-2 px-4 py-2 text-xs font-mono font-medium text-[#F6F3EC] bg-[#24231F] hover:bg-[#8B5E34] transition-all rounded-md whitespace-nowrap shadow-sm hover:shadow"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.a>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-[#5C5952] hover:text-[#24231F] border border-black/10 rounded-md"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            id="mobile-navigation"
            role="navigation"
            aria-label="Mobile navigation"
            className="lg:hidden border-b border-black/10 bg-[#F6F3EC]/98 backdrop-blur-2xl px-6 py-6 mt-3 overflow-hidden shadow-[0_24px_60px_-36px_rgba(36,35,31,0.32)]"
          >
            <div className="flex flex-col space-y-1">
              {[
                { label: '01 // Ethos & About', href: '#about' },
                { label: '02 // Skills Matrix', href: '#skills' },
                { label: '03 // Education', href: '#education' },
                { label: '04 // Achievements', href: '#achievements' },
                { label: '05 // Initiate Contact', href: '#contact' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[44px] flex items-center text-xs font-mono uppercase tracking-[0.16em] text-[#5C5952] hover:text-[#24231F] border-b border-black/[0.05] active:text-[#24231F] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="min-h-[44px] flex items-center justify-center gap-2 w-full py-3 text-xs font-mono uppercase tracking-wider font-medium text-[#24231F] border border-black/15 rounded-md bg-[#FFFFFF] active:bg-[#E5DED2] transition-colors"
                >
                  <FileText className="w-4 h-4 text-[#5C5952]" />
                  <span>Inspect Full Résumé</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
