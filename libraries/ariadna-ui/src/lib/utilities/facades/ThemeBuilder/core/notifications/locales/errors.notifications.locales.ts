/**
 * @description Error messages.
 */
export enum ErrorMessages {
  NAME_IS_NOT_SPECIFIED = 'Theme name option is not specified',
  DESTINATION_IS_NOT_SPECIFIED = 'Theme destination path option is not specified',
  THEME_NAME_IS_NOT_SPECIFIED = 'Theme name option is not specified',
  UTILITY_CLASSES_FILE_NAME_IS_NOT_SPECIFIED = 'Utility classes file name option is not specified',
}

/**
 * Generates an error message indicating that a utility property contains a dash symbol.
 * This is typically used to enforce naming conventions where dashes are not allowed.
 *
 * @param {string} property - The name of the utility property that contains a dash symbol.
 * @returns {string} A formatted error message indicating the presence of a dash in the property name.
 *
 * @example
 * const errorMessage = UTILITY_PROPERTY_HAS_DASH('background-color');
 * console.log(errorMessage); // Output: Utility property "background-color" has dash symbol
 */
export const UTILITY_PROPERTY_HAS_DASH = (property: string) =>
  `Utility property "${property}" has dash symbol`;
