export type ObjectType = 'core' | 'domain' | 'variation';
export type ObjectCategory = 'people' | 'container' | 'activity' | 'knowledge' | 'data-ai' | 'content' | 'analytics';
export type Priority = 'P' | 'S' | 'T' | 'Q';
export type ValidShape = 'card' | 'compact-card' | 'row' | 'mini-row' | 'data-row' | 'profile' | 'header' | 'detail' | 'nested-card' | 'embed';

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

export interface ShapeshifterEntry {
  context: string;
  value: string;
  shape: ValidShape;
  description: string;
  visibleAttributes: string[];
  availableCTAs: string[];
  cardShape: string;
  userIntent?: string;
  contextDataSchema?: Record<string, { type: string; description: string }>;
}

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
  shapeshifterMatrix?: ShapeshifterEntry[];
}

export interface SystemDefinition {
  slug: string;
  name: string;
  description: string;
  owner: string;
  updatedAt: string;
  objectSlugs: string[];
}
