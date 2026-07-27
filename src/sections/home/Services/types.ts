export interface ServiceItem {
  id: string;
  title: string;
  angle: number;
  ring: 'inner' | 'middle' | 'outer';
  icon: string;
  slug: string;
  description: string;
}
