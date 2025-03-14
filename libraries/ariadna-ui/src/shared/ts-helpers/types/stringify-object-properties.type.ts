/**
 * A generic utility type that recursively transforms all properties of an object `T` to `string`.
 *
 * @template T - The input object type whose properties will be transformed.
 *
 * @description
 * This type iterates over all properties of the input object `T`. If a property is an object itself,
 * it recursively applies the transformation to its properties. Otherwise, it converts the property type to `string`.
 *
 * @example
 * ```typescript
 * type Example = {
 *   id: number;
 *   details: {
 *     name: string;
 *     age: number;
 *   };
 * };
 *
 * type TransformedExample = TStringifyObjectProperties<Example>;
 * // TransformedExample will be:
 * // {
 * //   id: string;
 * //   details: {
 * //     name: string;
 * //     age: string;
 * //   };
 * // }
 * ```
 */
export type TStringifyObjectProperties<T> = {
  [P in keyof T]: T[P] extends object ? TStringifyObjectProperties<T[P]> : string;
};
