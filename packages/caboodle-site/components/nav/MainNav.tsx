'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/objects', label: 'Object Library' },
  { href: '/resources', label: 'Resources' },
  { href: '/process', label: 'Process' },
  { href: '/glossary', label: 'Glossary' },
];

export function MainNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    <nav className="main-nav" aria-label="Primary">
      <div className="nav-start">
        <Link className="logo-link" href="/" aria-label="Caboodle home">
          <img src="/img/caboodle-logo.svg" alt="Caboodle" width={28} height={28} />
        </Link>
        <span className="nav-divider" aria-hidden="true" />
        <button className="nav-search-trigger" type="button" aria-label="Search Caboodle">
          <span className="nav-search-label">
            <span className="material-icons" aria-hidden="true">search</span>
            <span>Search</span>
          </span>
          <kbd className="nav-hotkey">
            <span aria-hidden="true">⌘</span><span>K</span>
          </kbd>
        </button>
      </div>
      <div className="nav-end">
        <ul className="nav-tabs">
          {NAV_ITEMS.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="nav-tab"
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <button className="nav-profile-btn" type="button" aria-label="User profile">AB</button>
      </div>
    </nav>
  );
}
