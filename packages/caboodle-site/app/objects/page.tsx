import type { Metadata } from 'next';
import { getAllSystems } from '@/lib/systems';
import { getAllObjects } from '@/lib/objects';
import { SystemLibrary } from './SystemLibrary';

export const metadata: Metadata = { title: 'Object Library' };

export default function ObjectLibraryPage() {
  const systems = getAllSystems();
  const allObjects = getAllObjects();

  const systemsWithCounts = systems.map(sys => {
    const objs = sys.objectSlugs
      .map(slug => allObjects.find(o => o.identity.slug === slug))
      .filter(Boolean);
    const viewCount = objs.reduce(
      (sum, o) => sum + (o?.objectViews?.length ?? 0),
      0
    );
    return { ...sys, objectCount: objs.length, viewCount };
  });

  return (
    <>
      <header className="l-page-header cluster" style={{ '--justify': 'space-between', '--align': 'flex-start' } as React.CSSProperties}>
        <div className="stack l-page-header-text" style={{ '--space': 'var(--s-2)' } as React.CSSProperties}>
          <h1>Object Library</h1>
          <p>
            Definition of the object library and some extra context to describe
            the page.
          </p>
        </div>
        <button type="button" className="l-page-header-action">
          Create new system
        </button>
      </header>
      <SystemLibrary systems={systemsWithCounts} />
    </>
  );
}
