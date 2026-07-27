export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: {
    title: string;
    description: string;
    href: string;
    iconName?: string;
  }[];
}

export const navigationItems: NavItem[] = [
  {
    label: 'Solutions',
    href: '#solutions',
    hasDropdown: true,
    dropdownItems: [
      {
        title: 'Intelligent Systems',
        description: 'AI-driven architecture designed to optimize complex enterprise processes and decisions.',
        href: '#solutions/intelligent-systems',
        iconName: 'Sparkles'
      },
      {
        title: 'Digital Platforms',
        description: 'Next-generation web applications built for speed, resilience, and premium UX.',
        href: '#solutions/digital-platforms',
        iconName: 'Layers'
      },
      {
        title: 'AI & Automation',
        description: 'Scale intelligence across your organization with advanced automation frameworks.',
        href: '#solutions/ai-automation',
        iconName: 'Cpu'
      },
      {
        title: 'Cloud & DevOps',
        description: 'Secure, high-availability infrastructure that scales dynamic workloads smoothly.',
        href: '#solutions/cloud-devops',
        iconName: 'Cloud'
      }
    ]
  },
  {
    label: 'Services',
    href: '#services',
    hasDropdown: true,
    dropdownItems: [
      {
        title: 'Consulting & Strategy',
        description: 'Strategic roadmaps aligned with key enterprise objectives.',
        href: '#services/consulting',
        iconName: 'Compass'
      },
      {
        title: 'Product Design',
        description: 'Stunning visual assets, interactive prototypes, and premium user experience.',
        href: '#services/design',
        iconName: 'Palette'
      },
      {
        title: 'Full-Scale Development',
        description: 'Clean code architecture and robust integrations designed for production.',
        href: '#services/development',
        iconName: 'Code'
      },
      {
        title: 'Legacy Modernization',
        description: 'Upgrade your systems to modern technological stacks without downtime.',
        href: '#services/modernization',
        iconName: 'RefreshCw'
      }
    ]
  },
  {
    label: 'Industries',
    href: '#industries'
  },
  {
    label: 'Case Studies',
    href: '#case-studies'
  },
  {
    label: 'About Us',
    href: '#about-us'
  },
  {
    label: 'Insights',
    href: '#insights'
  }
];

export const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Twitter', href: 'https://twitter.com' },
  { label: 'GitHub', href: 'https://github.com' }
];

export const contactInfo = {
  email: 'build@unexpectedsolutions.com',
  phone: '+1 (800) 555-0199',
  address: '100 Pine Street, San Francisco, CA 94111'
};
