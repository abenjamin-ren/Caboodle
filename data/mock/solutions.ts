import type { MockSolution } from './types';

export const solutions: MockSolution[] = [
  {
    id: 'sol-1',
    slug: 'renaissance-star-360',
    name: 'Renaissance Star 360',
    productCount: 3,
    status: 'Active',
    productIds: ['prod-sr', 'prod-sm', 'prod-se'],
    nestedObjects: [{ label: 'Products', count: 3 }],
    href: '/prototype/admin/provisioning',
  },
  {
    id: 'sol-2',
    slug: 'renaissance-practice',
    name: 'Renaissance Practice & Instruction',
    productCount: 3,
    status: 'Active',
    productIds: ['prod-freckle', 'prod-lalilo', 'prod-nearpod'],
    nestedObjects: [{ label: 'Products', count: 3 }],
    href: '/prototype/admin/provisioning',
  },
  {
    id: 'sol-3',
    slug: 'renaissance-reading',
    name: 'Renaissance Reading',
    productCount: 2,
    status: 'Active',
    productIds: ['prod-ar', 'prod-myon'],
    nestedObjects: [{ label: 'Products', count: 2 }],
    href: '/prototype/admin/provisioning',
  },
];
