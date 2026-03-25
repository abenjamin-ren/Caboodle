export type ObjectType = 'core' | 'domain' | 'variation';
export type ObjectCategory = 'people' | 'container' | 'activity' | 'knowledge' | 'data-ai' | 'content' | 'analytics';
export type Priority = 'P' | 'S' | 'T' | 'Q';
export type ValidShape = 'list' | 'grid' | 'table';

export interface ObjectIdentity {
  slug: string;
  name: string;
  qualifier?: string;
  objectType: ObjectType;
  category: ObjectCategory;
  definition: string;
  synonyms?: string[];
  products: string;
}

export interface ObjectAttribute {
  name: string;
  dataType: string;
  required?: boolean;
  source: string;
  description: string;
  isReference?: boolean;
  referenceSlug?: string;
  referenceName?: string;
  roles?: string[];
  enumOptions?: string[];
  example?: string;
}

export interface ObjectCTA {
  name: string;
  roles: string;
  permission: string;
  priority: Priority;
  description?: string;
  crossObjectSlug?: string;
  crossObjectName?: string;
  roleKeys?: string[];
}

export interface ObjectVariation {
  name: string;
  qualifier: string;
  slug: string;
  products: string;
  objectType: ObjectType;
}

export interface UserStory {
  title: string;
  icon: string;
  role: string;
  action: string;
  object: string;
  benefit: string;
  whenClause: string;
  thenClause: string;
  crossObjects?: { slug: string; name: string }[];
}

export interface BusinessRule {
  title: string;
  description: string;
}

export interface LifecycleState {
  name: string;
  description: string;
  triggers: string;
  variant: 'active' | 'default' | 'warn';
}

export interface LifecycleFlow {
  states: LifecycleState[];
  transitions: { from: string; to: string[] }[];
}

export interface MCSFDSpec {
  targetSlug: string;
  targetName: string;
  mechanics: string;
  cardinality: string;
  sorts: string;
  filters: string;
  dependencies: string;
}

export interface NestedObject {
  slug: string;
  name: string;
  cardinality: string;
  description: string;
}

export interface SIPValidation {
  structure: { pass: boolean; evidence: string };
  instances: { pass: boolean; evidence: string };
  purpose: { pass: boolean; evidence: string };
  verdict: string;
}

export interface SynonymEntry {
  term: string;
  context: string;
  notes: string;
}

export interface ShowcaseExample {
  [key: string]: unknown;
  _contextData?: Record<string, unknown>;
}

export interface RepresentationSection {
  layout: 'card' | 'list' | 'detail';
  heading: string;
  description: string;
  defaultShape: ValidShape;
  examples: ShowcaseExample[];
  attributes: ObjectAttribute[];
  ctas: ObjectCTA[];
  componentTag: string;
}

export interface ShapeSpec {
  visibleAttributes: string[];
  availableCTAs: string[];
}

interface BaseView {
  context: string;
  value: string;
  description: string;
  userIntent?: string;
  contextDataSchema?: Record<string, { type: string; description: string }>;
}

export interface ListView extends BaseView {
  viewType: 'list';
  shapes: {
    list?: ShapeSpec;
    grid?: ShapeSpec;
    table?: ShapeSpec;
  };
}

export interface DetailView extends BaseView {
  viewType: 'detail';
  visibleAttributes: string[];
  availableCTAs: string[];
}

export type ObjectView = ListView | DetailView;

export interface ObjectDefinition {
  identity: ObjectIdentity;
  variations?: ObjectVariation[];
  representations: RepresentationSection[];
  stories: UserStory[];
  businessRules: BusinessRule[];
  lifecycle: LifecycleFlow;
  relationships: MCSFDSpec[];
  relatedObjects: string[];
  nestedObjects: NestedObject[];
  allAttributes: ObjectAttribute[];
  allCTAs: ObjectCTA[];
  sipValidation: SIPValidation;
  synonyms: SynonymEntry[];
  objectViews?: ObjectView[];
}

export interface SystemDefinition {
  slug: string;
  name: string;
  description: string;
  owner: string;
  updatedAt: string;
  objectSlugs: string[];
}
