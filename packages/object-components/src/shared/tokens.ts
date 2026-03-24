import { css } from 'lit';

export const tokenDefaults = css`
  :host {
    --ren-font-plain: var(--font-plain, 'Roboto', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif);
    --ren-font-mono: var(--font-mono, ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace);

    --ren-color-dark: var(--color-dark, #1a1a2e);
    --ren-color-mid: var(--color-mid, #4a4a68);
    --ren-color-text: var(--color-text, #202020);
    --ren-color-text-secondary: var(--color-text-secondary, #4d4d4d);
    --ren-color-text-muted: var(--color-text-muted, #707070);
    --ren-color-border: var(--color-border, #e5e5e5);
    --ren-color-border-light: var(--color-border-light, #eee);
    --ren-color-bg: var(--color-bg, #fff);
    --ren-color-bg-muted: var(--color-bg-muted, #fafafa);
    --ren-color-bg-tertiary: var(--color-bg-tertiary, #fff4f4);
    --ren-color-bg-hover: var(--color-bg-hover, #f5f5f5);
    --ren-color-brand: var(--color-brand, #cf3a4e);
    --ren-color-accent: var(--color-accent, #2B87FF);
    --ren-color-interactive: var(--color-interactive, #146EB3);
    --ren-color-link: var(--color-link, #146EB3);
    --ren-color-success: var(--color-success, #398b26);
    --ren-color-warning: var(--color-warning, #e6a817);

    --ren-color-status-success: var(--color-status-success, #2e7d32);
    --ren-color-status-success-bg: var(--color-status-success-bg, #e8f5e9);
    --ren-color-status-warning: var(--color-status-warning, #e65100);
    --ren-color-status-warning-bg: var(--color-status-warning-bg, #fff3e0);
    --ren-color-status-danger: var(--color-status-danger, #c62828);
    --ren-color-status-danger-bg: var(--color-status-danger-bg, #fce4ec);
    --ren-color-status-info: var(--color-status-info, #1565c0);
    --ren-color-status-info-bg: var(--color-status-info-bg, #e3f2fd);
    --ren-color-status-neutral: var(--color-status-neutral, #666);
    --ren-color-status-neutral-bg: var(--color-status-neutral-bg, #f5f5f5);

    --ren-color-subject-reading: var(--color-subject-reading, #8385F6);
    --ren-color-subject-math: var(--color-subject-math, #41C395);

    --ren-color-core-object: var(--color-core-object, #2563EB);
    --ren-color-domain-object: var(--color-domain-object, #7C3AED);
    --ren-color-variation-object: var(--color-variation-object, #059669);

    --ren-radius-xs: var(--radius-xs, 3px);
    --ren-radius-sm: var(--radius-sm, 4px);
    --ren-radius-md: var(--radius-md, 8px);
    --ren-radius-lg: var(--radius-lg, 12px);
    --ren-radius-pill: var(--radius-pill, 9999px);

    --ren-space-xs: var(--space-xs, 0.25rem);
    --ren-space-sm: var(--space-sm, 0.5rem);
    --ren-space-md: var(--space-md, 1rem);
    --ren-space-lg: var(--space-lg, 1.5rem);
    --ren-space-xl: var(--space-xl, 2rem);

    --ren-tracking: var(--tracking, 0.5px);

    font-family: var(--ren-font-plain);
    color: var(--ren-color-text);
    letter-spacing: var(--ren-tracking);
    line-height: 1.5;
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
  }
`;
