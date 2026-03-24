import type { MockProduct } from './types';

export const products: MockProduct[] = [
  { id: 'prod-sr', slug: 'star-reading', name: 'Star Reading', tier: 'Core', availability: 'Licensed', subject: 'ELA', productType: 'Assessment', solutionNames: ['Renaissance Star 360'], href: '/prototype/admin/provisioning' },
  { id: 'prod-sm', slug: 'star-math', name: 'Star Math', tier: 'Core', availability: 'Licensed', subject: 'Math', productType: 'Assessment', solutionNames: ['Renaissance Star 360'], href: '/prototype/admin/provisioning' },
  { id: 'prod-se', slug: 'star-early-literacy', name: 'Star Early Literacy', tier: 'Core', availability: 'Licensed', subject: 'ELA', productType: 'Assessment', solutionNames: ['Renaissance Star 360'], href: '/prototype/admin/provisioning' },
  { id: 'prod-freckle', slug: 'freckle', name: 'Freckle', tier: 'Core', availability: 'Licensed', subject: 'ELA, Math, Science, Social Studies', productType: 'Practice', solutionNames: ['Renaissance Practice & Instruction'], href: '/prototype/admin/provisioning' },
  { id: 'prod-ar', slug: 'accelerated-reader', name: 'Accelerated Reader', tier: 'Core', availability: 'Licensed', subject: 'ELA', productType: 'Reading', solutionNames: ['Renaissance Reading'], href: '/prototype/admin/provisioning' },
  { id: 'prod-myon', slug: 'myon', name: 'myON', tier: 'Core', availability: 'Licensed', subject: 'ELA', productType: 'Reading', solutionNames: ['Renaissance Reading'], href: '/prototype/admin/provisioning' },
  { id: 'prod-nearpod', slug: 'nearpod', name: 'Nearpod', tier: 'Core', availability: 'Licensed', subject: 'All', productType: 'Instruction', solutionNames: ['Renaissance Practice & Instruction'], href: '/prototype/admin/provisioning' },
  { id: 'prod-lalilo', slug: 'lalilo', name: 'Lalilo', tier: 'Core', availability: 'Licensed', subject: 'ELA', productType: 'Practice', solutionNames: ['Renaissance Practice & Instruction'], href: '/prototype/admin/provisioning' },
];
