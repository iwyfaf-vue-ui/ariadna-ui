import { ELibraryConfig } from '@/types/internal';
import throttle from '@/lib/utilities/functions-decorators/Throttle/Throttle';
import type { TTextareaAutoHeightDirective } from './types/TextareaAutoHeight.types';
import {
  ETextareaAutoHeightConfig,
  ETextareaAutoHeightErrors,
} from './types/TextareaAutoHeight.enum';
import adjustmentTextareaHeight from './core/adjustment-textarea-height/adjustment-textarea-height.core';
import handleEventListeners from './core/event-listeners-handler/event-listeners-handler.core';

const vTextareaAutoHeight: TTextareaAutoHeightDirective = {
  mounted: (el, binding) => {
    const options = {
      timeout: binding.value?.timeout ?? 400,
    };
    const textareaElement = el.nodeName === 'TEXTAREA' ? el : el.querySelector('textarea');

    if (!textareaElement) {
      throw new Error(
        `${ELibraryConfig.NAME}(${ETextareaAutoHeightConfig.NAME}): ${ETextareaAutoHeightErrors.NO_TEXTAREA}`,
      );
    }

    textareaElement.style.setProperty('overflow-y', 'hidden');

    el.throttledResizeTextareaHandler = throttle(
      () => adjustmentTextareaHeight(textareaElement),
      options.timeout,
    );

    handleEventListeners(textareaElement, el.throttledResizeTextareaHandler, 'add');
    window.addEventListener('resize', el.throttledResizeTextareaHandler);
  },

  unmounted: (el) => {
    const textareaElement = el.nodeName === 'TEXTAREA' ? el : el.querySelector('textarea');

    if (!textareaElement) {
      throw new Error(
        `${ELibraryConfig.NAME}(${ETextareaAutoHeightConfig.NAME}): ${ETextareaAutoHeightErrors.NO_TEXTAREA}`,
      );
    }

    handleEventListeners(textareaElement, el.throttledResizeTextareaHandler, 'remove');
    window.removeEventListener('resize', el.throttledResizeTextareaHandler);
  },
};

export default vTextareaAutoHeight;
