export const GITHUB_URL = 'https://github.com/technologhistic';
export const CONTACT_EMAIL = 'anujminer@gmail.com';

export const PERSONAL_INFO = {
  name: 'Anuj Sapkota',
  title: '+2 Computer Science student · Software development',
  location: 'Nepal',
  institution: 'Liberty Secondary School (Liberty SS College)',
  github: GITHUB_URL,
  email: CONTACT_EMAIL,
  philosophy: 'Learn. Build. Experiment. Improve.',
  bio: 'I’m Anuj Sapkota, a Computer Science student interested in how thoughtful software turns ideas into useful digital products. I’m building my foundations across frontend, backend, and application development by studying modern tools, experimenting with new ideas, and learning from each project I share.',
};

// These are repository language signals, not skill or proficiency ratings.
export const REPOSITORY_LANGUAGES = ['TypeScript', 'JavaScript', 'HTML', 'CSS', 'Kotlin'];

export type PortfolioProject = {
  name: string;
  category: string;
  description: string;
  repository: string;
  demo?: string;
  demoNote?: string;
  technologies: string[];
  image: string;
  imageAlt: string;
  imageKind: 'live preview' | 'repository preview';
};

// Names, summaries, language labels, and links below are grounded in Anuj's public GitHub repositories.
export const PROJECTS: PortfolioProject[] = [
  {
    name: 'Easywebsite',
    category: 'Web tool',
    description: 'A web tool for extracting a website’s HTML, CSS, JavaScript, and assets with a live preview and export flow.',
    repository: 'https://github.com/technologhistic/Easywebsite-',
    demo: 'https://easywebsite.ai.studio/',
    technologies: ['TypeScript', 'HTML', 'CSS'],
    image: '/assets/projects/easywebsite.png',
    imageAlt: 'Screenshot of the live Easywebsite application.',
    imageKind: 'live preview',
  },
  {
    name: 'Ultimate AI',
    category: 'AI experiment',
    description: 'A browser-based Qwen chat application using OpenRouter, with a server-side API and local conversation history.',
    repository: 'https://github.com/technologhistic/Ultimate-ai',
    demo: 'https://ultimate-ai-nine.vercel.app',
    demoNote: 'OpenRouter key required',
    technologies: ['TypeScript', 'HTML', 'CSS', 'OpenRouter', 'Qwen 3'],
    image: '/assets/projects/ultimate-ai.png',
    imageAlt: 'Screenshot of the deployed Ultimate AI chat interface.',
    imageKind: 'live preview',
  },
  {
    name: 'AI Study Buddy',
    category: 'Learning app',
    description: 'An AI-powered study app for homework help, concept explanations, revision notes, quizzes, and study planning.',
    repository: 'https://github.com/technologhistic/ai-study-buddy-',
    demo: 'https://ai-study-buddy-indol.vercel.app',
    technologies: [],
    image: '/assets/projects/ai-study.png',
    imageAlt: 'Screenshot of the deployed AI Study Buddy sign-in page.',
    imageKind: 'live preview',
  },
  {
    name: 'Game-zone',
    category: 'Browser game',
    description: 'A browser reflex game with an evasive button, score tracking, and a real-time leaderboard.',
    repository: 'https://github.com/technologhistic/Game-zone',
    technologies: ['TypeScript', 'HTML', 'CSS', 'Supabase'],
    image: '/assets/projects/game-zone.png',
    imageAlt: 'Screenshot of the Game-zone GitHub repository and its source files.',
    imageKind: 'repository preview',
  },
  {
    name: 'Liter-ledger',
    category: 'Android app',
    description: 'A Kotlin application for tracking daily liter sales.',
    repository: 'https://github.com/technologhistic/Liter-ledger',
    technologies: ['Kotlin', 'HTML'],
    image: '/assets/projects/liter-ledger.png',
    imageAlt: 'Screenshot of the Liter-ledger GitHub repository and its Android project files.',
    imageKind: 'repository preview',
  },
];
