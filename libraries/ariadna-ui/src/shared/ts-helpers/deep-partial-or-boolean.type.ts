/**
 * A generic utility type that recursively transforms the fields of an object `T`.
 *
 * For each field in `T`:
 * - If the field's value is an object, it recursively applies the same transformation to that object.
 * - If the field's value is not an object, it allows the value to remain as-is or be a boolean.
 *
 * This results in a type where every field in `T` (and its nested objects) can either retain its original type or be a boolean.
 *
 * @template T - The object type to transform.
 *
 * @example
 * ```typescript
 * type Example = {
 *   a: number;
 *   b: { c: string; d: { e: boolean } };
 * };
 *
 * type TransformedExample = TDeepPartialOrBoolean<Example>;
 * // TransformedExample is equivalent to:
 * // {
 * //   a: number | boolean;
 * //   b: { c: string | boolean; d: { e: boolean | boolean } } | boolean;
 * // }
 * ```
 */
export type TDeepPartialOrBoolean<T> = {
  [Field in keyof T]: T[Field] extends object
    ? TDeepPartialOrBoolean<T[Field]> | boolean
    : T[Field] | boolean;
};
