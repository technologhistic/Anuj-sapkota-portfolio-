export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Full-Stack' | 'Design Systems' | 'Developer Tools' | 'Web Apps';
  year: string;
  image: string;
  summary: string;
  description: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  liveUrl?: string;
  githubUrl?: string;
  myContributions: string[];
  caseStudy: {
    overview: string;
    challenge: string;
    solution: string;
    architecture: string[];
    performanceHighlights: { metric: string; before?: string; after: string; note: string }[];
    codeSnippet?: {
      filename: string;
      language: string;
      code: string;
    };
    impact: string;
  };
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: 'Core' | 'Advanced' | 'Proficient';
    context: string;
  }[];
}

export interface Achievement {
  id: string;
  year: string;
  title: string;
  issuer: string;
  description: string;
  metric?: string;
  category: 'Competition' | 'Open Source' | 'Academic' | 'Algorithm';
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade: string;
  honors: string;
  coreCourses: string[];
  capstone: {
    title: string;
    description: string;
  };
}

export const PERSONAL_INFO = {
  name: 'Anuj Sapkota',
  title: 'Frontend Developer / Aspiring Software Engineer',
  domain: 'anujsapkota.com.np',
  email: 'sapkotalaxmi703@gmail.com',
  secondaryEmail: 'contact@anujsapkota.com.np',
  location: 'Kathmandu, Nepal',
  coordinates: '27.7172° N, 85.3240° E',
  timezone: 'Asia/Kathmandu',
  utcOffset: 'UTC+5:45',
  headline: 'Building digital experiences with purpose.',
  bioLead:
    'Frontend Developer and Aspiring Software Engineer crafting purposeful, performant web applications with modern architecture and luxury editorial aesthetics.',
  bioExtended:
    'Dedicated to bridging architectural discipline with nuanced design engineering. Specializing in TypeScript, modern React architectures, accessible interface systems, and low-latency client-side state.',
  status: 'Open to full-time roles & select engineering collaborations',
  socials: {
    github: 'https://github.com/anujsapkota',
    linkedin: 'https://linkedin.com/in/anujsapkota',
    twitter: 'https://twitter.com/anujsapkota',
    leetcode: 'https://leetcode.com/u/anujsapkota',
  },
};

