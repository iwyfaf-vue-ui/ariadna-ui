import type { TUseOrderedElementsReturn } from './types/useOrderedElements.types';
import type { Ref } from 'vue';
import { onScopeDispose, ref } from 'vue';

export default function useOrderedElements<
  Elements = HTMLElement,
>(): TUseOrderedElementsReturn<Elements> {
  const elements: Ref<Array<Elements>> = ref([]);

  const fillElements = (element: Elements, index: number): void => {
    elements.value[index] = element;
  };

  const clearElements = (): void => {
    elements.value.length = 0;
  };

  onScopeDispose(() => {
    clearElements();
  });

  return { elements, fillElements, clearElements };
}
