/**
 * @description Capitalizes the first letter of a given string.
 *
 * @param {string} string - The input string to capitalize.
 * @returns {string} The input string with the first letter capitalized.
 *
 * @example
 * capitalize('hello'); // Returns 'Hello'
 * capitalize('world'); // Returns 'World'
 */
export default function capitalizeHelper(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
