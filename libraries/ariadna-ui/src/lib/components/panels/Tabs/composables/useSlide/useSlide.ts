import { ref, onMounted, reactive, onUnmounted } from 'vue';
import type { ShallowRef, Reactive } from 'vue';
import SlideCore from '../../core/slide/slide.core';
import type { TSlideCore } from '../../core/slide/slide.core.types';
import useElementSize from '@/lib/composables/elements/useElementSize/useElementSize';

export default function useSlide(
  container: Readonly<ShallowRef<HTMLDivElement | null>>,
  isSlide: boolean,
): Reactive<TSlideCore> {
  const slideCore = reactive(new SlideCore({ containerSize: { width: 0, scrollWidth: 0 } }));

  if (!isSlide) {
    return slideCore;
  }

  const clickStart = ref<number>(0);
  const isClickTimeout = 100;

  useElementSize(container, 100, (values) => {
    slideCore.updateContainerSize({
      width: values.width.value,
      scrollWidth: values.scrollWidth.value,
    });
  });

  onMounted(() => {
    if (!container.value) return;

    const paddingLeft = parseFloat(getComputedStyle(container.value).paddingLeft);
    const paddingRight = parseFloat(getComputedStyle(container.value).paddingRight);
    slideCore.updatePaddings([paddingLeft, paddingRight]);
  });

  function onMouseDown(event: MouseEvent) {
    event.preventDefault();

    clickStart.value = Date.now();
    slideCore.slideStart(event.clientX);
  }

  function onTouchStart(event: TouchEvent) {
    const touchList = event.touches;

    if (touchList.length !== 1) return;

    clickStart.value = Date.now();
    slideCore.slideStart(touchList[0]?.clientX || 0);
  }

  function onMouseMove(event: MouseEvent) {
    if (!slideCore.isSliding) return;

    slideCore.slideMove(event.clientX);
  }

  function onTouchMove(event: TouchEvent) {
    if (!slideCore.isSliding) return;

    const touchList = event.touches;

    if (touchList.length !== 1) return;

    slideCore.slideMove(touchList[0]?.clientX || 0);
  }

  function onMouseUp(event: MouseEvent) {
    if (slideCore.isSliding && Date.now() - clickStart.value > isClickTimeout) {
      event.stopPropagation();
    }

    slideCore.slideEnd();
  }

  function onTouchEnd(event: TouchEvent) {
    if (slideCore.isSliding && Date.now() - clickStart.value > isClickTimeout) {
      event.stopPropagation();
    }

    slideCore.slideEnd();
  }

  onMounted(() => {
    if (!container.value) return;

    container.value.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp, { passive: true, capture: true });
    container.value.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true, capture: true });
  });

  onUnmounted(() => {
    if (!container.value) return;

    container.value.removeEventListener('mousedown', onMouseDown);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp, true);
    container.value.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd, true);
  });

  return slideCore;
}
