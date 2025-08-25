import { onMounted, onUnmounted } from 'vue';
import type { Ref, ComputedRef, Reactive } from 'vue';
import type { TUseViewerUXReturn } from './useViewerUX.types';
import type { TViewerProps } from '../../Viewer';
import type { TViewerSwipeCore } from '../../core/swipe/viewer.swipe.core.types';

export default function useViewerUX(
  props: TViewerProps,
  active: Ref<boolean, boolean>,
  nextButtonDisabled: ComputedRef<boolean>,
  prevButtonDisabled: ComputedRef<boolean>,
  swipeCore: Reactive<TViewerSwipeCore>,
  close: () => void,
): TUseViewerUXReturn {
  function onClickNext() {
    if (nextButtonDisabled.value) {
      return;
    }

    swipeCore.next();
  }

  function onClickPrev() {
    if (prevButtonDisabled.value) {
      return;
    }

    swipeCore.prev();
  }

  function closeOnOverlayClick() {
    if (!props.noOverlayDismiss) {
      close();
    }
  }

  const onKeyPress = (event: KeyboardEvent) => {
    if (!active.value) {
      return;
    }

    if (event.code === 'ArrowLeft') {
      onClickPrev();
    }

    if (event.code === 'ArrowRight') {
      onClickNext();
    }

    if (event.code === 'Escape' && !props.noEscDismiss) {
      close();
    }
  };

  onMounted(() => {
    window.addEventListener('keydown', onKeyPress);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', onKeyPress);
  });

  return {
    onClickNext,
    onClickPrev,
    closeOnOverlayClick,
    onKeyPress,
  };
}
