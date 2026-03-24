import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Caboodle' };

export default function HomePage() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-headline">Caboodle</h1>
          <p className="hero-subheading">Structured tools and workflows for designing products around shared objects.</p>
        </div>
        <div className="hero-ctas">
          <Link href="/objects" className="btn btn-primary">Browse the Object Library</Link>
          <Link href="/resources" className="btn btn-secondary">
            Download the Starter Kit <span className="material-icons" aria-hidden="true">chevron_right</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
