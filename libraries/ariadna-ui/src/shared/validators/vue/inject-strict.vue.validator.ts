import type { InjectionKey } from 'vue';
import { inject } from 'vue';

/**
 * Strict inject data by key.
 *
 * @param {InjectionKey<T>} key
 * @param {T} fallback
 * @returns {T}
 */
export default function injectStrict<T>(key: InjectionKey<T>, fallback?: T) {
  const resolved = inject(key, fallback);

  if (typeof resolved === 'undefined') {
    throw new Error(`Could not resolve ${key.description}`);
  }

  return resolved;
}
