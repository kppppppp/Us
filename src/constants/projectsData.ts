import ariya from '../assets/projects/ariya.png';
import deltaorbit from '../assets/projects/deltaorbit.png';
import downtime from '../assets/projects/downtime.png';
import gaimauli from '../assets/projects/gaimauli.png';
import newstar from '../assets/projects/newstar.png';
import shantabai from '../assets/projects/shantabai.png';
import unexpected from '../assets/projects/unexpected.png';
import yash from '../assets/projects/yash.png';
import yjp from '../assets/projects/yjp.png';

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
  year: string;
  accentColor: string;
}

export const projectsData: ProjectItem[] = [
 
  {
    id: "ariya",
    title: "Ariya Wellness Portal",
    category: "Healthcare & AI Telemetry",
    description: "Pre-clinical telemetry and patient orchestration platform built on zero-trust cloud data systems and secure real-time data flow.",
    image: ariya,
    technologies: ["Next.js", "Python", "GraphQL", "Tailwind CSS"],
    link: "/contact?project=ariya",
    year: "2025",
    accentColor: "#8B7FF4"
  },
  {
    id: "deltaorbit",
    title: "Delta Orbit Systems",
    category: "Aerospace Intelligence & Analytics",
    description: "Interactive telemetry dashboards and predictive orbital pathing mechanics for satellite constellation management.",
    image: deltaorbit,
    technologies: ["React", "WebGL", "Three.js", "Node.js", "Docker"],
    link: "/contact?project=deltaorbit",
    year: "2026",
    accentColor: "#2563EB"
  },
  {
    id: "downtime",
    title: "Downtime Monitor",
    category: "Infrastructure DevOps SaaS",
    description: "Real-time global server health monitoring and auto-healing infrastructure dashboard displaying sub-second metrics.",
    image: downtime,
    technologies: ["TypeScript", "Rust", "WebSockets", "Go"],
    link: "/contact?project=downtime",
    year: "2025",
    accentColor: "#DC2626"
  },
  {
    id: "gaimauli",
    title: "Gaimauli Agro Logistics",
    category: "Supply Chain & Automation",
    description: "Algorithmic crop yield logistics and supply chain optimization platform matching cold chain transport networks.",
    image: gaimauli,
    technologies: ["React Native", "Express", "PostgreSQL", "AWS"],
    link: "/contact?project=gaimauli",
    year: "2025",
    accentColor: "#10B981"
  },
  {
    id: "newstar",
    title: "Newstar Media Hub",
    category: "Entertainment & Streaming CDN",
    description: "High-throughput content delivery hub and subscription system serving millions of stream sessions daily.",
    image: newstar,
    technologies: ["Svelte", "Golang", "Kubernetes", "WebRTC"],
    link: "/contact?project=newstar",
    year: "2026",
    accentColor: "#F59E0B"
  },
  {
    id: "shantabai",
    title: "Shantabai Foundation",
    category: "Social Impact & Community Portal",
    description: "Philanthropic distribution engine and community platform managing donor resources and program allocations globally.",
    image: shantabai,
    technologies: ["React", "Strapi CMS", "GraphQL", "Tailwind CSS"],
    link: "/contact?project=shantabai",
    year: "2024",
    accentColor: "#EC4899"
  },
  {
    id: "yash",
    title: "Yash Portfolio Portal",
    category: "Creative Showcase Platform",
    description: "Editorial portfolio showcase focusing on ultra-minimal design systems and custom WebGL shaders.",
    image: yash,
    technologies: ["React", "Three.js", "GSAP", "Tailwind CSS"],
    link: "/contact?project=yash",
    year: "2025",
    accentColor: "#8B5CF6"
  },
  {
    id: "yjp",
    title: "YJP Retail Network",
    category: "Direct-to-Consumer Commerce",
    description: "Bespoke checkout orchestration and inventory syncing across hundreds of retail distribution branches.",
    image: yjp,
    technologies: ["Next.js", "Shopify Hydrogen", "Node.js", "Redis"],
    link: "/contact?project=yjp",
    year: "2026",
    accentColor: "#06B6D4"
  }
];
export default projectsData;
