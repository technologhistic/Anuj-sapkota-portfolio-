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

    const pathLength = path.getTotalLength();
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
    let targetProgress = 0;
    let frame = 0;
    let lastTime = 0;

    const draw = (value: number) => {
      const distance = pathLength * value;
      progressPath.style.strokeDashoffset = `${pathLength - distance}`;
      const point = path.getPointAtLength(clamp(distance, 0, pathLength));
      particle.style.left = `${(point.x / 1000) * 100}%`;
      particle.style.top = `${(point.y / 1200) * 100}%`;
      nodePoints.forEach((nodePoint, index) => {
        const node = nodeRefs.current[index];
        const card = cardRefs.current[index];
        const nodeProgress = nodePoint.length / pathLength;
        const reveal = clamp((value - nodeProgress + .055) / .1);
        const glow = clamp((value - nodeProgress + .035) / .075);
        if (node) {
          node.style.setProperty('--node-glow', `${glow.toFixed(3)}`);
          node.classList.toggle('skill-node--lit', glow > .05);
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
      return clamp((window.innerHeight - rect.top) / (rect.height + window.innerHeight));
    };

    const animate = (now: number) => {
      frame = 0;
      const dt = lastTime ? Math.min(48, now - lastTime) : 16.667;
      lastTime = now;
      const ease = 1 - Math.exp(-dt / 48);
      progress += (targetProgress - progress) * ease;
      if (Math.abs(targetProgress - progress) < .0004) progress = targetProgress;
      draw(progress);
      if (progress !== targetProgress) frame = requestAnimationFrame(animate);
    };

    const updateFromScroll = () => {
      if (prefersReducedMotion.matches) {
        showStaticPath();
        return;
      }
      targetProgress = calculateProgress();
      if (!frame) frame = requestAnimationFrame(animate);
    };

    const showStaticPath = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      progress = targetProgress = 1;
      draw(1);
      particle.style.opacity = '0';
      nodeRefs.current.forEach((node) => node?.classList.add('skill-node--lit'));
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
      targetProgress = calculateProgress();
      progress = targetProgress;
      draw(progress);
    }
    window.addEventListener('scroll', updateFromScroll, { passive: true });
    window.addEventListener('resize', updateFromScroll);
    prefersReducedMotion.addEventListener('change', handleMotionPreference);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateFromScroll);
      window.removeEventListener('resize', updateFromScroll);
      prefersReducedMotion.removeEventListener('change', handleMotionPreference);
    };
  }, []);

  return (
    <section id="skills" className="section section--skills" aria-labelledby="skills-title">
      <div className="page-shell">
        <div className="section-header" data-reveal>
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
          {NODE_ANCHORS.map((_, index) => (
            <span key={`node-${index}`} ref={(element) => { nodeRefs.current[index] = element; }} className="skills-timeline__node" aria-hidden="true">
              <span />
            </span>
          ))}

          {areas.map(({ icon: Icon, title, note, technologies }, index) => (
            <article
              ref={(element) => { cardRefs.current[index] = element; }}
              className={`skill-item ${index % 2 === 0 ? 'skill-item--right' : 'skill-item--left'}`}
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

        <div className="language-ledger" data-reveal>
          <div><span className="eyebrow">LANGUAGE METADATA</span><p>Languages appearing in the public repositories</p></div>
          <ul>{REPOSITORY_LANGUAGES.map((language) => <li key={language}>{language}<span aria-hidden="true"> /</span></li>)}</ul>
        </div>
        <p className="skills-disclaimer">Repository language labels are evidence of code in a project, not ratings of proficiency.</p>
      </div>
    </section>
  );
};
