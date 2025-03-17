/**
 * @description Converts a camelCase string to a kebab-case string.
 *
 * This function takes a camelCase string and transforms it into a kebab-case string.
 * It handles both standard camelCase (e.g., `camelCase`) and edge cases where multiple
 * uppercase letters are present (e.g., `XMLHttpRequest`).
 *
 * @param {string} str - The camelCase string to convert.
 * @returns {string} The kebab-case version of the input string.
 *
 * @example
 * // Returns "camel-case"
 * camelToKebabHelper("camelCase");
 *
 * @example
 * // Returns "xml-http-request"
 * camelToKebabHelper("XMLHttpRequest");
 *
 * @example
 * // Returns "already-kebab-case"
 * camelToKebabHelper("already-kebab-case");
 */
export default function camelToKebabHelper(str: string): string {
  return str.replace(
    /(?<!-)([A-Z]+(?![a-z])|[A-Z])/g,
    ($, ofs) => (ofs ? '-' : '') + $.toLowerCase(),
  );
}
