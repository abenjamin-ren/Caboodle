'use server';

import fs from 'fs';
import path from 'path';
import type { ObjectDefinition } from '../../../data/schema';

const DATA_DIR = path.join(process.cwd(), '..', '..', 'data', 'objects');

function readObject(slug: string): ObjectDefinition | null {
  const filePath = path.join(DATA_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function writeObject(slug: string, obj: ObjectDefinition): void {
  const filePath = path.join(DATA_DIR, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2) + '\n', 'utf-8');
}

export async function updateAttribute(
  objectSlug: string,
  attributeName: string,
  updates: Partial<{ description: string; source: string; dataType: string; example: string }>
): Promise<{ success: boolean; error?: string }> {
  const obj = readObject(objectSlug);
  if (!obj) return { success: false, error: 'Object not found' };

  const attr = obj.allAttributes.find(a => a.name === attributeName);
  if (!attr) return { success: false, error: 'Attribute not found' };

  if (updates.description !== undefined) attr.description = updates.description;
  if (updates.source !== undefined) attr.source = updates.source;
  if (updates.dataType !== undefined) attr.dataType = updates.dataType;

  for (const rep of obj.representations) {
    const repAttr = rep.attributes.find(a => a.name === attributeName);
    if (repAttr) {
      if (updates.description !== undefined) repAttr.description = updates.description;
      if (updates.source !== undefined) repAttr.source = updates.source;
      if (updates.dataType !== undefined) repAttr.dataType = updates.dataType;
    }
  }

  writeObject(objectSlug, obj);
  return { success: true };
}

export async function updateCTA(
  objectSlug: string,
  ctaName: string,
  updates: Partial<{ permission: string; roles: string; priority: string; roleKeys: string[] }>
): Promise<{ success: boolean; error?: string }> {
  const obj = readObject(objectSlug);
  if (!obj) return { success: false, error: 'Object not found' };

  const cta = obj.allCTAs.find(c => c.name === ctaName);
  if (!cta) return { success: false, error: 'CTA not found' };

  if (updates.permission !== undefined) cta.permission = updates.permission;
  if (updates.roles !== undefined) cta.roles = updates.roles;
  if (updates.roleKeys !== undefined) cta.roleKeys = updates.roleKeys;

  writeObject(objectSlug, obj);
  return { success: true };
}
