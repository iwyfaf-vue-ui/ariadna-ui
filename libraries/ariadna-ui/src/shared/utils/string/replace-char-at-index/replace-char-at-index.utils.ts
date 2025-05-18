/**
 * Replaces a character in a string at a specified index with a given replacement.
 *
 * @description
 * This function takes a string, an index, and a replacement character, and returns a new string with the character
 * at the specified index replaced. If the index is out of bounds, the original string is returned unchanged.
 *
 * @param {string} str - The original string in which the character will be replaced.
 * @param {number} index - The index at which the character will be replaced. Must be a valid index within the string's
 * length.
 * @param {string} replacement - The character to replace the existing character at the specified index.
 *
 * @returns {string} A new string with the character at the specified index replaced, or the original string if the index is out of bounds.
 *
 * @example
 * const result = replaceByIndex("hello", 1, "a");
 * console.log(result); // Output: "hallo"
 *
 * @example
 * const result = replaceByIndex("world", 10, "x");
 * console.log(result); // Output: "world"
 */
export default function replaceByIndex(str: string, index: number, replacement: string) {
  if (index < 0 || index >= str.length) {
    return str;
  }

  const arr = Array.from(str);
  arr[index] = replacement;

  return arr.join('');
}
