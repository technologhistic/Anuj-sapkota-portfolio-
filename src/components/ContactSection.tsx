import React, { useState } from 'react';
import { ArrowUpRight, Github, Mail, Send } from 'lucide-react';
import { CONTACT_EMAIL, GITHUB_URL } from '../data/portfolioData';

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

export const ContactSection: React.FC = () => {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitState === 'sending') return;

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setSubmitState('sending');
    setStatusMessage('Sending your message…');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json() as { message?: string };

      if (!response.ok) throw new Error(result.message || 'The message could not be sent. Please email me directly.');
      form.reset();
      setSubmitState('success');
      setStatusMessage(result.message || 'Thanks — your message has been sent.');
    } catch (error) {
      setSubmitState('error');
      setStatusMessage(error instanceof Error ? error.message : 'The message could not be sent. Please email me directly.');
    }
  };

  return (
    <section id="contact" className="section section--contact" aria-labelledby="contact-title">
      <div className="page-shell">
        <div className="contact-heading" data-reveal>
          <p className="eyebrow"><span className="section-number">05</span> CONTACT</p>
          <h2 id="contact-title" className="section-heading">Have an idea?<br /><span className="text-silver">Let’s talk.</span></h2>
          <p className="section-intro">For questions, project ideas, or a friendly hello, send me a message or find me on GitHub.</p>
          <div className="contact-direct-links">
            <a href={`mailto:${CONTACT_EMAIL}`}><Mail size={16} aria-hidden="true" />{CONTACT_EMAIL}<ArrowUpRight size={13} aria-hidden="true" /></a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer"><Github size={16} aria-hidden="true" />GitHub<ArrowUpRight size={13} aria-hidden="true" /></a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} data-reveal>
          <div className="contact-fields">
            <label className="form-field"><span>Name</span><input name="name" autoComplete="name" required maxLength={100} placeholder="Your name" /></label>
            <label className="form-field"><span>Email</span><input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" /></label>
            <label className="form-field form-field--full"><span>Subject</span><input name="subject" required maxLength={140} placeholder="What would you like to talk about?" /></label>
            <label className="form-field form-field--full"><span>Message</span><textarea name="message" required minLength={10} maxLength={5000} rows={5} placeholder="Write your message…" /></label>
            <label className="contact-honeypot" aria-hidden="true" tabIndex={-1}>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
          </div>
          <div className="contact-form__bottom">
            <p id="contact-status" className={`form-status form-status--${submitState}`} role="status" aria-live="polite">{statusMessage || 'Your message goes directly to my inbox.'}</p>
            <button className="button button--light" type="submit" disabled={submitState === 'sending'}>
              {submitState === 'sending' ? 'Sending…' : 'Send message'} <Send size={15} aria-hidden="true" />
            </button>
          </div>
          <p className="form-fallback">If the form isn’t available, email me directly at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
        </form>
      </div>
    </section>
  );
};
