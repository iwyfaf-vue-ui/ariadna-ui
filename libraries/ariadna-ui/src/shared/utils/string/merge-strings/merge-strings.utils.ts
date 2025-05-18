/**
 * Merges two strings by replacing characters in the original string with corresponding characters from the new string.
 *
 * @description This function iterates through each character of the original string and replaces it with the
 * corresponding character from the new string if available. If the new string is shorter, the original characters are
 * preserved.
 *
 * @param {string} originalStr - The original string to be modified.
 * @param {string} newStr - The new string containing characters to replace in the original string.
 *
 * @returns {string} A new string with characters merged from both the original and new strings.
 *
 * @example
 * const result = mergeStrings("hello", "world");
 * console.log(result); // Output: "world"
 *
 * @example
 * const result = mergeStrings("hello", "wo");
 * console.log(result); // Output: "wollo"
 */
export default function mergeStrings(originalStr: string, newStr: string): string {
  const updatedChars = [];

  for (let i = 0; i < originalStr.length; i++) {
    const originalChar = originalStr.charAt(i);
    const updateChar = newStr.charAt(i);

    updateChar ? updatedChars.push(updateChar) : updatedChars.push(originalChar);
  }

  return updatedChars.join('');
}
