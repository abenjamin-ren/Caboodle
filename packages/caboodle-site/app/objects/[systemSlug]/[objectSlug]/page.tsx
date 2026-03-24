import { notFound } from 'next/navigation';
import { getObjectBySlug } from '@/lib/objects';
import { getAllSystemSlugs, getSystemBySlug } from '@/lib/systems';
import { ObjectDetailClient } from './ObjectDetailClient';
import { BackLink } from '@/components/ui/BackLink';
import { objectIconSrc } from '@/components/ui/ObjectIcon';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ systemSlug: string; objectSlug: string }>;
}

export async function generateStaticParams() {
  const params: { systemSlug: string; objectSlug: string }[] = [];
  for (const systemSlug of getAllSystemSlugs()) {
    const result = getSystemBySlug(systemSlug);
    if (!result) continue;
    for (const obj of result.objects) {
      params.push({ systemSlug, objectSlug: obj.identity.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { objectSlug } = await params;
  const obj = getObjectBySlug(objectSlug);
  if (!obj) return { title: 'Not Found' };
  return { title: `${obj.identity.name} — Object Guide` };
}

export default async function ObjectDetailPage({ params }: Props) {
  const { systemSlug, objectSlug } = await params;
  const obj = getObjectBySlug(objectSlug);
  if (!obj) notFound();

  const iconSrc = objectIconSrc(obj.identity.objectType);

  return (
    <>
      <header className="l-section-header">
        <BackLink href={`/objects/${systemSlug}`}>Back to object library</BackLink>
        <div className="object-detail-heading-row">
          <div className="object-detail-title-row">
            <img
              className="guide-icon"
              src={iconSrc}
              alt=""
              width={40}
              height={40}
            />
            <h1 className="object-detail-title">
              {obj.identity.name}{' '}
              {obj.identity.qualifier && <span>{obj.identity.qualifier}</span>}
            </h1>
            {obj.identity.synonyms && obj.identity.synonyms.length > 0 && (
              <span className="synonyms-pill">
                ~ {obj.identity.synonyms.join(', ')}
              </span>
            )}
          </div>
          <div className="cluster l-header-actions" style={{ '--space': 'var(--s-2)' } as React.CSSProperties}>
            <button type="button" className="l-page-header-action is-muted">Edit</button>
            <button type="button" className="l-page-header-action is-muted">Share</button>
            <button type="button" className="l-page-header-action">Fork this object</button>
          </div>
        </div>
        <p className="object-detail-definition">{obj.identity.definition}</p>
      </header>
      <ObjectDetailClient obj={obj} systemSlug={systemSlug} />
    </>
  );
}
