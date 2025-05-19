/**
 * Ariadna UI | Utilities | Debounce
 *
 * @description
 * Creates a debounced version of the provided callback function. The debounced function delays invoking the callback
 * until after a specified timeout has elapsed since the last time it was invoked. Optionally, the callback can be
 * invoked immediately.
 *
 * @param callback - The function to debounce. Must be a valid function.
 * @param timeout - The number of milliseconds to delay. defaults to 300ms.
 * @param immediate - If true, the callback is invoked immediate. Otherwise, it is invoked on the trailing edge.
 * Defaults to false.
 *
 * @returns {Function} - A new debounced function that wraps the original callback.
 *
 * @throws {TypeError} - If the provided callback is not a function.
 *
 * @example
 * const debouncedLog = debounce((msg) => console.log(msg), 500, true);
 * debouncedLog('Hello'); // Logs 'Hello' immediately
 * debouncedLog('World'); // Ignored if called within 500ms
 */
declare function debounce(
  callback: Function,
  timeout?: number,
  immediate?: boolean,
): (...args: any[]) => void;

export default debounce;
