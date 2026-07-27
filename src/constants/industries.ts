export interface Industry {
  id: string;
  name: string;
  iconName: string;
  description: string;
}

export const industries: Industry[] = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    iconName: 'Heart',
    description: 'Transforming clinical workflows and patient care through intelligent platform integrations.'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    iconName: 'Activity',
    description: 'Optimizing industrial supply chains and production schedules using predictive automation models.'
  },
  {
    id: 'financial-services',
    name: 'Financial Services',
    iconName: 'Building',
    description: 'Secure, robust payment architectures and algorithmic models matching modern regulatory systems.'
  },
  {
    id: 'retail-commerce',
    name: 'Retail & Commerce',
    iconName: 'ShoppingBag',
    description: 'Immersive, hyper-personalized digital storefronts optimized for maximum conversion.'
  }
];
