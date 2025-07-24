import type { Ref } from 'vue';
import type { TSliderEmits, TSliderProps } from '../../Slider';
import type { TUseThumbEventsReturn } from './useThumbEvents.types';
import { EThumbPosition } from '../../types/Slider.enums';
import type { TCurrentActivityType } from '../../types/Slider.types';

export default function useThumbEvents(
  props: TSliderProps,
  emits: TSliderEmits,
  currentThumbIndex: Ref<number, number>,
  currentActivity: Ref<TCurrentActivityType | null, TCurrentActivityType | null>,
  thumbsDrag: Ref<Map<string, boolean>>,
  touchActive: Ref<boolean, boolean>,
  lastTouchPosition: Ref<number, number>,
  calculateNewTrackValue: (
    value: Array<number> | number,
    clientX: number,
    position: EThumbPosition,
  ) => number | [number, number],
  updateValue: (value: [number, number] | number, index: number) => void,
): TUseThumbEventsReturn {
  function thumbPointerDown(clientX: number, index: number, position: EThumbPosition) {
    if (clientX <= 0) return;

    currentActivity.value = { thumb: true, thumbData: { direction: position, index } };

    currentThumbIndex.value = index;
    thumbsDrag.value.set(`${position}-${index}`, true);

    const updatedValue = calculateNewTrackValue(props.modelValue[index], clientX, position);

    updateValue(updatedValue, index);
    emits('changeStart', {
      track: props.tracks[index],
      value: updatedValue,
      index,
    });
  }

  function onThumbMouseDown(event: MouseEvent, index: number, position: EThumbPosition) {
    if (touchActive.value) {
      return;
    }

    thumbPointerDown(event.clientX, index, position);
  }

  function onThumbTouchStart(event: TouchEvent, index: number, position: EThumbPosition) {
    touchActive.value = true;

    if (event.touches.length !== 1) {
      return;
    }

    const [touch] = event.touches;
    lastTouchPosition.value = touch.clientX;
    thumbPointerDown(touch.clientX, index, position);
  }

  function onThumbPointerMove(clientX: number, index: number, position: EThumbPosition) {
    if (clientX <= 0) return;

    const updatedValue = calculateNewTrackValue(props.modelValue[index], clientX, position);

    updateValue(updatedValue, index);
    emits('change', {
      track: props.tracks[index],
      value: updatedValue,
      index,
    });
  }

  function onThumbPointerUp(clientX: number, index: number, position: EThumbPosition) {
    if (clientX <= 0) return;

    thumbsDrag.value.set(`${position}-${index}`, false);

    const updatedValue = calculateNewTrackValue(props.modelValue[index], clientX, position);

    updateValue(updatedValue, index);
    emits('changeEnd', {
      track: props.tracks[index],
      value: updatedValue,
      index,
    });
  }

  return {
    onThumbMouseDown,
    onThumbTouchStart,
    onThumbPointerMove,
    onThumbPointerUp,
  };
}
