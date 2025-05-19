import { ELibraryConfig } from '@/types/internal';
import { EDebounceConfig, EDebounceErrors } from './types/Debounce.enum';

export default function debounce(callback: Function, timeout = 300, immediate = false) {
  let lastCallTimer: ReturnType<typeof setTimeout> | undefined = undefined;
  const isCallbackFunction = typeof callback === 'function';
  let isFirstCalled = false;

  if (!isCallbackFunction) {
    throw new TypeError(
      `${ELibraryConfig.NAME}(${EDebounceConfig.NAME}): ${EDebounceErrors.EXPECTED_FUNCTION}`,
    );
  }

  return function (this: any, ...args: any[]) {
    if (immediate && !isFirstCalled) {
      callback.apply(this, args);
      isFirstCalled = true;
    }

    if (lastCallTimer) {
      clearTimeout(lastCallTimer);
    }

    lastCallTimer = setTimeout(() => {
      if (!immediate) {
        callback.apply(this, args);
      }
      isFirstCalled = false;
    }, timeout);
  };
}
