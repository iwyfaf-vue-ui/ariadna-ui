import type { Ref } from 'vue';
import type { TSliderEmits, TSliderProps } from '../../Slider';
import type { TUseSliderEventsReturn } from './useSliderEvents.types';
import { EThumbPosition } from '../../types/Slider.enums';
import type { TCurrentActivityType } from '../../types/Slider.types';

export default function useSliderEvents(
  props: TSliderProps,
  emits: TSliderEmits,
  currentThumbIndex: Ref<number, number>,
  currentActivity: Ref<TCurrentActivityType | null, TCurrentActivityType | null>,
  touchActive: Ref<boolean, boolean>,
  lastTouchPosition: Ref<number, number>,
  getDirection: (value: Array<number> | number, clientX: number) => EThumbPosition,
  calculateFirstWithThumbIndex: () => void,
  calculateNewTrackValue: (
    value: Array<number> | number,
    clientX: number,
    position: EThumbPosition,
  ) => number | [number, number],
  updateValue: (value: [number, number] | number, index: number) => void,
): TUseSliderEventsReturn {
  function onSliderPointerDown(clientX: number) {
    if (clientX <= 0) {
      return;
    }

    calculateFirstWithThumbIndex();

    currentActivity.value = { thumb: false, thumbData: null };

    const updatedValue = calculateNewTrackValue(
      props.modelValue[currentThumbIndex.value],
      clientX,
      getDirection(props.modelValue[currentThumbIndex.value], clientX),
    );

    updateValue(updatedValue, currentThumbIndex.value);

    emits('changeStart', {
      track: props.tracks[currentThumbIndex.value],
      value: updatedValue,
      index: currentThumbIndex.value,
    });
  }

  function onSliderMouseDown(event: MouseEvent) {
    if (touchActive.value) {
      return;
    }

    onSliderPointerDown(event.clientX);
  }

  function onSliderTouchStart(event: TouchEvent) {
    touchActive.value = true;

    if (event.touches.length !== 1) {
      return;
    }

    const [touch] = event.touches;
    lastTouchPosition.value = touch.clientX;
    onSliderPointerDown(touch.clientX);
  }

  function onSliderPointerMove(clientX: number) {
    if (clientX <= 0) {
      return;
    }

    calculateFirstWithThumbIndex();

    const updatedValue = calculateNewTrackValue(
      props.modelValue[currentThumbIndex.value],
      clientX,
      getDirection(props.modelValue[currentThumbIndex.value], clientX),
    );

    updateValue(updatedValue, currentThumbIndex.value);

    emits('change', {
      track: props.tracks[currentThumbIndex.value],
      value: updatedValue,
      index: currentThumbIndex.value,
    });
  }

  function onSliderPointerUp(clientX: number) {
    if (clientX <= 0) return;
    calculateFirstWithThumbIndex();

    const updatedValue = calculateNewTrackValue(
      props.modelValue[currentThumbIndex.value],
      clientX,
      getDirection(props.modelValue[currentThumbIndex.value], clientX),
    );

    updateValue(updatedValue, currentThumbIndex.value);

    emits('changeEnd', {
      track: props.tracks[currentThumbIndex.value],
      value: updatedValue,
      index: currentThumbIndex.value,
    });
  }

  return {
    onSliderPointerDown,
    onSliderMouseDown,
    onSliderTouchStart,
    onSliderPointerMove,
    onSliderPointerUp,
  };
}
