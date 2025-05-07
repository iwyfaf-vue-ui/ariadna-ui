import type { Directive } from 'vue';

/**
 * Ariadna UI | Directives | RenderAttributeOnce
 *
 * @description
 * `vRenderAttributeOnce` is a Vue custom directive that sets HTML attributes on an element only if they are not
 * already present. It ensures that each attribute from the provided binding value is rendered only once and not
 * overwritten if it already exists.
 *
 * @example
 * ```typescript
 *   <label v-render-attribute-once="{ for: randomId }"></label>
 *   <input type="text" v-render-attribute-once="{ id: randomId }" />
 * ```
 */
declare const vRenderAttributeOnce: Directive<HTMLElement>;

export default vRenderAttributeOnce;
