export interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  description: string;
  metrics: string;
  imagePath?: string;
}

export const projects: Project[] = [
  {
    id: 'next-gen-banking',
    title: 'Modernizing Core Banking for 10M+ Daily Active Users',
    category: 'Financial Services',
    client: 'Apex Capital',
    description: 'Reengineered a legacy mainframe system into a cloud-native, microservices-driven architecture with zero downtime.',
    metrics: '99.999% Uptime | 60% latency reduction'
  },
  {
    id: 'autonomous-logistics',
    title: 'Autonomous Supply Chain Network Integration',
    category: 'Manufacturing',
    client: 'Helix Global',
    description: 'Deployed an AI-driven routing and predictive inventory model, automating 85% of warehouse operations.',
    metrics: '40% Cost Savings | 2.5x throughput increase'
  },
  {
    id: 'clinical-platform',
    title: 'Secure Clinical Telemetry Infrastructure',
    category: 'Healthcare',
    client: 'CareFirst Networks',
    description: 'Designed a highly secure, HIPAA-compliant patient telemetry ingestion platform utilizing real-time event streams.',
    metrics: 'Sub-10ms processing | 4.8/5 clinical NPS'
  }
];
