import type { DirectiveBinding, VNode } from 'vue';
import type { TInputNumberDirective } from './InputNumber.types';
import type { IInputNumberElement, TInputNumberOptions } from '../types/InputNumber.types';
import InputNumberElementCore from '../core/element/input-number.element.core';
import InputNumberEventsCore from '../core/events/input-number.events.core';

const vInputNumber: TInputNumberDirective = {
  beforeMount: (
    el: IInputNumberElement,
    binding: DirectiveBinding<TInputNumberOptions>,
    vnode: VNode,
  ) => {
    el.__inputNumberCore__ = new InputNumberElementCore();
    const core = el.__inputNumberCore__;

    el = core.getInputElement(el);
    el.options = binding.value;

    core.updateValue(el, vnode, { emit: false, force: true, validate: true });
  },

  mounted: (el: IInputNumberElement) => {
    const core = el.__inputNumberCore__;
    if (!core) return;
    const handlerOwner = el.parentElement || el;

    const onClick = (event: Event) => {
      if (event.target !== el) {
        return;
      }
      core.clickHandler(event as InputNumberEventsCore);
    };

    const onInput = (event: Event) => {
      if (event.target !== el) {
        return;
      }
      core.inputHandler(event as InputNumberEventsCore);
    };

    const onBlur = (event: Event) => {
      if (event.target !== el) {
        return;
      }
      core.blurHandler(event as InputNumberEventsCore);
    };

    handlerOwner.addEventListener('click', onClick, true);
    handlerOwner.addEventListener('input', onInput, true);
    handlerOwner.addEventListener('blur', onBlur, true);

    el.cleanup = () => {
      handlerOwner.removeEventListener('click', onClick, true);
      handlerOwner.removeEventListener('input', onInput, true);
      handlerOwner.removeEventListener('blur', onBlur, true);
    };
  },

  updated: (el: IInputNumberElement, binding: DirectiveBinding, vnode: VNode) => {
    const { value, oldValue, modifiers } = binding;
    const core = el.__inputNumberCore__;
    if (!core) return;

    el = core.getInputElement(el);

    if (value !== oldValue) {
      const options = el.options;
      el.options = Object.assign(options, value, modifiers);
      core.updateValue(el, vnode, { emit: false, force: true, validate: false });
    } else {
      core.updateValue(el, vnode, { emit: false });
    }
  },

  unmounted: (el: IInputNumberElement) => {
    if (el.cleanup) {
      el.cleanup();
    }

    if (el.__inputNumberCore__) {
      delete el.__inputNumberCore__;
    }
  },
};

export default vInputNumber;
