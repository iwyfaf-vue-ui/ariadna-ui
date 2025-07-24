import type { Ref } from 'vue';
import type { TUseSliderEventsReturn } from './useWindowEvents.types';
import { EThumbPosition } from '../../types/Slider.enums';
import type { TCurrentActivityType } from '../../types/Slider.types';

export default function useWindowEvents(
  currentActivity: Ref<TCurrentActivityType | null, TCurrentActivityType | null>,
  touchActive: Ref<boolean, boolean>,
  lastTouchPosition: Ref<number, number>,
  onSliderPointerMove: (clientX: number) => void,
  onThumbPointerMove: (clientX: number, index: number, position: EThumbPosition) => void,
  onSliderPointerUp: (clientX: number) => void,
  onThumbPointerUp: (clientX: number, index: number, position: EThumbPosition) => void,
): TUseSliderEventsReturn {
  function pointerMove(clientX: number) {
    if (!currentActivity.value) {
      return;
    }

    if (!currentActivity.value?.thumb) {
      return onSliderPointerMove(clientX);
    }

    if (!currentActivity.value.thumbData) {
      return;
    }

    onThumbPointerMove(
      clientX,
      currentActivity.value.thumbData.index,
      currentActivity.value.thumbData.direction,
    );
  }

  function onWindowMouseMove(event: MouseEvent) {
    if (touchActive.value) {
      return;
    }

    pointerMove(event.clientX);
  }

  function onWindowTouchMove(event: TouchEvent) {
    touchActive.value = true;

    if (event.touches.length !== 1) {
      return;
    }

    const [touch] = event.touches;

    lastTouchPosition.value = touch.clientX;
    pointerMove(touch.clientX);
  }

  function pointerUp(clientX: number) {
    if (!currentActivity.value) {
      currentActivity.value = null;
      return;
    }

    if (!currentActivity.value.thumb) {
      currentActivity.value = null;
      return onSliderPointerUp(clientX);
    }

    if (!currentActivity.value.thumbData) {
      currentActivity.value = null;
      return;
    }

    onThumbPointerUp(
      clientX,
      currentActivity.value.thumbData.index,
      currentActivity.value.thumbData.direction,
    );

    currentActivity.value = null;
  }

  function onWindowMouseUp(event: MouseEvent) {
    if (touchActive.value) {
      return;
    }

    pointerUp(event.clientX);
  }

  function onWindowTouchEnd(event: TouchEvent) {
    touchActive.value = true;
    if (event.touches.length !== 1 && !lastTouchPosition.value) {
      return;
    }

    const [touch] = event.touches;
    if (!touch) {
      return pointerUp(lastTouchPosition.value);
    }

    pointerUp(touch.clientX);
  }

  return {
    onWindowMouseMove,
    onWindowTouchMove,
    onWindowMouseUp,
    onWindowTouchEnd,
  };
}
