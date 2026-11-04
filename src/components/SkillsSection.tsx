import React, { useEffect, useRef } from 'react';
import { Braces, Database, Layers3, Palette, Smartphone, Sparkles } from 'lucide-react';
import { REPOSITORY_LANGUAGES } from '../data/portfolioData';

const areas = [
  { icon: Braces, title: 'Frontend development', note: 'Interfaces and web projects', technologies: ['TypeScript', 'JavaScript', 'HTML', 'CSS'] },
  { icon: Database, title: 'Backend & data', note: 'Server routes and app data', technologies: ['Node.js', 'Supabase'] },
  { icon: Smartphone, title: 'Application development', note: 'Mobile app exploration', technologies: ['Kotlin'] },
  { icon: Sparkles, title: 'AI integrations', note: 'Experimenting through public projects', technologies: ['OpenRouter', 'Qwen 3', 'Google GenAI'] },
  { icon: Palette, title: 'Interface design', note: 'Learning by shaping useful digital experiences', technologies: [] },
  { icon: Layers3, title: 'Full-stack learning', note: 'Connecting the parts into working products', technologies: [] },
];

const SKILLS_PATH = 'M 500 0 C 500 58 335 68 430 180 C 525 292 665 278 570 380 C 475 482 335 478 430 580 C 525 682 665 678 570 780 C 475 882 335 878 430 980 C 525 1082 665 1078 570 1180 L 570 1200';
const NODE_ANCHORS = [
  { x: 430, y: 180 }, { x: 570, y: 380 }, { x: 430, y: 580 },
  { x: 570, y: 780 }, { x: 430, y: 980 }, { x: 570, y: 1180 },
];

export const SkillsSection: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const cards = cardRefs.current.filter((card): card is HTMLElement => Boolean(card));
    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId = 0;
    let disposeAnimation: (() => void) | undefined;

    const showCardsFallback = () => {
      scene.classList.remove('skills-timeline--animated');
      cards.forEach((card) => {
        card.classList.remove('skill-item--revealed');
        card.style.removeProperty('opacity');
        card.style.removeProperty('visibility');
        card.style.removeProperty('transform');
      });
    };

    const init = () => {
      if (cancelled) return;
      try {
        let frame = 0;
        let progress = 0;

        const draw = (value: number) => {
          let activeIndex = -1;
          NODE_ANCHORS.forEach((anchor, index) => {
            if (value >= anchor.y / 1200 - .055) activeIndex = index;
          });
          cardRefs.current.forEach((card, index) => {
            if (!card) return;
            card.classList.toggle('skill-item--revealed', index === activeIndex);
          });
        };

        const calculateProgress = () => {
          const rect = scene.getBoundingClientRect();
          const start = window.innerHeight * .82;
          const end = -rect.height * .82;
          return Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
        };
        const updateFromScroll = () => {
          if (frame) return;
          frame = requestAnimationFrame(() => {
            frame = 0;
            progress = calculateProgress();
            draw(progress);
          });
        };

        progress = calculateProgress();
        draw(progress);
        scene.classList.add('skills-timeline--animated');
        window.addEventListener('scroll', updateFromScroll, { passive: true });
        window.addEventListener('resize', updateFromScroll);
        window.addEventListener('orientationchange', updateFromScroll);
        window.addEventListener('load', updateFromScroll);
        window.addEventListener('pageshow', updateFromScroll);
        updateFromScroll();
        disposeAnimation = () => {
          scene.classList.remove('skills-timeline--animated');
          if (frame) cancelAnimationFrame(frame);
          window.removeEventListener('scroll', updateFromScroll);
          window.removeEventListener('resize', updateFromScroll);
          window.removeEventListener('orientationchange', updateFromScroll);
          window.removeEventListener('load', updateFromScroll);
          window.removeEventListener('pageshow', updateFromScroll);
        };
      } catch (error) {
        console.error('Skills timeline initialization failed; showing all skill cards.', error);
        showCardsFallback();
      }
    };

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (typeof idleWindow.requestIdleCallback === 'function') {
      idleId = idleWindow.requestIdleCallback(init, { timeout: 200 });
    } else {
      timeoutId = window.setTimeout(init, 32);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
      disposeAnimation?.();
      showCardsFallback();
    };
  }, []);

  return (
    <section id="skills" className="section section--skills" aria-labelledby="skills-title">
      <div className="page-shell">
        <div className="section-header">
          <div><p className="eyebrow"><span className="section-number">02</span> SKILLS &amp; CURIOSITY</p><h2 id="skills-title" className="section-heading">What I’m <span className="text-silver">exploring.</span></h2></div>
          <p className="section-intro">Hands-on technologies surfaced in my public repositories, alongside the areas I’m learning about.</p>
        </div>

        <div className="skills-timeline" ref={sceneRef}>
          <svg className="skills-timeline__svg" viewBox="0 0 1000 1200" preserveAspectRatio="none" aria-hidden="true">
            <path className="skills-timeline__track" d={SKILLS_PATH} />
          </svg>
          {NODE_ANCHORS.map((anchor, index) => (
            <span key={`node-${index}`} className="skills-timeline__node" style={{ left: `${anchor.x / 10}%`, top: `${anchor.y / 12}%` }} aria-hidden="true">
              <span />
            </span>
          ))}

          {areas.map(({ icon: Icon, title, note, technologies }, index) => (
            <article
              ref={(element) => { cardRefs.current[index] = element; }}
              className={`skill-item ${index % 2 === 0 ? 'skill-item--right' : 'skill-item--left'}`}
              style={{ top: `${NODE_ANCHORS[index].y / 12}%` }}
              key={title}
              aria-label={`${title}. ${note}`}
            >
              <div className="skill-item__top"><span className="skill-item__number">0{index + 1}</span><Icon size={19} strokeWidth={1.4} aria-hidden="true" /></div>
              <h3>{title}</h3>
              <p>{note}</p>
              {technologies.length > 0 && <ul className="technology-list" aria-label={`Technologies shown in repositories for ${title}`}>
                {technologies.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>}
            </article>
          ))}
        </div>

        <div className="language-ledger">
          <div><span className="eyebrow">LANGUAGE METADATA</span><p>Languages appearing in the public repositories</p></div>
          <ul>{REPOSITORY_LANGUAGES.map((language) => <li key={language}>{language}<span aria-hidden="true"> /</span></li>)}</ul>
        </div>
        <p className="skills-disclaimer">Repository language labels are evidence of code in a project, not ratings of proficiency.</p>
      </div>
    </section>
  );
};
