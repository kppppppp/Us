export interface PromiseItem {
  id: string;
  num: string;
  title: string;
  description: string;
}

export const PROMISE_DATA: PromiseItem[] = [
  {
    id: 'promise-1',
    num: '01',
    title: 'Strategic thinking',
    description: 'measurable outcomes'
  },
  {
    id: 'promise-2',
    num: '02',
    title: 'Agile execution',
    description: 'minimal complexity'
  },
  {
    id: 'promise-3',
    num: '03',
    title: 'Long-term partnerships',
    description: 'built on trust'
  }
];
