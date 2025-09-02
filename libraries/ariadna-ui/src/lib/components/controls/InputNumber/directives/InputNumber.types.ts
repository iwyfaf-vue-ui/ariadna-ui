import type { DirectiveBinding, VNode } from 'vue';
import type {
  IInputNumberElement,
  TInputNumberOptions,
} from '@/lib/components/controls/InputNumber/types/InputNumber.types';

export type TInputNumberDirectiveValue = {};

export type TInputNumberDirective = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding<TInputNumberOptions>, vnode: VNode): void;
  mounted(el: HTMLElement): void;
  updated(el: IInputNumberElement, binding: DirectiveBinding, vnode: VNode): void;
  unmounted(el: HTMLElement): void;
};
