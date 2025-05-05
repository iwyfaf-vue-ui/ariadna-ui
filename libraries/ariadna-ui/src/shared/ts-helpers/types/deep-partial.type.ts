/**
 * @description
 * Recursively constructs a type with all properties of `T` set to optional.
 * This is a deep version of the built-in `Partial` type, meaning that it
 * makes all properties at every level of nesting optional.
 *
 * @template T - The type to transform into a deep partial version.
 *
 * @example
 * ```typescript
 * type User = {
 *   id: number;
 *   name: string;
 *   address: {
 *     street: string;
 *     city: string;
 *   };
 * };
 *
 * type PartialUser = TDeepPartial<User>;
 * // PartialUser is equivalent to:
 * // {
 * //   id?: number;
 * //   name?: string;
 * //   address?: {
 * //     street?: string;
 * //     city?: string;
 * //   };
 * // }
 * ```
 */
export type TDeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: TDeepPartial<T[P]>;
    }
  : T;
