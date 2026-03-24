import { notFound } from 'next/navigation';
import { getObjectBySlug } from '@/lib/objects';
import { getAllSystemSlugs, getSystemBySlug } from '@/lib/systems';
import { ViewInspector } from './ViewInspector';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ systemSlug: string; objectSlug: string; viewSlug: string }>;
}

export async function generateStaticParams() {
  const params: { systemSlug: string; objectSlug: string; viewSlug: string }[] = [];
  for (const systemSlug of getAllSystemSlugs()) {
    const result = getSystemBySlug(systemSlug);
    if (!result) continue;
    for (const obj of result.objects) {
      for (const entry of obj.shapeshifterMatrix ?? []) {
        params.push({
          systemSlug,
          objectSlug: obj.identity.slug,
          viewSlug: entry.value,
        });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { objectSlug, viewSlug } = await params;
  const obj = getObjectBySlug(objectSlug);
  if (!obj) return { title: 'Not Found' };
  const view = obj.shapeshifterMatrix?.find(e => e.value === viewSlug);
  if (!view) return { title: 'Not Found' };
  return { title: `${view.context} — ${obj.identity.name}` };
}

export default async function ViewDetailPage({ params }: Props) {
  const { systemSlug, objectSlug, viewSlug } = await params;
  const obj = getObjectBySlug(objectSlug);
  if (!obj) notFound();

  const view = obj.shapeshifterMatrix?.find(e => e.value === viewSlug);
  if (!view) notFound();

  return (
    <ViewInspector
      obj={obj}
      view={view}
      systemSlug={systemSlug}
    />
  );
}
