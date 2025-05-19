import { ELibraryConfig } from '@/types/internal';
import { EThrottleConfig, EThrottleErrors } from './types/Throttle.enum';

export default function throttle(callback: Function, timeout: number = 300) {
  let timer: ReturnType<typeof setTimeout> | undefined = undefined;

  const isCallbackFunction = typeof callback === 'function';

  if (!isCallbackFunction) {
    throw new TypeError(
      `${ELibraryConfig.NAME}(${EThrottleConfig.NAME}): ${EThrottleErrors.EXPECTED_FUNCTION}`,
    );
  }

  return function (...args: any[]) {
    if (timer) return;

    timer = setTimeout(() => {
      callback(...args);
      clearTimeout(timer);
      timer = undefined;
    }, timeout);
  };
}
