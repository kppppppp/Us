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
    href: '/services',
    hasDropdown: true,
    dropdownItems: [
      {
        title: 'Meta Ads Management',
        description: 'Data-driven social advertising scaled to drive conversions.',
        href: '/services#meta-ads-management',
        iconName: 'Megaphone'
      },
      {
        title: 'Ecommerce Sites',
        description: 'High-performance stores optimized for checkout conversion.',
        href: '/services#ecommerce-sites',
        iconName: 'ShoppingCart'
      },
      {
        title: 'Web Development',
        description: 'Premium enterprise web architecture using modern tech.',
        href: '/services#web-development',
        iconName: 'Code'
      },
      {
        title: 'App Development',
        description: 'Beautiful native and hybrid mobile applications.',
        href: '/services#app-development',
        iconName: 'Smartphone'
      },
      {
        title: 'Social Media Marketing',
        description: 'Organic branding strategies that create active communities.',
        href: '/services#social-media-marketing',
        iconName: 'Share2'
      },
      {
        title: 'Digital Marketing Strategy',
        description: 'Complete digital growth systems built around goals.',
        href: '/services#digital-marketing-strategy',
        iconName: 'Target'
      },
      {
        title: 'Influencer Marketing',
        description: 'Connect your brand with trusted creators for authentic reach.',
        href: '/services#influencer-marketing',
        iconName: 'Users'
      },
      {
        title: 'SEO Growth',
        description: 'Organic search intent optimization and content excellence.',
        href: '/services#seo-growth',
        iconName: 'TrendingUp'
      },
      {
        title: 'Photoshoot Services',
        description: 'Premium product, lifestyle, and marketing photography.',
        href: '/services#photoshoot-services',
        iconName: 'Camera'
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
