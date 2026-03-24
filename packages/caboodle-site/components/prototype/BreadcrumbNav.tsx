interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function BreadcrumbNav({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" style={{ fontSize: '0.8125rem', color: '#999', marginBlockEnd: 'var(--s-1)' }}>
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span style={{ margin: '0 4px' }}>/</span>}
          {item.href ? (
            <a href={item.href} style={{ color: '#999', textDecoration: 'none' }}>{item.label}</a>
          ) : (
            <span style={{ color: '#666' }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
