import { unsafeCSS, type CSSResult } from 'lit';
import faRaw from '@fontawesome/css/svg-with-js.css?inline';

/**
 * Font Awesome SVG/JS styles for use inside Lit Web Component shadow roots.
 *
 * Add to a component's static styles array alongside tokenDefaults:
 *   static styles = [tokenDefaults, faStyles];
 *
 * The global FA JS (loaded via <script src="/fontawesome/js/all.min.js">) handles
 * SVG injection on the light DOM. For icons inside shadow roots, call
 * watchFontAwesomeInShadowRoot(this.shadowRoot) in connectedCallback().
 */
export const faStyles: CSSResult = unsafeCSS(faRaw);

/**
 * Registers a shadow root with Font Awesome's DOM watcher so that
 * <i class="fa-solid fa-..."> elements inside it get SVG injection.
 *
 * Call in connectedCallback() for components that use FA icons.
 *
 * @example
 * connectedCallback() {
 *   super.connectedCallback();
 *   watchFontAwesomeInShadowRoot(this.shadowRoot);
 * }
 */
export function watchFontAwesomeInShadowRoot(shadowRoot: ShadowRoot | null): void {
  if (!shadowRoot) return;
  // The FA JS library exposes itself on window as FontAwesome (v7)
  const fa = (window as Record<string, unknown>)['FontAwesome'] as
    | { dom: { watch: (options: { observeMutations: boolean; rootNode: ShadowRoot }) => void } }
    | undefined;
  if (fa?.dom?.watch) {
    fa.dom.watch({ observeMutations: true, rootNode: shadowRoot });
  }
}

/**
 * Inline SVG helper — renders a Font Awesome icon as a raw SVG string.
 * Use this as a fallback when the FA JS watcher is not available, or
 * for icons that need to be embedded directly in templates.
 *
 * Pass the raw SVG content imported via:
 *   import iconSvg from '@fontawesome/svgs-full/solid/user.svg?raw';
 *
 * @example
 *   import userSvg from '@fontawesome/svgs-full/solid/user.svg?raw';
 *   // in template:
 *   ${faInline(userSvg, 'User')}
 */
export function faInline(svgContent: string, label: string): string {
  const accessible = label
    ? svgContent.replace('<svg ', `<svg aria-label="${label}" role="img" `)
    : svgContent.replace('<svg ', '<svg aria-hidden="true" ');
  return accessible;
}