export const PROJECTS: Project[] = [
  {
    id: 'atlas-prime',
    title: 'Atlas Prime',
    subtitle: 'Institutional-Grade Financial Analytics & Market Intelligence',
    category: 'Full-Stack',
    year: '2025',
    image: '/src/assets/images/project_fintech_dashboard_1793673851090.jpg',
    summary:
      'High-throughput web dashboard streaming tick-level orderbook data, portfolio variance, and asset performance with zero frame drops.',
    description:
      'Designed and engineered a high-frequency market intelligence platform providing low-latency portfolio tracking, interactive order-book visualization, and real-time asset analytics.',
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Zustand', 'WebSocket', 'Canvas API'],
    metrics: [
      { label: 'Streaming Latency', value: '< 45ms' },
      { label: 'Render Frame Rate', value: '60 fps' },
      { label: 'Lighthouse Performance', value: '99/100' },
      { label: 'Layout Shift (CLS)', value: '0.00' },
    ],
    liveUrl: 'https://anujsapkota.com.np/projects/atlas-prime',
    githubUrl: 'https://github.com/anujsapkota/atlas-prime-engine',
    myContributions: [
      'Engineered binary RingBuffer to ingest and batch 120+ WebSocket ticks/sec with zero memory allocations',
      'Constructed custom HTML5 Canvas candlestick and order-book chart pipeline locked at 60fps',
      'Eliminated React re-render cascades using Zustand transient state subscriptions',
      'Maintained 0.00 Cumulative Layout Shift and 99/100 Lighthouse performance on low-end mobile devices',
    ],
    caseStudy: {
      overview:
        'Financial analysts face cluttered, laggy dashboards that struggle to render high-velocity tick streams. Atlas Prime was built from first principles to decouple real-time WebSocket ingestion from the DOM render loop.',
      challenge:
        'Incoming market updates arrived at up to 120 messages per second. Standard React component tree updates caused severe thrashing, dropped frames, and memory leaks over prolonged trading sessions.',
      solution:
        'Engineered an offscreen batching buffer using requestAnimationFrame and a canvas-backed chart renderer. State was partitioned into hot (tick prices via mutable buffers) and cold (user portfolio metadata in Zustand).',
      architecture: [
        'Decoupled WebSocket worker thread for binary packet decompression and JSON parsing',
        'Zustand-based transient subscriptions skipping redundant React reconciliation passes',
        'Canvas-based candlestick graph engine with custom crosshair interpolation',
        'Zero-allocation RingBuffer data structure for rolling tick time-series data',
      ],
      performanceHighlights: [
        { metric: 'DOM Nodes Rendered', before: '14,200', after: '320', note: 'Virtualization & Canvas' },
        { metric: 'CPU Utilization', before: '68%', after: '11%', note: 'Frame-locked rAF rendering' },
        { metric: 'Bundle Size (Gzipped)', before: '420 KB', after: '68 KB', note: 'Zero heavy charting libs' },
      ],
      codeSnippet: {
        filename: 'src/engine/TickBuffer.ts',
        language: 'typescript',
        code: `export class TickBuffer {
  private buffer: Float64Array;
  private pointer = 0;
  private capacity: number;

  constructor(capacity = 1000) {
    this.capacity = capacity;
    this.buffer = new Float64Array(capacity * 2); // [timestamp, price]
  }

  public push(timestamp: number, price: number): void {
    const idx = (this.pointer % this.capacity) * 2;
    this.buffer[idx] = timestamp;
    this.buffer[idx + 1] = price;
    this.pointer++;
  }

  public getSnapshot(): Float64Array {
    return this.buffer.subarray(0, Math.min(this.pointer, this.capacity) * 2);
  }
}`,
      },
      impact:
        'Successfully handles 10,000+ data points per minute with silky smooth interactions, earning acclaim during internal university engineering showcases.',
    },
  },
  {
    id: 'modulr-design-system',
    title: 'Modulr',
    subtitle: 'Mathematical Design Token Engine & Component Studio',
    category: 'Design Systems',
    year: '2025',
    image: '/src/assets/images/project_design_system_1793673851009.jpg',
    summary:
      'Precision architectural design system and visualizer with harmonic spatial typography, nested radius calculus, and WCAG AAA compliance.',
    description:
      'Component architecture visualizer and design token engine for enterprise web applications with mathematical spatial systems and automated contrast auditing.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'CSS Variables', 'Radix UI', 'AST Tools'],
    metrics: [
      { label: 'Token Combinations', value: '180+' },
      { label: 'WCAG Compliance', value: 'AAA' },
      { label: 'Accessibility Score', value: '100/100' },
      { label: 'Bundle Footprint', value: '12.4 KB' },
    ],
    liveUrl: 'https://anujsapkota.com.np/projects/modulr',
    githubUrl: 'https://github.com/anujsapkota/modulr-tokens',
    myContributions: [
      'Architected mathematical token generator converting design variables into deterministic CSS custom properties',
      'Implemented automated nested radius formula (r_inner = r_outer - padding) across 40+ primitives',
      'Engineered accessible headless primitives conforming strictly to WCAG AAA color contrast ratios',
      'Reduced runtime CSS payload from 85 KB to 4.1 KB via automated Tailwind v4 utility extraction',
    ],
    caseStudy: {
      overview:
        'Design systems frequently diverge between Figma tokens and code implementations. Modulr automates mathematical token generation, guaranteeing pixel-perfect alignment and strict contrast boundaries.',
      challenge:
        'Maintaining dual-theme consistency and mathematical nested corner radiuses (r_inner = r_outer - padding) across 40+ primitives without manual calculations or visual degradation.',
      solution:
        'Built a centralized token generator that outputs deterministic CSS custom properties derived from base modular scales (4px grid, 1.25 golden ratio type scales, and OKLCH color spaces).',
      architecture: [
        'OKLCH perceptual color space for uniform lightness transitions in light and dark modes',
        'Automatic nested radius formula generator injected directly into layout containers',
        'AST-based linter that warns engineers against unboxed pill containers and broken contrast',
        'Headless accessible primitives built on top of Radix UI foundations',
      ],
      performanceHighlights: [
        { metric: 'Design Token Build Time', before: '4.2s', after: '120ms', note: 'Esbuild worker pipeline' },
        { metric: 'Runtime CSS Overhead', before: '85 KB', after: '4.1 KB', note: 'Tailwind v4 utility trees' },
      ],
      codeSnippet: {
        filename: 'src/tokens/geometry.ts',
        language: 'typescript',
        code: `export function calculateNestedRadius(outerRadiusPx: number, paddingPx: number): number {
  const calculated = outerRadiusPx - paddingPx;
  return calculated > 0 ? calculated : 0;
}

export const SPATIAL_SCALE = {
  xs: '0.25rem',  // 4px
  sm: '0.5rem',   // 8px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2.5rem',   // 40px
} as const;`,
      },
      impact:
        'Adopted by 8 student team capstone projects to standardize UI consistency and eliminate design bugs.',
    },
  },
  {
    id: 'himalayan-trail-atlas',
    title: 'Himalayan Heritage Atlas',
    subtitle: 'Offline-First Geospatial Guide & Topographic Visualizer',
    category: 'Web Apps',
    year: '2024',
    image: '/src/assets/images/heritage_atlas_preview_1793677518262.jpg',
    summary:
      'High-performance interactive geospatial guide for historic architectural landmarks and mountain routes in Nepal with zero-latency offline caching.',
    description:
      'Created an offline-first progressive web application combining vector contour maps, elevation profiles, and cultural heritage histories for the Kathmandu Valley and Annapurna trails.',
    techStack: ['React', 'TypeScript', 'IndexedDB', 'PWA / Service Workers', 'GeoJSON', 'Canvas'],
    metrics: [
      { label: 'Offline Usability', value: '100%' },
      { label: 'Cache Footprint', value: '< 24 MB' },
      { label: 'Initial TTI', value: '0.8s' },
      { label: 'Trail Waypoints', value: '250+' },
    ],
    liveUrl: 'https://anujsapkota.com.np/projects/heritage-atlas',
    githubUrl: 'https://github.com/anujsapkota/himalayan-trail-atlas',
    myContributions: [
      'Architected multi-tier offline caching strategy leveraging Service Workers, Cache API, and IndexedDB',
      'Built off-thread Web Worker calculating topographic elevation profiles with zero main-thread lag',
      'Optimized GeoJSON topology vectors reducing coordinate payload weight by 78%',
      'Engineered touch-first mobile exploration interface with battery-saving dark vector tiles',
    ],
    caseStudy: {
      overview:
        'Hikers and heritage enthusiasts exploring Nepal often experience complete cellular signal dropouts. The Atlas provides full vector map manipulation and elevation calculation without network connectivity.',
      challenge:
        'Delivering detailed vector topography and elevation elevation profiles on low-powered mobile devices with strict storage constraints and intermittent connectivity.',
      solution:
        'Architected a multi-tier caching strategy using Service Workers with Cache API for static assets and IndexedDB for tile vector chunks. Topographic profiles are computed on the client via Web Workers.',
      architecture: [
        'GeoJSON simplification pipeline reducing coordinate payload size by 78%',
        'Service Worker precaching strategy with background sync when connectivity resumes',
        'Bilinear elevation interpolation worker for instant ascent/descent calculations',
      ],
      performanceHighlights: [
        { metric: 'Offline Load Time', before: 'N/A (Failed)', after: '340ms', note: 'Service Worker cache' },
        { metric: 'Map Tile Storage', before: '110 MB', after: '18.4 MB', note: 'Vector simplification' },
      ],
      impact:
        'Featured in campus tech showcases for combining cultural preservation with modern web performance engineering.',
    },
  },
  {
    id: 'syntax-lens',
    title: 'SyntaxLens',
    subtitle: 'AST Structural Code Explorer & Bundle Cost Profiler',
    category: 'Developer Tools',
    year: '2024',
    image: '/src/assets/images/syntax_lens_preview_1793677519023.jpg',
    summary:
      'Developer tool parsing TypeScript codebases into visual syntax trees and quantifying AST node complexity and production bundle weight.',
    description:
      'Lightweight developer workbench that introspects TypeScript syntax trees in real-time, highlighting circular dependencies, dead code paths, and bundle cost multipliers.',
    techStack: ['TypeScript', 'Vite', 'Babel Parser', 'Web Workers', 'Tailwind CSS'],
    metrics: [
      { label: 'Parse Time', value: '< 18ms' },
      { label: 'Zero Server Cost', value: '100% Client' },
      { label: 'Node Inspection', value: 'Interactive' },
      { label: 'Memory Footprint', value: '< 35 MB' },
    ],
    liveUrl: 'https://anujsapkota.com.np/projects/syntaxlens',
    githubUrl: 'https://github.com/anujsapkota/syntax-lens',
    myContributions: [
      'Implemented Web Worker isolation for non-blocking Babel AST compilation of large TypeScript files',
      'Constructed virtualized tree view capable of fluidly navigating 10,000+ syntax nodes at 60fps',
      'Developed package cost heuristics detecting heavy imports and bundle bloat in production bundles',
      'Delivered 100% client-side privacy with zero server dependency or telemetry',
    ],
    caseStudy: {
      overview:
        'Frontend developers often inadvertently introduce expensive imports and deep component hierarchies. SyntaxLens gives instant visual transparency directly in the browser.',
      challenge:
        'Executing full TypeScript AST parsing without freezing the UI thread during large file edits.',
      solution:
        'Implemented Web Worker offloading for Babel parser execution and transformed AST nodes into a flat virtualized tree component for immediate inspection.',
      architecture: [
        'Web Worker isolation for non-blocking syntax tree compilation',
        'Virtualized tree view rendering only visible viewport nodes',
        'Deterministic import cost estimation based on standard export signatures',
      ],
      performanceHighlights: [
        { metric: 'UI Freeze Duration', before: '840ms', after: '0ms', note: 'Offloaded to Worker' },
        { metric: 'Tree Navigation FPS', before: '24 fps', after: '60 fps', note: 'DOM Virtualization' },
      ],
      impact:
        'Over 300+ GitHub stars and widely utilized by peers for auditing code quality in final semester deliverables.',
    },
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Core Frontend Engineering',
    description: 'Foundational mastery of the modern web platform, standards, and runtime performance.',
    skills: [
      { name: 'TypeScript', level: 'Core', context: 'Strict type safety, generics, AST parsing, interfaces' },
      { name: 'JavaScript (ES2024)', level: 'Core', context: 'Event loop, closures, memory lifecycle, asynchronous flows' },
      { name: 'React 19 & Next.js', level: 'Core', context: 'Hooks, Suspense, Server Components, Concurrent Mode' },
      { name: 'Modern CSS & Tailwind CSS', level: 'Core', context: 'Tailwind v4, CSS Grid, container queries, CSS variables' },
      { name: 'Semantic HTML & Accessibility', level: 'Core', context: 'WCAG AAA, ARIA authoring patterns, screen-reader parity' },
    ],
  },
  {
    title: 'Architecture & State Management',
    description: 'Disciplined application structure, predictable data flows, and state synchronization.',
    skills: [
      { name: 'Zustand & TanStack Query', level: 'Advanced', context: 'Transient updates, optimistic mutations, server cache synchronization' },
      { name: 'Component Architecture', level: 'Advanced', context: 'Compound components, headless primitives, strict separation of concerns' },
      { name: 'State Machines & Reducers', level: 'Proficient', context: 'Deterministic state transitions, avoiding impossible UI states' },
      { name: 'Design Tokens & Systems', level: 'Advanced', context: 'Harmonic spatial grids, mathematical typography scales, theme contracts' },
    ],
  },
  {
    title: 'Performance & Web APIs',
    description: 'Obsessive optimization for Core Web Vitals and low-latency interaction.',
    skills: [
      { name: 'Core Web Vitals Optimization', level: 'Advanced', context: 'LCP sub-second, zero CLS, INP latency minimization' },
      { name: 'WebSockets & Streaming', level: 'Proficient', context: 'Real-time duplex feeds, binary buffers, heartbeat reconnection' },
      { name: 'Web Workers & Offscreen Canvas', level: 'Proficient', context: 'Off-thread computations, background compression, 60fps charting' },
      { name: 'Service Workers & PWA', level: 'Proficient', context: 'IndexedDB offline caching, background sync, installability' },
    ],
  },
  {
    title: 'Backend, Tools & Deployment',
    description: 'Full-stack fundamentals, developer tooling, and production delivery pipelines.',
    skills: [
      { name: 'Node.js & Express', level: 'Proficient', context: 'RESTful API contracts, middleware, error handling, rate limiting' },
      { name: 'PostgreSQL & Databases', level: 'Proficient', context: 'Relational schemas, indexing strategies, ACID compliance' },
      { name: 'Git & GitHub Workflows', level: 'Core', context: 'Feature branch hygiene, interactive rebasing, semantic commit history' },
      { name: 'Vite & Build Tooling', level: 'Advanced', context: 'Rollup bundling, tree-shaking, code-splitting strategies' },
      { name: 'Testing & Quality Assurance', level: 'Proficient', context: 'Unit testing with Vitest/Jest, end-to-end testing, ESLint configuration' },
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'Bachelor of Science in Computer Science & Information Technology (B.Sc. CSIT)',
    institution: 'Tribhuvan University Affiliated Institute',
    location: 'Kathmandu, Nepal',
    period: '2021 — 2025',
    grade: 'First Division with Distinction (Top 5% of Cohort)',
    honors: "Dean's Commendation for Academic & Engineering Excellence",
    coreCourses: [
      'Data Structures & Algorithms',
      'Database Management Systems',
      'Operating Systems & Systems Architecture',
      'Computer Networks & Protocols',
      'Software Engineering Methodologies',
      'Web Technologies & Distributed Computing',
      'Object-Oriented Software Design',
      'Theory of Computation',
    ],
    capstone: {
      title: 'Decoupled High-Throughput Web Telemetry & Visualization Engine',
      description:
        'Researched and built a real-time web telemetry platform combining Web Workers, typed ArrayBuffers, and HTML5 Canvas to eliminate UI thread blocking during high-volume data streams.',
    },
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    year: '2024',
    title: 'National Collegiate Hackathon — 1st Runner Up & Best UI/UX',
    issuer: 'Kathmandu Tech Forum & Youth in Tech',
    description:
      'Led the frontend engineering of a 4-person team to build an offline emergency medical supply coordination system under a 36-hour sprint.',
    metric: 'Selected among 48 competing collegiate teams',
    category: 'Competition',
  },
  {
    id: 'ach-2',
    year: '2024',
    title: 'Algorithmic Problem Solving Mastery',
    issuer: 'LeetCode & HackerRank',
    description:
      'Demonstrated consistent computational thinking by solving 180+ algorithmic challenges spanning dynamic programming, graph theory, and tree traversals.',
    metric: '180+ Problems Solved · Top 15% Rating',
    category: 'Algorithm',
  },
  {
    id: 'ach-3',
    year: '2023 — Present',
    title: 'Open Source UI & Web Standards Contributor',
    issuer: 'Open Source Community',
    description:
      'Authored accessibility fixes, documentation enhancements, and TypeScript typing corrections in widely used open-source developer tooling repositories.',
    metric: 'Active GitHub Contributor',
    category: 'Open Source',
  },
  {
    id: 'ach-4',
    year: '2023',
    title: 'Academic Excellence Award & Department Scholar',
    issuer: 'Department of Computer Science',
    description:
      'Awarded for outstanding academic performance across algorithms, systems programming, and modern software design principles.',
    metric: 'Maintained 3.85+ Cumulative GPA',
    category: 'Academic',
  },
];
