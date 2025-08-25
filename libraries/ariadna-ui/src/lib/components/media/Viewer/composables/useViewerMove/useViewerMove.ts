import { onMounted, onUnmounted, reactive, computed } from 'vue';
import type { Ref, ComputedRef, Reactive } from 'vue';
import type { TUseViewerMoveReturn } from './useViewerMove.types';
import { ViewerMoveCore } from '../../core/move/viewer.move.core';
import type { TViewerSwipeCore } from '../../core/swipe/viewer.swipe.core.types';
import useElementSize from '@/lib/composables/elements/useElementSize/useElementSize';

export default function useViewerMove(
  container: Ref<HTMLDivElement | null>,
  moveDisabled: ComputedRef<boolean>,
  sliderItems: Ref<HTMLElement[], HTMLElement[]>,
  swipeCore: Reactive<TViewerSwipeCore>,
  slowFactor: number,
): TUseViewerMoveReturn {
  const moveCore = reactive(new ViewerMoveCore({ slowFactor }));
  const moveItem = computed(() => sliderItems.value[swipeCore.index]);

  useElementSize(container, 50, (values) => {
    moveCore.updateContainerSize({ width: values.width.value, height: values.height.value });
  });

  useElementSize(moveItem, 50, (values) => {
    moveCore.updateMoveItemSize({ width: values.width.value, height: values.height.value });
  });

  function onMouseDown(event: MouseEvent) {
    event.preventDefault();

    if (moveDisabled.value) {
      return;
    }

    moveCore.start(event.clientX, event.clientY);
  }

  function onTouchStart(event: TouchEvent) {
    if (moveDisabled.value) {
      return;
    }

    if (event.touches.length !== 1) {
      return;
    }

    moveCore.start(event.touches[0].clientX, event.touches[0].clientY);
  }

  function onMouseMove(event: MouseEvent) {
    moveCore.move(event.clientX, event.clientY);
  }

  function onTouchMove(event: TouchEvent) {
    if (event.touches.length !== 1) {
      return;
    }

    moveCore.move(event.touches[0].clientX, event.touches[0].clientY);
  }

  function onEnd() {
    moveCore.end();
  }

  onMounted(() => {
    if (!container.value) {
      return;
    }

    container.value.addEventListener('mousedown', onMouseDown);
    container.value.addEventListener('touchstart', onTouchStart);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchend', onEnd);
  });

  onUnmounted(() => {
    if (!container.value) {
      return;
    }

    container.value.removeEventListener('mousedown', onMouseDown);
    container.value.removeEventListener('touchstart', onTouchStart);

    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('mouseup', onEnd);
    window.removeEventListener('touchend', onEnd);
  });

  return {
    moveCore,
  };
}
