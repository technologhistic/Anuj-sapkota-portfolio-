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
