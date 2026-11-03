import React, { useState, useEffect } from 'react';
import { Mail, Copy, Check, Send, Github, Linkedin, Twitter, ExternalLink, Clock, MapPin, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedSecondary, setCopiedSecondary] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [kathmanduTime, setKathmanduTime] = useState('');
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
        setKathmanduTime('NPT');
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = (email: string, isSec: boolean) => {
    navigator.clipboard.writeText(email);
    if (isSec) {
      setCopiedSecondary(true);
      setTimeout(() => setCopiedSecondary(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      const mailtoLink = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        formData.subject || `Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.open(mailtoLink, '_self');
    }, 600);
  };

  return (
    <section id="contact" className="py-32 md:py-40 lg:py-48 border-b border-black/[0.06] relative bg-[#F6F3EC]">
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
            06 / CONTACT
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#24231F] tracking-tight leading-[1.1]">
            Initiate <span className="italic font-light text-[#8B5E34]">Dialogue</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left Column (5 cols): Direct channels, location, availability */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-10"
          >
            <div className="space-y-4">
              <h3 className="text-3xl sm:text-4xl font-serif text-[#24231F] leading-snug">
                Let's construct something meaningful together.
              </h3>
              <p className="text-base sm:text-lg text-[#5C5952] font-light leading-[1.85]">
                Currently open to frontend engineering positions, software engineering internships/roles, and select architectural consultations.
              </p>
            </div>

            {/* Direct Email Cards */}
            <div className="space-y-4">
              <span className="block text-xs font-mono uppercase tracking-[0.2em] text-[#716B61]">
                Primary Channels
              </span>

              {/* Primary Email */}
              <motion.div
                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                transition={{ duration: 0.15 }}
                className="p-5 bg-[#FFFFFF] border border-black/10 rounded-md flex items-center justify-between group shadow-sm hover:border-black/20 transition-colors"
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-[#716B61] block uppercase tracking-wider">Direct &amp; Personal</span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-xs sm:text-sm font-mono text-[#24231F] hover:underline"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
                <button
                  onClick={() => handleCopy(PERSONAL_INFO.email, false)}
                  className="p-2.5 text-[#716B61] hover:text-[#24231F] border border-black/5 hover:border-black/20 rounded-md bg-[#F6F3EC] transition-colors"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </motion.div>

              {/* Domain Email */}
              <motion.div
                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                transition={{ duration: 0.15 }}
                className="p-5 bg-[#FFFFFF] border border-black/10 rounded-md flex items-center justify-between group shadow-sm hover:border-black/20 transition-colors"
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-[#716B61] block uppercase tracking-wider">Official Domain</span>
                  <a
                    href={`mailto:${PERSONAL_INFO.secondaryEmail}`}
                    className="text-xs sm:text-sm font-mono text-[#24231F] hover:underline"
                  >
                    {PERSONAL_INFO.secondaryEmail}
                  </a>
                </div>
                <button
                  onClick={() => handleCopy(PERSONAL_INFO.secondaryEmail, true)}
                  className="p-2.5 text-[#716B61] hover:text-[#24231F] border border-black/5 hover:border-black/20 rounded-md bg-[#F6F3EC] transition-colors"
                  title="Copy domain email"
                >
                  {copiedSecondary ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </motion.div>
            </div>

            {/* Location & Timezone Details */}
            <div className="p-5 bg-[#FFFFFF]/60 border border-black/[0.06] rounded-md space-y-3 text-xs font-mono text-[#716B61]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#5C5952]">
                  <MapPin className="w-4 h-4 text-[#716B61]" />
                  <span>Kathmandu, Nepal</span>
                </span>
                <span>27.7172° N, 85.3240° E</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-black/[0.05]">
                <span className="flex items-center gap-2 text-[#5C5952]">
                  <Clock className="w-4 h-4 text-[#716B61]" />
                  <span>Nepal Standard Time (NPT)</span>
                </span>
                <span className="text-[#24231F] font-semibold tabular-nums">
                  {kathmanduTime || 'UTC+5:45'}
                </span>
              </div>
            </div>

            {/* Social Network Links with Hover Transitions */}
            <div className="space-y-4 pt-2">
              <span className="block text-xs font-mono uppercase tracking-[0.2em] text-[#716B61]">
                Verified Digital Profiles
              </span>
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={shouldReduceMotion ? {} : { y: -2 }}
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 text-xs font-mono text-[#5C5952] hover:text-[#24231F] bg-[#FFFFFF] border border-black/10 hover:border-black/20 rounded-md transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-[#716B61]" />
                </motion.a>

                <motion.a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={shouldReduceMotion ? {} : { y: -2 }}
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 text-xs font-mono text-[#5C5952] hover:text-[#24231F] bg-[#FFFFFF] border border-black/10 hover:border-black/20 rounded-md transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-[#716B61]" />
                </motion.a>

                <motion.a
                  href={PERSONAL_INFO.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={shouldReduceMotion ? {} : { y: -2 }}
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 text-xs font-mono text-[#5C5952] hover:text-[#24231F] bg-[#FFFFFF] border border-black/10 hover:border-black/20 rounded-md transition-colors"
                >
                  <Twitter className="w-3.5 h-3.5" />
                  <span>X / Twitter</span>
                  <ArrowUpRight className="w-3 h-3 text-[#716B61]" />
                </motion.a>

                <motion.a
                  href={PERSONAL_INFO.socials.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={shouldReduceMotion ? {} : { y: -2 }}
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 text-xs font-mono text-[#5C5952] hover:text-[#24231F] bg-[#FFFFFF] border border-black/10 hover:border-black/20 rounded-md transition-colors"
                >
                  <span>LeetCode</span>
                  <ArrowUpRight className="w-3 h-3 text-[#716B61]" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right Column (7 cols): Interactive Contact Form with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="bg-[#FFFFFF] border border-black/10 p-8 sm:p-12 lg:p-14 rounded-md shadow-[0_24px_60px_-36px_rgba(36,35,31,0.32)] hover:border-black/20 transition-colors">
              <h4 className="text-2xl font-serif text-[#24231F] mb-3">
                Send an Editorial Dispatch
              </h4>
              <p className="text-xs sm:text-sm text-[#716B61] mb-10 font-mono leading-relaxed">
                Responses typically dispatched within 24 business hours.
              </p>

              {submitted ? (
                <div className="p-10 bg-[#F6F3EC] border border-emerald-500/20 rounded-md space-y-5 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <Check className="w-6 h-6" />
                  </div>
                  <h5 className="text-2xl font-serif text-[#24231F]">
                    Message Transmitted
                  </h5>
                  <p className="text-sm sm:text-base text-[#5C5952] max-w-md mx-auto leading-[1.8] font-light">
                    Thank you, {formData.name}. Your inquiry has been queued and prepared in your default mail composer.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="inline-block mt-4 text-xs font-mono text-[#716B61] hover:text-[#24231F] underline"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-2.5">
                      <label
                        htmlFor="name"
                        className="block text-xs font-mono uppercase tracking-[0.18em] text-[#716B61]"
                      >
                        Your Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Elena Rostova"
                        className="w-full bg-[#F6F3EC] border border-black/10 rounded-md px-5 py-3.5 text-sm text-[#24231F] placeholder-[#716B61] focus:border-black/30 transition-colors shadow-sm"
                      />
                    </div>

                    <div className="space-y-2.5">
                      <label
                        htmlFor="email"
                        className="block text-xs font-mono uppercase tracking-[0.18em] text-[#716B61]"
                      >
                        Your Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="elena@studio.com"
                        className="w-full bg-[#F6F3EC] border border-black/10 rounded-md px-5 py-3.5 text-sm text-[#24231F] placeholder-[#716B61] focus:border-black/30 transition-colors shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <label
                      htmlFor="subject"
                      className="block text-xs font-mono uppercase tracking-[0.18em] text-[#716B61]"
                    >
                      Subject / Project Scope
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Frontend Engineering Role / Architecture Consultation"
                      className="w-full bg-[#F6F3EC] border border-black/10 rounded-md px-5 py-3.5 text-sm text-[#24231F] placeholder-[#716B61] focus:border-black/30 transition-colors shadow-sm"
                    />
                  </div>

                  <div className="space-y-2.5">
                    <label
                      htmlFor="message"
                      className="block text-xs font-mono uppercase tracking-[0.18em] text-[#716B61]"
                    >
                      Message / Inquiry Details *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details regarding your opportunity, engineering challenge, or collaboration..."
                      className="w-full bg-[#F6F3EC] border border-black/10 rounded-md px-5 py-3.5 text-sm text-[#24231F] placeholder-[#716B61] focus:border-black/30 transition-colors resize-y shadow-sm leading-relaxed"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <span className="text-[11px] font-mono text-[#716B61]">
                      * Required fields
                    </span>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.01 }}
                      whileTap={shouldReduceMotion ? {} : { y: 0 }}
                      className="inline-flex items-center gap-3 px-8 py-4 text-xs font-mono uppercase tracking-wider font-semibold text-[#F6F3EC] bg-[#24231F] hover:bg-[#8B5E34] disabled:opacity-50 rounded-md transition-all shadow-md group/btn"
                    >
                      {isSubmitting ? (
                        <span>Transmitting...</span>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
