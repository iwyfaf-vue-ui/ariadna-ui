/**
 * @description
 * Represents a value that can be either a boolean or a string literal 'true' or 'false'.
 * Useful for accepting both boolean and string representations of boolean values.
 *
 * @example
 * let flag: Booleanish;
 * flag = true;
 * flag = false;
 * flag = 'true';
 * flag = 'false';
 */
export declare type Booleanish = boolean | 'true' | 'false';

/**
 * @description
 * Represents a value that can be either a number or a string.
 * Useful for accepting numeric values in both number and string formats.
 *
 * @example
 * let value: Numberish;
 * value = 42;
 * value = '42';
 */
export declare type Numberish = number | string;

/**
 * @description
 * Represents a value that can be of type T, or null, or undefined.
 * Useful for indicating that a value is optional or can be explicitly null.
 *
 * @template T - The type of the value that can be nullable.
 *
 * @example
 * let name: Nullable<string>;
 * name = 'Alice';
 * name = null;
 * name = undefined;
 */
export declare type Nullable<T = void> = T | null | undefined;
