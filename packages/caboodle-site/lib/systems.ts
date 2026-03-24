import { getAllObjects, getObjectBySlug } from './objects';
import type { SystemDefinition, ObjectDefinition } from '../../../data/schema';

const SYSTEM_META: Record<string, { name: string; description: string; owner: string }> = {
  'common-objects': {
    name: 'Common Objects',
    description: 'Canonical, standalone entities shared across all Renaissance products.',
    owner: 'Aaron Benjamin',
  },
  'renaissance-intelligence': {
    name: 'Renaissance Intelligence',
    description: 'Objects powering the Renaissance Intelligence platform — onboarding, learning paths, insights, and AI-driven recommendations.',
    owner: 'Josh Singer',
  },
  'nearpod': {
    name: 'Nearpod',
    description: 'Objects specific to the Nearpod interactive lesson and engagement platform.',
    owner: 'Luis Gonzalez',
  },
  'freckle': {
    name: 'Freckle',
    description: 'Objects specific to the Freckle adaptive practice platform.',
    owner: 'Julieta Amante',
  },
  'star': {
    name: 'Star',
    description: 'Objects specific to the Star assessment suite.',
    owner: 'Aaron Benjamin',
  },
  'ar': {
    name: 'Accelerated Reader',
    description: 'Objects specific to the Accelerated Reader reading practice platform.',
    owner: 'Aaron Benjamin',
  },
  'myon': {
    name: 'myON',
    description: 'Objects specific to the myON digital reading library.',
    owner: 'Aaron Benjamin',
  },
  'lalilo': {
    name: 'Lalilo',
    description: 'Objects specific to the Lalilo foundational literacy platform.',
    owner: 'Aaron Benjamin',
  },
};

function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function parseProducts(products: string): string[] {
  if (products === 'All products') return ['common-objects'];
  return products.split(',').map(p => slugify(p.trim()));
}

export function getAllSystems(): SystemDefinition[] {
  const objects = getAllObjects();
  const systemMap = new Map<string, string[]>();

  for (const obj of objects) {
    const systemSlugs = parseProducts(obj.identity.products);
    for (const sysSlug of systemSlugs) {
      const existing = systemMap.get(sysSlug) ?? [];
      existing.push(obj.identity.slug);
      systemMap.set(sysSlug, existing);
    }
  }

  const systems: SystemDefinition[] = [];
  for (const [slug, objectSlugs] of systemMap) {
    const meta = SYSTEM_META[slug];
    systems.push({
      slug,
      name: meta?.name ?? slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      description: meta?.description ?? `Objects associated with ${slug}.`,
      owner: meta?.owner ?? 'Renaissance',
      updatedAt: '2026-02-28',
      objectSlugs,
    });
  }

  return systems.sort((a, b) => {
    if (a.slug === 'common-objects') return -1;
    if (b.slug === 'common-objects') return 1;
    return b.objectSlugs.length - a.objectSlugs.length;
  });
}

export function getSystemBySlug(slug: string): { system: SystemDefinition; objects: ObjectDefinition[] } | null {
  const systems = getAllSystems();
  const system = systems.find(s => s.slug === slug);
  if (!system) return null;
  const objects = system.objectSlugs
    .map(s => getObjectBySlug(s))
    .filter((o): o is ObjectDefinition => o !== null);
  return { system, objects };
}

export function getAllSystemSlugs(): string[] {
  return getAllSystems().map(s => s.slug);
}
