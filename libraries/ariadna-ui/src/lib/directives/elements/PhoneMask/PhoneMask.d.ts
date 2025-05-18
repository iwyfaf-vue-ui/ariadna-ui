import type { TPhoneMaskDirective } from './types/PhoneMask.types';

/**
 * Ariadna UI | Directives | PhoneMask
 *
 * @description
 * `vPhoneMask` is a Vue custom directive for applying a russian phone number mask to an input element. This directive
 * formats the input value according to a specified separator and optionally clones the input element.
 *
 * @example
 * <input
 *   v-model="inputTextFilled"
 *   v-phone-mask="{
 *     clone: true,
 *     separator: '—',
 *   }"
 *   placeholder="+7 (___) ___—__—__"
 *   type="tel"
 * />
 */
declare const vPhoneMask: TPhoneMaskDirective;

export default vPhoneMask;
