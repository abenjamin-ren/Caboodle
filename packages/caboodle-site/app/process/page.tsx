import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'The ORCA Process' };

export default function ProcessPage() {
  return (
    <section className="section">
      <div className="center stack">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)' }}>The ORCA Process</h1>
        <p className="prose">ORCA is a 3-round, 12-step framework for discovering, prioritizing, and representing the objects in digital products.</p>
      </div>
    </section>
  );
}
