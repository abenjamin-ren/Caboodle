export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="back-link">
      <i className="fa-solid fa-arrow-left" aria-hidden="true" />
      {children}
    </a>
  );
}
