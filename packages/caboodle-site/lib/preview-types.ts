import type { ObjectAttribute, ObjectCTA, LifecycleState } from '../../../data/schema';

export type SelectedItem =
  | { type: 'attribute'; name: string }
  | { type: 'action'; name: string }
  | null;

export interface PreviewInspectionProps {
  selectedItem: SelectedItem;
  onSelectItem: (item: SelectedItem) => void;
  selectedRole: string;
  viewCTAs: ObjectCTA[];
  viewAttributes: ObjectAttribute[];
  isActionAvailable: (cta: ObjectCTA) => boolean;
  lifecycleStates: LifecycleState[];
  displayMode?: 'list' | 'grid' | 'table';
}
