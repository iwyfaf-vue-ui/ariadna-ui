/**
 * Type for Tag prop.
 */
export type TCardPropsTag = 'div' | 'a' | string;

/**
 * Type for Symbols prop.
 */
export type TCardPropsSymbols = {
  /**
   * All symbols per card.
   */
  all: number;

  /**
   * Count of visible symbols in content slot.
   */
  visible: number;
};
