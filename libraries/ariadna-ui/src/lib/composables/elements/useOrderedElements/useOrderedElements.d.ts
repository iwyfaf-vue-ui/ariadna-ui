import type { Ref } from 'vue';
import type { TUseOrderedElementsReturn } from './types/useOrderedElements.types';

/**
 * Ariadna UI | composables | useOrderedElements
 *
 * useOrderedElements provides ordered access to a collection of elements. It returns reactive references and utilities
 * to manage and interact with these elements in a defined order.
 *
 * @template Elements - The type of elements managed, defaults to HTMLElement.
 *
 * @returns {TUseOrderedElementsReturn<Elements>} An object containing reactive references and methods related to the
 * ordered elements.
 *
 * @example
 * const { elements, addElement, removeElement } = useOrderedElements ();
 * addElement(document.createElement('div'));
 * console.log(elements.value); // Logs the current ordered elements
 */
declare function useOrderedElements<Elements = HTMLElement>(): TUseOrderedElementsReturn<Elements>;

export default useOrderedElements;
