import { onMounted, onUnmounted, reactive, watch } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import type { TUseViewerSwipeReturn } from './useViewerSwipe.types';
import type { TViewerGallery } from '../../types/Viewer.types';
import { ViewerSwipeCore } from '../../core/swipe/viewer.swipe.core';
import useElementSize from '@/lib/composables/elements/useElementSize/useElementSize';

export default function useViewerSwipe(
  container: Ref<HTMLElement | null>,
  swipeDisable: ComputedRef<boolean>,
  verge: number,
  loop: boolean,
  generalGallery: ComputedRef<TViewerGallery>,
): TUseViewerSwipeReturn {
  const swipeCore = reactive(
    new ViewerSwipeCore({
      verge,
      loop,
      galleryLength: generalGallery.value.length,
    }),
  );

  watch(
    () => generalGallery.value.length,
    (newGalleryLength) => {
      swipeCore.updateOptions({ galleryLength: newGalleryLength });
    },
  );

  useElementSize(container, 50, (sizes) => {
    swipeCore.updateContainerSizes({ width: sizes.width.value, height: sizes.height.value });
  });

  function onMouseDown(event: MouseEvent) {
    event.preventDefault();

    if (swipeDisable.value) {
      return;
    }

    swipeCore.swipeStart(event.clientX);
  }

  function onTouchStart(event: TouchEvent) {
    if (swipeDisable.value) {
      return;
    }

    if (event.touches.length !== 1) {
      return;
    }

    swipeCore.swipeStart(event.touches.item(0)?.clientX || 0);
  }

  function onMouseMove(event: MouseEvent) {
    if (swipeDisable.value) {
      return;
    }

    swipeCore.swipe(event.clientX);
  }

  function onTouchMove(event: TouchEvent) {
    if (swipeDisable.value) {
      return;
    }

    if (event.touches.length !== 1) {
      return;
    }

    swipeCore.swipe(event.touches.item(0)?.clientX || 0);
  }

  function onEnd() {
    swipeCore.swipeEnd();
  }

  onMounted(() => {
    if (!container.value) {
      return;
    }

    container.value.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onEnd);
    container.value.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onEnd);
  });

  onUnmounted(() => {
    if (!container.value) {
      return;
    }

    container.value.removeEventListener('mousedown', onMouseDown);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onEnd);
    container.value.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onEnd);
  });

  return {
    swipeDisable,
    swipeCore,
  };
}
