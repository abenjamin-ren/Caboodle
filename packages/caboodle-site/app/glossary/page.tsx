import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Glossary' };

export default function GlossaryPage() {
  return (
    <section className="section">
      <div className="center stack">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)' }}>Glossary</h1>
        <p className="prose">OOUX terminology, patterns, and definitions used across Caboodle.</p>
      </div>
    </section>
  );
}
