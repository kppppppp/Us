import ariya from '../assets/projects/ariya.webp';
import deltaorbit from '../assets/projects/deltaorbit.webp';
import downtime from '../assets/projects/downtime.webp';
import gaimauli from '../assets/projects/gaimauli.webp';
import newstar from '../assets/projects/newstar.webp';
import shantabai from '../assets/projects/shantabai.webp';
import unexpected from '../assets/projects/unexpected.webp';
import yash from '../assets/projects/yash.webp';
import yjp from '../assets/projects/yjp.webp';

export interface CaseStudy {
  id: string;
  name: string;
  industry: string;
  description: string;
  image: string;
  services: string[];
  technologies: string[];
  website: string;
  tags?: string[];
  featured?: boolean;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'ariya',
    name: 'Ariya Luxury',
    industry: 'Luxury E-Commerce & Retail',
    description: 'Bespoke high-performance digital flagship boutique for premium jewelry collections, focusing on rich sensory interactions, immersive typography, and cinematic transitions.',
    image: ariya,
    services: ['Creative Direction', 'WebGL Experience', 'E-Commerce Engineering'],
    technologies: ['React', 'Next.js', 'WebGL', 'Tailwind CSS', 'Shopify GraphQL'],
    website: 'https://ariya.luxury',
    tags: ['E-Commerce', 'Bespoke', 'WebGL'],
    featured: true
  },
  {
    id: 'deltaorbit',
    name: 'Delta Orbit',
    industry: 'Aerospace & Logistics',
    description: 'Enterprise orbital fleet tracking platform providing high-frequency data telemetry dashboards, volumetric resource planning, and predictive fleet scheduling analytics.',
    image: deltaorbit,
    services: ['Dashboard Architecture', 'Data Visualizations', 'Telemetry Integration'],
    technologies: ['React', 'TypeScript', 'Three.js', 'WebSockets', 'Tailwind CSS'],
    website: 'https://deltaorbit.space',
    tags: ['Logistics', 'Real-time', 'Analytics'],
    featured: true
  },
  {
    id: 'downtime',
    name: 'Downtime Alert',
    industry: 'DevOps & Infrastructure Monitoring',
    description: 'Minimalist SaaS infrastructure health tracker designed for modern developer teams. Features instant global edge heartbeats, visual alert configuration, and low-latency notifications.',
    image: downtime,
    services: ['Brand Architecture', 'Product Design', 'React Frontend'],
    technologies: ['React', 'Framer Motion', 'Tailwind CSS', 'Vite'],
    website: 'https://downtime.alert',
    tags: ['SaaS', 'DevOps', 'Developer Tool'],
    featured: false
  },
  {
    id: 'gaimauli',
    name: 'Gaimauli Builders',
    industry: 'Real Estate & Architecture',
    description: 'Premium presentation portal showcasing award-winning architectural properties. Implements dynamic grid systems, interactive map overlays, and immersive high-fidelity photo layouts.',
    image: gaimauli,
    services: ['Digital Experience Design', 'UX Strategy', 'Frontend Engineering'],
    technologies: ['React', 'GSAP', 'CSS Variables', 'Tailwind CSS'],
    website: 'https://gaimauli.com',
    tags: ['Real Estate', 'Luxury', 'Portfolio'],
    featured: false
  },
  {
    id: 'newstar',
    name: 'New Star Tech',
    industry: 'SaaS & Enterprise Automation',
    description: 'Enterprise resource scheduling workspace built for global workforces. Simplifies resource allocation, timesheets, and capacity planning through drag-and-drop orchestration and smart recommendations.',
    image: newstar,
    services: ['Product Strategy', 'UI/UX Redesign', 'Frontend Implementation'],
    technologies: ['React', 'Tailwind CSS', 'Radix UI', 'Dnd Kit'],
    website: 'https://newstar.tech',
    tags: ['Enterprise', 'Workspace', 'Workflow'],
    featured: true
  },
  {
    id: 'shantabai',
    name: 'Shantabai Foundation',
    industry: 'Non-Profit & Philanthropy',
    description: 'Immersive storytelling portal designed to amplify global humanitarian projects. Implements scroll-triggered typography, smooth media reveals, and accessible multi-language platforms.',
    image: shantabai,
    services: ['Interaction Design', 'Accessibility Consulting', 'Full-stack Platform'],
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    website: 'https://shantabai.foundation',
    tags: ['Non-Profit', 'Storytelling', 'Accessibility'],
    featured: false
  },
  {
    id: 'unexpected',
    name: 'Unexpected Digital',
    industry: 'Creative Technology & AI',
    description: 'Bespoke interactive portal exploring generative visual art and machine learning. Showcases neural network visualizations, fluid particles, and high-frequency shader mechanics.',
    image: unexpected,
    services: ['Creative Code', 'Shader Programming', 'WebGL Architecture'],
    technologies: ['React', 'Three.js', 'WebGL2', 'Vite', 'Tailwind CSS'],
    website: 'https://unexpected.digital',
    tags: ['AI', 'WebGL', 'Bespoke'],
    featured: true
  },
  {
    id: 'yash',
    name: 'Yash FinTech',
    industry: 'FinTech & Capital Markets',
    description: 'Digital asset management dashboard designed for high-net-worth portfolios. Delivers cryptographic ledger validation, transaction auditing, and real-time yield optimization widgets.',
    image: yash,
    services: ['UX Audit', 'Dashboard Design', 'Secure UI Development'],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'Chart.js'],
    website: 'https://yash.finance',
    tags: ['FinTech', 'Dashboard', 'Security'],
    featured: false
  },
  {
    id: 'yjp',
    name: 'YJP Legal',
    industry: 'Professional Services & Corporate Law',
    description: 'Editorial corporate marketing site for a premier legal advisory firm. Implements high-end typography, clean grid structures, and interactive case study databases.',
    image: yjp,
    services: ['Information Architecture', 'Brand Design', 'Web Engineering'],
    technologies: ['React', 'Vite', 'Tailwind CSS', 'GSAP'],
    website: 'https://yjp.legal',
    tags: ['Corporate', 'Legal', 'Minimalist'],
    featured: false
  }
];
