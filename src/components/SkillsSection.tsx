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

const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));

export const SkillsSection: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);
  const particleRef = useRef<HTMLSpanElement>(null);
  const nodeRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const scene = sceneRef.current;
    const path = pathRef.current;
    const progressPath = progressPathRef.current;
    const particle = particleRef.current;
    if (!scene || !path || !progressPath || !particle) return;
    const heading = headingRef.current;

    let pathLength = 0;
    try {
      pathLength = path.getTotalLength();
      if (!Number.isFinite(pathLength) || pathLength <= 0) throw new Error('Invalid skills path length');
    } catch (error) {
      // SVG measurement can fail during early Android WebView/Chrome layout.
      // Leave content in its visible CSS fallback state and report the failure.
      console.error('Skills timeline measurement failed; showing all skill cards.', error);
      return;
    }
    progressPath.style.strokeDasharray = `${pathLength}`;
    progressPath.style.strokeDashoffset = `${pathLength}`;
    const nodePoints = NODE_ANCHORS.map((anchor) => {
      let closestLength = 0;
      let closestDistance = Number.POSITIVE_INFINITY;
      for (let sample = 0; sample <= 1400; sample += 1) {
        const length = (pathLength * sample) / 1400;
        const point = path.getPointAtLength(length);
        const distance = (point.x - anchor.x) ** 2 + (point.y - anchor.y) ** 2;
        if (distance < closestDistance) {
          closestDistance = distance;
          closestLength = length;
        }
      }
      return { ...path.getPointAtLength(closestLength), length: closestLength };
    });

    nodePoints.forEach((point, index) => {
      const node = nodeRefs.current[index];
      const card = cardRefs.current[index];
      if (node) {
        node.style.left = `${(point.x / 1000) * 100}%`;
        node.style.top = `${(point.y / 1200) * 100}%`;
      }
      if (card) card.style.setProperty('--skill-node-y', `${(point.y / 1200) * 100}%`);
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let progress = 0;
    let headingProgress = 0;
    let scrollFrame = 0;

    const draw = (value: number, headingValue: number) => {
      const distance = pathLength * value;
      progressPath.style.strokeDashoffset = `${pathLength - distance}`;
      const point = path.getPointAtLength(clamp(distance, 0, pathLength));
      particle.style.left = `${(point.x / 1000) * 100}%`;
      particle.style.top = `${(point.y / 1200) * 100}%`;
      if (heading) {
        heading.style.opacity = `${headingValue.toFixed(3)}`;
        heading.style.transform = `translate3d(0, ${((1 - headingValue) * 22).toFixed(1)}px, 0)`;
        heading.style.visibility = 'visible';
      }
      nodePoints.forEach((nodePoint, index) => {
        const node = nodeRefs.current[index];
        const card = cardRefs.current[index];
        const nodeProgress = nodePoint.length / pathLength;
        const revealStart = Math.max(0, nodeProgress - .055);
        const revealEnd = Math.min(1, nodeProgress + .045);
        const reveal = clamp((value - revealStart) / Math.max(revealEnd - revealStart, .001));
        const glowStart = Math.max(0, nodeProgress - .035);
        const glowEnd = Math.min(1, nodeProgress + .04);
        const glow = clamp((value - glowStart) / Math.max(glowEnd - glowStart, .001));
        if (node) {
          node.style.setProperty('--node-glow', `${glow.toFixed(3)}`);
          node.classList.toggle('skills-timeline__node--lit', glow > .05);
        }
        if (card) {
          card.style.opacity = `${reveal.toFixed(3)}`;
          card.style.transform = `translate3d(0, ${((1 - reveal) * 24).toFixed(1)}px, 0)`;
          card.style.visibility = reveal > .005 ? 'visible' : 'hidden';
        }
      });
    };

    const calculateProgress = () => {
      const rect = scene.getBoundingClientRect();
      const start = window.innerHeight * 0.85;
      const end = -scene.offsetHeight + window.innerHeight * 0.2;

      return clamp((start - rect.top) / (start - end));
    };

    const calculateHeadingProgress = () => {
      if (!heading) return 1;
      const rect = heading.getBoundingClientRect();
      return clamp((window.innerHeight * .9 - rect.top) / Math.max(rect.height + window.innerHeight * .1, 1));
    };

    const updateFromScroll = () => {
      if (prefersReducedMotion.matches) {
        showStaticPath();
        return;
      }
      if (scrollFrame) return;

      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        progress = calculateProgress();
        headingProgress = calculateHeadingProgress();
        draw(progress, headingProgress);
      });
    };

    const showStaticPath = () => {
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      scrollFrame = 0;
      progress = 1;
      headingProgress = 1;
      draw(1, 1);
      particle.style.opacity = '0';
      nodeRefs.current.forEach((node) => node?.classList.add('skills-timeline__node--lit'));
    };

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      if (event.matches) showStaticPath();
      else {
        particle.style.opacity = '';
        updateFromScroll();
      }
    };

    if (prefersReducedMotion.matches) showStaticPath();
    else {
      progress = calculateProgress();
      headingProgress = calculateHeadingProgress();
      draw(progress, headingProgress);
      scene.classList.add('skills-timeline--animated');
    }
    window.addEventListener('scroll', updateFromScroll, { passive: true });
    window.addEventListener('resize', updateFromScroll);
    window.addEventListener('orientationchange', updateFromScroll);
    window.addEventListener('load', updateFromScroll);
    window.addEventListener('pageshow', updateFromScroll);
    updateFromScroll();
    prefersReducedMotion.addEventListener('change', handleMotionPreference);

    return () => {
      scene.classList.remove('skills-timeline--animated');
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      window.removeEventListener('scroll', updateFromScroll);
      window.removeEventListener('resize', updateFromScroll);
      window.removeEventListener('orientationchange', updateFromScroll);
      window.removeEventListener('load', updateFromScroll);
      window.removeEventListener('pageshow', updateFromScroll);
      prefersReducedMotion.removeEventListener('change', handleMotionPreference);
    };
  }, []);

  return (
    <section id="skills" className="section section--skills" aria-labelledby="skills-title">
      <div className="page-shell">
        <div className="section-header" ref={headingRef}>
          <div><p className="eyebrow"><span className="section-number">02</span> SKILLS &amp; CURIOSITY</p><h2 id="skills-title" className="section-heading">What I’m <span className="text-silver">exploring.</span></h2></div>
          <p className="section-intro">Hands-on technologies surfaced in my public repositories, alongside the areas I’m learning about.</p>
        </div>

        <div className="skills-timeline" ref={sceneRef}>
          <svg className="skills-timeline__svg" viewBox="0 0 1000 1200" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="skills-path-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d9eaff" />
                <stop offset="48%" stopColor="#82bfff" />
                <stop offset="100%" stopColor="#f2f6ff" />
              </linearGradient>
            </defs>
            <path ref={pathRef} className="skills-timeline__track" d={SKILLS_PATH} />
            <path ref={progressPathRef} className="skills-timeline__progress" d={SKILLS_PATH} />
          </svg>
          <span ref={particleRef} className="skills-timeline__particle" aria-hidden="true" />
          {NODE_ANCHORS.map((anchor, index) => (
            <span key={`node-${index}`} ref={(element) => { nodeRefs.current[index] = element; }} className="skills-timeline__node" style={{ left: `${anchor.x / 10}%`, top: `${anchor.y / 12}%` }} aria-hidden="true">
              <span />
            </span>
          ))}

          {areas.map(({ icon: Icon, title, note, technologies }, index) => (
            <article
              ref={(element) => { cardRefs.current[index] = element; }}
              className={`skill-item ${index % 2 === 0 ? 'skill-item--right' : 'skill-item--left'}`}
              style={{ '--skill-node-y': `${NODE_ANCHORS[index].y / 12}%` } as React.CSSProperties}
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
