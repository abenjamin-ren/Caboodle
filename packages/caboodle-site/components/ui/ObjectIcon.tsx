export function objectIconSrc(objectType: string): string {
  if (objectType === 'domain') return '/img/domain-object_icon.svg';
  if (objectType === 'variation') return '/img/object-variation_icon.svg';
  return '/img/object_icon.svg';
}
