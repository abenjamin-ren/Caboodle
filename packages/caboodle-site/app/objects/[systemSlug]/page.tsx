import { notFound } from 'next/navigation';
import { getSystemBySlug, getAllSystemSlugs } from '@/lib/systems';
import { SystemDetail } from './SystemDetail';
import { BackLink } from '@/components/ui/BackLink';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ systemSlug: string }>;
}

export async function generateStaticParams() {
  return getAllSystemSlugs().map(slug => ({ systemSlug: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { systemSlug } = await params;
  const result = getSystemBySlug(systemSlug);
  if (!result) return { title: 'Not Found' };
  return { title: `${result.system.name} — Object Library` };
}

export default async function SystemDetailPage({ params }: Props) {
  const { systemSlug } = await params;
  const result = getSystemBySlug(systemSlug);
  if (!result) notFound();

  const { system, objects } = result;

  return (
    <>
      <header className="l-section-header">
        <BackLink href="/objects">Back to Object Library</BackLink>
        <div className="cluster" style={{ '--justify': 'space-between', '--align': 'flex-start', marginBlockStart: 'var(--s-1)' } as React.CSSProperties}>
          <div className="stack l-page-header-text" style={{ '--space': 'var(--s-2)' } as React.CSSProperties}>
            <h1>{system.name}</h1>
            <p>{system.description}</p>
          </div>
          <div className="cluster l-header-actions" style={{ '--space': 'var(--s-2)' } as React.CSSProperties}>
            <button type="button" className="l-page-header-action is-muted">Edit</button>
            <button type="button" className="l-page-header-action is-muted">Share</button>
            <button type="button" className="l-page-header-action">Create new object</button>
          </div>
        </div>
      </header>
      <SystemDetail system={system} objects={objects} />
    </>
  );
}
