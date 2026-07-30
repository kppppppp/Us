export const ORBIT_LAYOUT = {
  center: 50,

  innerRing: 180,

  middleRing: 250,

  outerRing: 330,

  serviceRadius: 330,

  rotationDuration: 30,

  floatingDistance: 8
};

export interface ServicePosition {
  id: string;
  title: string;
  angle: number; // in degrees — now auto-calculated, this is a fallback/override
  ring: 'inner' | 'middle' | 'outer';
  icon: string;
  slug: string;
  description: string;
}

// Service definitions — angles are calculated automatically for even distribution
const SERVICE_DEFINITIONS: Omit<ServicePosition, 'angle'>[] = [
  {
    id: 'meta-ads',
    title: 'Meta Ads Management',
    ring: 'outer',
    icon: 'Infinity',
    slug: 'meta-ads-management',
    description: 'Data-driven social advertising scaled to drive conversions.'
  },
  {
    id: 'ecommerce',
    title: 'Ecommerce Sites',
    ring: 'middle',
    icon: 'ShoppingCart',
    slug: 'ecommerce-sites',
    description: 'High-performance stores optimized for ultimate checkout conversion.'
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    ring: 'outer',
    icon: 'Code',
    slug: 'web-development',
    description: 'Premium enterprise web architecture using React and clean styling.'
  },
  {
    id: 'app-dev',
    title: 'App Development',
    ring: 'middle',
    icon: 'Smartphone',
    slug: 'app-development',
    description: 'Responsive, premium native and hybrid mobile applications.'
  },
  {
    id: 'social-media',
    title: 'Social Media Marketing',
    ring: 'outer',
    icon: 'ThumbsUp',
    slug: 'social-media-marketing',
    description: 'Organic branding and viral content campaigns across channels.'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Strategy',
    ring: 'middle',
    icon: 'Target',
    slug: 'digital-marketing-strategy',
    description: 'Strategic growth audits and pipeline conversion mapping.'
  },
  {
    id: 'influencer',
    title: 'Influencer Marketing',
    ring: 'outer',
    icon: 'User',
    slug: 'influencer-marketing',
    description: 'High-leverage creator campaigns and brand ambassador setups.'
  },
  {
    id: 'seo-growth',
    title: 'SEO Growth',
    ring: 'middle',
    icon: 'TrendingUp',
    slug: 'seo-growth',
    description: 'Organic ranking algorithms built around structured content grids.'
  },
  {
    id: 'photoshoot',
    title: 'Photoshoot Services',
    ring: 'outer',
    icon: 'Camera',
    slug: 'photoshoot-services',
    description: 'High-end corporate imagery, product photography and visual assets.'
  }
];

// Auto-calculate evenly distributed angles starting from top (270°)
const START_ANGLE = 250; // Offset from top to avoid symmetric bottom collisions
const TOTAL_SERVICES = SERVICE_DEFINITIONS.length;
const ANGLE_STEP = 360 / TOTAL_SERVICES;

export const SERVICES_DATA: ServicePosition[] = SERVICE_DEFINITIONS.map((service, index) => ({
  ...service,
  angle: (START_ANGLE + index * ANGLE_STEP) % 360
}));
