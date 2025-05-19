/**
 * Ariadna UI | Utilities | Throttle
 *
 * Throttles the execution of a function, ensuring it is called at most once within a specified time interval.
 *
 * @description This function wraps the provided callback and ensures it is executed no more than once
 * within the given timeout period. If the function is called multiple times within the timeout,
 * only the first call will be executed, and subsequent calls will be ignored until the timeout expires.
 *
 * @param {Function} callback - The function to be throttled. Must be a valid function.
 * @param {number} [timeout=300] - The time interval (in milliseconds) during which the function should be throttled.
 * Defaults to 300ms.
 *
 * @returns {Function} - A new function that wraps the original callback and enforces the throttling behavior.
 *
 * @throws {TypeError} - If the provided callback is not a function.
 *
 * @example
 * const throttledFunction = throttle(() => {
 *   console.log('Function executed');
 * }, 1000);
 *
 * // Calling the throttled function multiple times within 1 second
 * throttledFunction(); // Logs "Function executed"
 * throttledFunction(); // Ignored
 * throttledFunction(); // Ignored
 *
 * // After 1 second, the function can be executed again
 * setTimeout(throttledFunction, 1000); // Logs "Function executed"
 */
declare function throttle(callback: Function, timeout?: number): (...args: any[]) => void;

export default throttle;
