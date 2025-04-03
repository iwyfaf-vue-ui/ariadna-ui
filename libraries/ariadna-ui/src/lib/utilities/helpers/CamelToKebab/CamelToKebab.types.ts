/**
 * Ariadna UI | Utilities | Helpers
 *
 * @description Converts camelCase or PascalCase string to kebab-case.
 *
 * This function handles both camelCase and PascalCase strings while preserving acronyms.
 * For example:
 * - 'camelCase' becomes 'camel-case'
 * - 'PascalCase' becomes 'pascal-case'
 * - 'XMLHttpRequest' becomes 'xml-http-request'
 *
 * @param {string} string - The input string in camelCase or PascalCase format to be converted
 * @returns {string} The converted kebab-case string
 *
 * @example
 * // Basic usage
 * camelToKebab('camelCase'); // returns 'camel-case'
 * camelToKebab('PascalCase'); // returns 'pascal-case'
 *
 * @example
 * // With acronyms
 * camelToKebab('XMLHttpRequest'); // returns 'xml-http-request'
 * camelToKebab('HTMLElement'); // returns 'html-element'
 */
declare function camelToKebab(string: string): string;

export default camelToKebab;
