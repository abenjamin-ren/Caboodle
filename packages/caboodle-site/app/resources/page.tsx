import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Resources' };

export default function ResourcesPage() {
  return (
    <section className="section">
      <div className="center stack">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)' }}>Resources</h1>
        <p className="prose">OOUX tools, templates, downloads, and reference materials.</p>
      </div>
    </section>
  );
}
