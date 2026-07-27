export const ORBIT_LAYOUT = {
  center: 50,

  innerRing: 180,

  middleRing: 250,

  outerRing: 330,

  serviceRadius: 295,

  rotationDuration: 30,

  floatingDistance: 8
};

export interface ServicePosition {
  id: string;
  title: string;
  angle: number; // in degrees
  ring: 'inner' | 'middle' | 'outer';
  icon: string;
  slug: string;
  description: string;
}

export const SERVICES_DATA: ServicePosition[] = [
  {
    id: 'meta-ads',
    title: 'Meta Ads Management',
    angle: 270, // Top
    ring: 'outer',
    icon: 'Infinity',
    slug: 'meta-ads',
    description: 'Data-driven social advertising scaled to drive conversions.'
  },
  {
    id: 'ecommerce',
    title: 'Ecommerce Sites',
    angle: 320, // Top Right
    ring: 'middle',
    icon: 'ShoppingCart',
    slug: 'ecommerce-sites',
    description: 'High-performance stores optimized for ultimate checkout conversion.'
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    angle: 0, // Right
    ring: 'outer',
    icon: 'Code',
    slug: 'web-development',
    description: 'Premium enterprise web architecture using React and clean styling.'
  },
  {
    id: 'app-dev',
    title: 'App Development',
    angle: 40, // Bottom Right
    ring: 'middle',
    icon: 'Smartphone',
    slug: 'app-development',
    description: 'Responsive, premium native and hybrid mobile applications.'
  },
  {
    id: 'social-media',
    title: 'Social Media Marketing',
    angle: 75, // Bottom-ish Right
    ring: 'outer',
    icon: 'ThumbsUp',
    slug: 'social-media',
    description: 'Organic branding and viral content campaigns across channels.'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Strategy',
    angle: 115, // Bottom
    ring: 'middle',
    icon: 'Target',
    slug: 'digital-strategy',
    description: 'Strategic growth audits and pipeline conversion mapping.'
  },
  {
    id: 'influencer',
    title: 'Influencer Marketing',
    angle: 155, // Bottom Left
    ring: 'outer',
    icon: 'User',
    slug: 'influencer-marketing',
    description: 'High-leverage creator campaigns and brand ambassador setups.'
  },
  {
    id: 'seo-growth',
    title: 'SEO Growth',
    angle: 200, // Left
    ring: 'middle',
    icon: 'TrendingUp',
    slug: 'seo-growth',
    description: 'Organic ranking algorithms built around structured content grids.'
  },
  {
    id: 'photoshoot',
    title: 'Photoshoot Services',
    angle: 235, // Upper Left
    ring: 'outer',
    icon: 'Camera',
    slug: 'photoshoot-services',
    description: 'High-end corporate imagery, product photography and visual assets.'
  }
];
