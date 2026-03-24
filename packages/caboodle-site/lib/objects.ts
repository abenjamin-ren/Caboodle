import fs from 'fs';
import path from 'path';
import type { ObjectDefinition } from '../../../data/schema';

const DATA_DIR = path.join(process.cwd(), '..', '..', 'data', 'objects');

export function getObjectBySlug(slug: string): ObjectDefinition | null {
  const filePath = path.join(DATA_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export function getAllObjects(): ObjectDefinition[] {
  if (!fs.existsSync(DATA_DIR)) return [];
  return fs.readdirSync(DATA_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), 'utf-8')));
}

export function getAllObjectSlugs(): string[] {
  if (!fs.existsSync(DATA_DIR)) return [];
  return fs.readdirSync(DATA_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace('.json', ''));
}
