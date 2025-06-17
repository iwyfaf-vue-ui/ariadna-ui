import type { Ref } from 'vue';

/**
 * Represents the return type of the `useOrderedElements` composable, which manages an ordered collection of elements.
 *
 * @template Elements - The type of elements managed, defaults to HTMLElement.
 */
export type TUseOrderedElementsReturn<Elements = HTMLElement> = {
  /**
   * A reactive reference to an array of elements of type Elements.
   */
  elements: Ref<Array<Elements>>;

  /**
   * A function to assign or update an element at a specific index in the collection.
   *
   * @param {Elements} element - The HTMLElement (or generic type Elements) to be filled or updated.
   * @param {number} index - The position at which the element should be placed.
   */
  fillElements: (element: Elements, index: number) => void;

  /**
   * Function to clear all elements from the collection.
   */
  clearElements: () => void;
};
