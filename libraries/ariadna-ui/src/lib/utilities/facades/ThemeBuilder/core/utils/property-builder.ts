import Notifications from '../notifications/';
import { UTILITY_PROPERTY_HAS_DASH } from '../notifications/locales/errors.notifications.locales';

/**
 * @description A utility class for building and manipulating property names in objects.
 * Provides functionality to flatten nested objects and customize property names.
 */
export default class PropertyBuilder {
  /**
   * @description  Flattens a nested object into a single-level object with keys concatenated by a
   * specified delimiter.
   *
   * @param obj - The object to flatten.
   * @param delimiter - The delimiter used to concatenate keys. Defaults to '-'.
   * @param strict - If `true`, the method will throw an error if any key contains the delimiter. Defaults to `false`.
   * @returns A flattened object. If `strict` is `true` and a key contains the delimiter, an error notification is returned.
   *
   * @example
   * const builder = new PropertyBuilder();
   * const flattened = builder.flattenObj({ a: { b: 1, c: 2 } });
   * // Result: { 'a-b': 1, 'a-c': 2 }
   */
  flattenObj(obj: { [key: string]: any }, delimiter = '-', strict: boolean = false) {
    let result: any = {};

    for (const i in obj) {
      if (strict && i.includes('-')) {
        return new Notifications(UTILITY_PROPERTY_HAS_DASH(i)).error();
      }

      if (typeof obj[i] === 'object' && !Array.isArray(obj[i])) {
        const temp = this.flattenObj(obj[i]);
        for (const j in temp) {
          result[i + delimiter + j] = temp[j];
        }
      } else {
        result[i] = obj[i];
      }
    }
    return result;
  }

  /**
   * @description Duplicates a property name with a custom value appended to it.
   *
   * @param name - The base name of the property.
   * @param value - The value to append to the property name.
   * @returns A string combining the property name and the appended value.
   *
   * @example
   * const builder = new PropertyBuilder();
   * const result = builder.duplicatePropertyWithCustomName('prop', 'value');
   * // Result: 'prop value'
   */
  duplicatePropertyWithCustomName(name: string, value: string) {
    return `${name} ${value}`;
  }
}
