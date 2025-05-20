import type { TOnClickOutsideDirective } from './types/OnClickOutside.types';
import { ELibraryConfig } from '@/types/internal';
import { EOnClickOutsideConfig, EOnClickOutsideErrors } from './types/OnClickOutside.enum';

const eventHandlers: WeakMap<HTMLElement, (event: Event) => void> = new WeakMap<
  HTMLElement,
  (event: Event) => void
>();

function getEventType(): 'touchstart' | 'click' {
  return 'ontouchstart' in document ? 'touchstart' : 'click';
}

const vOnClickOutside: TOnClickOutsideDirective = {
  mounted: (el, binding) => {
    const vm = binding.instance;
    const callback = binding.value;

    const isCallbackFunction = typeof callback === 'function';

    if (!isCallbackFunction) {
      throw new TypeError(
        `${ELibraryConfig.NAME}(${EOnClickOutsideConfig.NAME}): ${EOnClickOutsideErrors.EXPECTED_FUNCTION}`,
      );
    }

    const eventHandler = (event: Event) => {
      if (
        (!el || (event.target && !el.contains(event.target as Node))) &&
        callback &&
        isCallbackFunction
      ) {
        return callback.call(vm, event);
      }
    };

    eventHandlers.set(el, eventHandler);

    const eventType = getEventType();
    document.addEventListener(eventType, eventHandler, { passive: true });
  },

  updated: (el, binding) => {
    if (binding.value === binding.oldValue) {
      return;
    }

    const eventHandler = eventHandlers.get(el);

    if (eventHandler) {
      const eventType = getEventType();
      document.removeEventListener(eventType, eventHandler, false);
      eventHandlers.delete(el);
    }

    vOnClickOutside.mounted(el, binding);
  },

  unmounted: (el) => {
    const eventHandler = eventHandlers.get(el);

    if (eventHandler) {
      const eventType = getEventType();

      document.removeEventListener(eventType, eventHandler, false);
      eventHandlers.delete(el);
    }
  },
};

export default vOnClickOutside;
