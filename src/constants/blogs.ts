export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
}

export const blogs: BlogPost[] = [
  {
    id: 'ai-architecture-2026',
    title: 'Designing Self-Optimizing Agent Networks for Premium Enterprise Platforms',
    excerpt: 'How decentralized decision architectures are replacing traditional monolithic queue systems in microservice designs.',
    category: 'AI & Engineering',
    date: 'July 24, 2026',
    readTime: '6 min read'
  },
  {
    id: 'tailwind-v4-performance',
    title: 'Harnessing CSS-First Build Engines: Our Migration Path to Tailwind CSS v4',
    excerpt: 'Detailed analysis of compile times, bundle optimizations, and layout systems in Tailwind v4.',
    category: 'Frontend Engineering',
    date: 'June 18, 2026',
    readTime: '8 min read'
  },
  {
    id: 'lenis-scroll-ux',
    title: 'The Psychology of Motion: Why Inertial Smooth Scrolling Improves Brand Retention',
    excerpt: 'Scientific findings on user engagement when reading premium brand content with custom-tuned scroll physics.',
    category: 'Design & UX',
    date: 'May 12, 2026',
    readTime: '5 min read'
  }
];
