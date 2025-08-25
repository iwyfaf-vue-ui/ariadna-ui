import type { ComputedRef, Ref } from 'vue';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import type { TUseElementsSizes, TUseElementsSizesReturn } from './types/useElementsSizes.types';

export default function useElementsSizes(
  elementsRef: Ref<Array<HTMLElement> | null> | ComputedRef<Array<HTMLElement> | null>,
  handler?: (sizes: Array<TUseElementsSizes>) => void,
): TUseElementsSizesReturn {
  const sizes = ref<Array<TUseElementsSizes>>([]);
  const observers = new Map<HTMLElement, ResizeObserver>();

  const updateSizes = () => {
    const elements = elementsRef.value;

    if (!elements) {
      return;
    }

    sizes.value = elements.map((el) => ({
      width: el?.offsetWidth || 0,
      height: el?.offsetHeight || 0,
      scrollWidth: el?.scrollWidth || 0,
      scrollHeight: el?.scrollHeight || 0,
    }));

    handler?.(sizes.value);
  };

  const observeAll = () => {
    const elements = elementsRef.value;

    if (!elements) {
      return;
    }

    elements.forEach((el) => {
      if (observers.has(el)) {
        return;
      }

      const observer = new ResizeObserver(updateSizes);
      observer.observe(el);
      observers.set(el, observer);
    });

    updateSizes();
  };

  const unobserveAll = () => {
    observers.forEach((observer, el) => {
      observer.unobserve(el);
      observer.disconnect();
    });

    observers.clear();
  };

  onMounted(() => {
    observeAll();
  });

  onUnmounted(() => {
    unobserveAll();
  });

  watch(
    () => elementsRef.value?.map((el) => el),
    (newElements, oldElements) => {
      if (newElements?.some((element, index) => element === oldElements?.[index])) {
        return;
      }

      unobserveAll();

      // Важно: вызов observeAll оборачивается в setTimeout, чтобы избежать рекурсивного обновления в тестах.
      // watch следит за массивом DOM-элементов, и при обновлении запускает ResizeObserver,
      // который (через обновление размеров и стилей) может привести к повторному обновлению массива элементов,
      // особенно в тестовой среде (Vitest + happy-dom), где ResizeObserver срабатывает синхронно.
      // В браузере такой проблемы нет, так как ResizeObserver работает асинхронно.
      setTimeout(observeAll);
    },
  );

  return { sizes };
}
