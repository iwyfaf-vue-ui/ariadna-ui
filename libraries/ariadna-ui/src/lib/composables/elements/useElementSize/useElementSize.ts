import { onMounted, onScopeDispose, onUnmounted, watch } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import type { TUseElementSizeReturn } from './types/useElementSize.types';
import { ref } from 'vue';
export default function useElementSize(
  element: Ref<HTMLElement | null> | ComputedRef<HTMLElement | null>,
  timeout: number = 200,
  handler?: (values: TUseElementSizeReturn) => void,
): TUseElementSizeReturn {
  const width = ref<number>(0);
  const scrollWidth = ref<number>(0);
  const height = ref<number>(0);
  const scrollHeight = ref<number>(0);

  const resizeObserver = ref<ResizeObserver | null>(null);

  const onResize = () => {
    if (!element.value) return;

    width.value = element.value.offsetWidth;
    scrollWidth.value = element.value.scrollWidth;
    height.value = element.value.offsetHeight;
    scrollHeight.value = element.value.scrollHeight;
    handler?.({ width, height, scrollHeight, scrollWidth });
  };

  const throttledOnResize = throttle(onResize, timeout);

  onMounted(() => {
    resizeObserver.value = new ResizeObserver(throttledOnResize);
    onResize();

    if (element.value) {
      resizeObserver.value.observe(element.value);
    }
  });

  onUnmounted(() => {
    if (!element.value || !resizeObserver.value) return;
    resizeObserver.value.unobserve(element.value);
  });

  onScopeDispose(() => {
    if (element.value && resizeObserver.value) {
      resizeObserver.value.unobserve(element.value);
    }
  });

  watch(element, (newElement, oldElement) => {
    if (!resizeObserver.value) return;
    if (newElement === oldElement) return;

    if (oldElement) {
      resizeObserver.value.unobserve(oldElement);
    }

    if (newElement) {
      resizeObserver.value.observe(newElement);
    }
  });

  return {
    width,
    scrollWidth,
    height,
    scrollHeight,
  };
}

import throttle from '@/lib/utilities/functions-decorators/Throttle/Throttle';
