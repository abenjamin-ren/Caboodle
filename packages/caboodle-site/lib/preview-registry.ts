import type { ComponentType } from 'react';
import type { PreviewInspectionProps } from './preview-types';
import { StudentRosterPreview } from '@/components/preview/StudentRosterPreview';
import { ClassAssignmentsPreview } from '@/components/preview/ClassAssignmentsPreview';

const PREVIEW_REGISTRY: Record<string, ComponentType<PreviewInspectionProps>> = {
  'student:class-roster': StudentRosterPreview,
  'student-assignment:class-assignments': ClassAssignmentsPreview,
};

export function getPreviewRenderer(
  objectSlug: string,
  viewValue: string,
): ComponentType<PreviewInspectionProps> | null {
  return PREVIEW_REGISTRY[`${objectSlug}:${viewValue}`] ?? null;
}
