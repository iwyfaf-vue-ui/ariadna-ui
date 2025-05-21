import type { TTextareaAutoHeightDirective } from './types/TextareaAutoHeight.types';

/**
 * Ariadna UI | Directives | TextareaAutoHeight
 *
 * @description
 * `vTextareaAutoHeight` is a Vue custom directive for automatically adjusts the height of a textarea element based on
 * its content.
 *
 * @example
 * <textarea v-textarea-auto-height />
 * <textarea v-textarea-auto-height="{ timeout: 1000 }" />
 */
declare const vTextareaAutoHeight: TTextareaAutoHeightDirective;

export default vTextareaAutoHeight;
