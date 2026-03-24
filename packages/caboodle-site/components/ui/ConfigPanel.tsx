'use client';

interface ContextOption {
  value: string;
  label: string;
}

interface ConfigPanelProps {
  role: string;
  state: string;
  context: string;
  contexts?: ContextOption[];
  onRoleChange: (role: string) => void;
  onStateChange: (state: string) => void;
  onContextChange: (context: string) => void;
}

const ROLES = [
  { value: 'all', label: 'All users' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'student', label: 'Student' },
  { value: 'admin', label: 'Admin' },
];

const STATES = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'transferred', label: 'Transferred' },
  { value: 'graduated', label: 'Graduated' },
];

const DEFAULT_CONTEXTS: ContextOption[] = [
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'roster', label: 'Class roster' },
  { value: 'search', label: 'Search results' },
];

export function ConfigPanel({ role, state, context, contexts, onRoleChange, onStateChange, onContextChange }: ConfigPanelProps) {
  const contextOptions = contexts ?? DEFAULT_CONTEXTS;

  return (
    <div className="sidebar-card">
      <fieldset className="config-group">
        <legend className="config-group-label">Role</legend>
        <div className="config-options">
          {ROLES.map(r => (
            <label key={r.value} className="config-option">
              <input type="radio" name="role" value={r.value} checked={role === r.value} onChange={() => onRoleChange(r.value)} />
              {r.label}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="config-group">
        <legend className="config-group-label">State</legend>
        <div className="config-options">
          {STATES.map(s => (
            <label key={s.value} className="config-option">
              <input type="radio" name="state" value={s.value} checked={state === s.value} onChange={() => onStateChange(s.value)} />
              {s.label}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="config-group">
        <legend className="config-group-label">Context</legend>
        <div className="config-options">
          {contextOptions.map(c => (
            <label key={c.value} className="config-option">
              <input type="radio" name="context" value={c.value} checked={context === c.value} onChange={() => onContextChange(c.value)} />
              {c.label}
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
