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

function closestLengthOnPath(
  path: SVGPathElement,
  pathLength: number,
  targetX: number,
  targetY: number,
) {
  const distanceAt = (length: number) => {
    const point = path.getPointAtLength(length);
    return (point.x - targetX) ** 2 + (point.y - targetY) ** 2;
  };

  const coarseSteps = 48;
  const stepLength = pathLength / coarseSteps;
  let closestLength = 0;
  let closestDistance = Number.POSITIVE_INFINITY;

  for (let step = 0; step <= coarseSteps; step += 1) {
    const length = stepLength * step;
    const distance = distanceAt(length);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestLength = length;
    }
  }

  let low = Math.max(0, closestLength - stepLength);
  let high = Math.min(pathLength, closestLength + stepLength);
  for (let iteration = 0; iteration < 4; iteration += 1) {
    const leftThird = low + (high - low) / 3;
    const rightThird = high - (high - low) / 3;
    if (distanceAt(leftThird) <= distanceAt(rightThird)) high = rightThird;
    else low = leftThird;
  }

  closestLength = (low + high) / 2;
  return { ...path.getPointAtLength(closestLength), length: closestLength };
}

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
    const sectionHeading = headingRef.current;
    const cards = cardRefs.current.filter((card): card is HTMLElement => Boolean(card));
    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId = 0;
    let disposeAnimation: (() => void) | undefined;

    const showCardsFallback = () => {
      scene.classList.remove('skills-timeline--animated');
      cards.forEach((card) => {
        card.style.removeProperty('opacity');
        card.style.removeProperty('visibility');
        card.style.removeProperty('transform');
      });
      if (sectionHeading) {
        sectionHeading.style.removeProperty('opacity');
        sectionHeading.style.removeProperty('visibility');
        sectionHeading.style.removeProperty('transform');
      }
    };

    const init = () => {
      if (cancelled) return;
      try {
        const pathLength = path.getTotalLength();
        if (!Number.isFinite(pathLength) || pathLength <= 0) throw new Error('Invalid skills path length');
        const nodePoints = NODE_ANCHORS.map(({ x, y }) => closestLengthOnPath(path, pathLength, x, y));
        const heading = headingRef.current;

        progressPath.style.strokeDasharray = `${pathLength}`;
        progressPath.style.strokeDashoffset = `${pathLength}`;
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
        let headingProgress = 0;
        let targetHeadingProgress = 0;
        let frame = 0;
        let lastTime = 0;

        const draw = (value: number, headingValue: number) => {
          const distance = pathLength * value;
          progressPath.style.strokeDashoffset = `${pathLength - distance}`;
          const point = path.getPointAtLength(clamp(distance, 0, pathLength));
          particle.style.left = `${(point.x / 1000) * 100}%`;
          particle.style.top = `${(point.y / 1200) * 100}%`;
          if (heading) {
            heading.style.opacity = `${headingValue.toFixed(3)}`;
            const headingTravel = prefersReducedMotion.matches ? 6 : 22;
            heading.style.transform = `translate3d(0, ${((1 - headingValue) * headingTravel).toFixed(1)}px, 0)`;
            heading.style.visibility = 'visible';
          }
          nodePoints.forEach((nodePoint, index) => {
            const node = nodeRefs.current[index];
            const card = cardRefs.current[index];
            const nodeProgress = nodePoint.length / pathLength;
            const revealStart = Math.max(0, nodeProgress - .035);
            const revealEnd = Math.min(1, revealStart + .11);
            const rawReveal = value >= .999 ? 1 : clamp((value - revealStart) / Math.max(revealEnd - revealStart, .001));
            const reveal = rawReveal * rawReveal * (3 - 2 * rawReveal);
            const glowStart = Math.max(0, nodeProgress - .035);
            const glowEnd = Math.min(1, nodeProgress + .04);
            const glow = clamp((value - glowStart) / Math.max(glowEnd - glowStart, .001));
            if (node) {
              node.style.setProperty('--node-glow', `${glow.toFixed(3)}`);
              node.classList.toggle('skills-timeline__node--lit', glow > .05);
            }
            if (card) {
              card.style.opacity = `${reveal.toFixed(3)}`;
              const fallOffset = (1 - reveal) ** 2 * (prefersReducedMotion.matches ? -16 : -160);
              const fallRotation = prefersReducedMotion.matches ? 0 : (1 - reveal) * -5;
              card.style.transform = `perspective(900px) translate3d(0, ${fallOffset.toFixed(1)}px, 0) rotateX(${fallRotation.toFixed(2)}deg)`;
              card.style.visibility = reveal > .005 ? 'visible' : 'hidden';
            }
          });
        };

        const calculateProgress = () => {
          const rect = scene.getBoundingClientRect();
          return clamp((window.innerHeight * .62 - rect.top) / Math.max(rect.height, 1));
        };
        const calculateHeadingProgress = () => {
          if (!heading) return 1;
          const rect = heading.getBoundingClientRect();
          return clamp((window.innerHeight * .92 - rect.top) / Math.max(window.innerHeight * .22, 1));
        };

        const animate = (now: number) => {
          frame = 0;
          const dt = lastTime ? Math.min(48, now - lastTime) : 16.667;
          lastTime = now;
          const easing = 1 - Math.exp(-dt / (prefersReducedMotion.matches ? 28 : 48));
          progress += (targetProgress - progress) * easing;
          headingProgress += (targetHeadingProgress - headingProgress) * easing;
          if (Math.abs(targetProgress - progress) < .0004) progress = targetProgress;
          if (Math.abs(targetHeadingProgress - headingProgress) < .002) headingProgress = targetHeadingProgress;
          draw(progress, headingProgress);
          if (progress !== targetProgress || headingProgress !== targetHeadingProgress) frame = requestAnimationFrame(animate);
        };

        const updateFromScroll = () => {
          particle.style.opacity = prefersReducedMotion.matches ? '0' : '';
          targetProgress = calculateProgress();
          targetHeadingProgress = calculateHeadingProgress();
          if (!frame) frame = requestAnimationFrame(animate);
        };
        const handleMotionPreference = () => {
          updateFromScroll();
        };

        progress = targetProgress = calculateProgress();
        headingProgress = targetHeadingProgress = calculateHeadingProgress();
        draw(progress, headingProgress);
        particle.style.opacity = prefersReducedMotion.matches ? '0' : '';
        scene.classList.add('skills-timeline--animated');
        window.addEventListener('scroll', updateFromScroll, { passive: true });
        window.addEventListener('resize', updateFromScroll);
        window.addEventListener('orientationchange', updateFromScroll);
        window.addEventListener('load', updateFromScroll);
        window.addEventListener('pageshow', updateFromScroll);
        updateFromScroll();
        prefersReducedMotion.addEventListener('change', handleMotionPreference);

        disposeAnimation = () => {
          scene.classList.remove('skills-timeline--animated');
          if (frame) cancelAnimationFrame(frame);
          window.removeEventListener('scroll', updateFromScroll);
          window.removeEventListener('resize', updateFromScroll);
          window.removeEventListener('orientationchange', updateFromScroll);
          window.removeEventListener('load', updateFromScroll);
          window.removeEventListener('pageshow', updateFromScroll);
          prefersReducedMotion.removeEventListener('change', handleMotionPreference);
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
