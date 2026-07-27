export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: 'intelligent-systems',
    title: 'Intelligent Systems',
    description: 'Transforming complexity into enterprise efficiency with context-aware, self-optimizing architectures.',
    iconName: 'Sparkles',
    features: ['Real-time processing', 'Predictive analytics engines', 'Natural language pipeline integration']
  },
  {
    id: 'digital-platforms',
    title: 'Digital Platforms',
    description: 'Bespoke web applications built with industry-leading frameworks for maximum performance, SEO, and visual excellence.',
    iconName: 'Layers',
    features: ['Vite & Next.js production builds', 'Fluid UI/UX responsiveness', 'Sub-second interactions']
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    description: 'Automating high-scale business processes using customized autonomous agent networks and LLM integration.',
    iconName: 'Cpu',
    features: ['Autonomous task workflows', 'Intelligent workflow routing', 'Cognitive automation analytics']
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    description: 'Highly resilient, automated multi-cloud infrastructure supporting high-availability production architectures.',
    iconName: 'Cloud',
    features: ['Zero-downtime deployments', 'Immutable infrastructure pipelines', 'Advanced telemetry & monitoring']
  }
];
