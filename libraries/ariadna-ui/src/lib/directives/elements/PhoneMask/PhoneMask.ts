import type { TPhoneMaskDirective } from './types/PhoneMask.types';
import { EPhoneMaskErrors } from '../PhoneMask/types/PhoneMask.enum';
import inputCloneCore from './core/input-clone/input-clone.core';
import PhoneFormatter from './core/phone-formatter/phone-formatter.core';
import backspaceHandler from './core/backspace-handler/backspace-handler.core';
import mergeStrings from '@/shared/utils/string/merge-strings/merge-strings.utils';

const vPhoneMask: TPhoneMaskDirective = {
  mounted: (el, binding) => {
    const options = {
      clone: binding.value?.clone ?? false,
      separator: binding.value?.separator || '-',
    };
    let clonedEl: HTMLInputElement | null = null;

    const inputElement = el.nodeName === 'INPUT' ? el : el.querySelector('input');

    if (!inputElement) {
      throw Error(EPhoneMaskErrors.NO_INPUT);
    }

    if (options.clone) {
      clonedEl = inputCloneCore(inputElement);
    }

    const phoneNumberFormatter = new PhoneFormatter(options.separator);

    (function () {
      inputElement.value = phoneNumberFormatter.format(inputElement.value);

      if (clonedEl) {
        clonedEl.value = inputElement.value;
        clonedEl.placeholder = inputElement.value;
      }

      inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    })();

    el.oninput = function inputEvent(e: Event) {
      const target = e.target as HTMLInputElement;
      target.value = phoneNumberFormatter.format(target.value);

      if (clonedEl) {
        clonedEl.value = mergeStrings(inputElement.placeholder, target.value);
        clonedEl.placeholder = mergeStrings(inputElement.placeholder, target.value);
      }

      if (e.isTrusted) {
        target.dispatchEvent(new Event('input', { bubbles: true }));
      }
    };

    el.onkeydown = function keyDownEvent(e: KeyboardEvent) {
      const inputElement = e.target as HTMLInputElement;
      backspaceHandler(inputElement, e);

      if (e.isTrusted) {
        inputElement.dispatchEvent(new Event('input', { bubbles: true }));
      }
    };
  },
};

export default vPhoneMask;
