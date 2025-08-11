import { computed, ref, useId } from 'vue';
import type { Ref } from 'vue';
import type { ShallowRef } from 'vue';
import type { TSliderEmits, TSliderProps } from '../../Slider';
import type { TUseSliderReturn } from './useSlider.types';
import { EThumbPosition } from '../../types/Slider.enums';
import clamp from '@/lib/utilities/number/Clamp/Clamp';

export default function useSlider(
  props: TSliderProps,
  emits: TSliderEmits,
  sliderRef: Readonly<ShallowRef<HTMLDivElement | null>>,
  currentThumbIndex: Ref<number, number>,
): TUseSliderReturn {
  const min = ref<number>(props.min!);
  const max = ref<number>(props.max!);

  const id = useId();
  const focused = ref(false);
  const hovered = ref(false);

  const uniqueID = computed(() => props.id || id);

  const componentClasses = computed(() => {
    const base = props.cssClass;

    const theme = `${base}--theme`;
    const points = props.points ? `${base}--points` : undefined;
    const hover = hovered.value && !focused.value ? `${base}--hovered` : undefined;
    const disabled = props.disabled ? `${base}--disabled` : undefined;
    const valid = props.valid ? `${base}--valid` : undefined;
    const invalid = props.invalid ? `${base}--invalid` : undefined;
    const modifier = props.modifier ? `${base}--${props.modifier}` : undefined;

    return [base, theme, points, hover, disabled, valid, invalid, modifier]
      .filter(Boolean)
      .join(' ');
  });

  const commonPoints = computed(() => {
    if (props.points) {
      return props.points;
    }

    if (!props.step) {
      return [];
    }

    return Array.from(
      { length: Math.floor((max.value - min.value) / props.step) + 1 },
      (_, index) => index * (props.step || 0),
    );
  });

  function roundByStep(value: number) {
    return props.step ? Math.round(value / props.step) * props.step : value;
  }

  function getPercentageByValue(value: number): number {
    return ((value - min.value) / (max.value - min.value)) * 100;
  }

  function getAdditionalTrackClasses(key: string) {
    return {
      [`${props.cssClass}__track-additional`]: true,
      [`${props.cssClass}__track-additional-${key}`]: true,
    };
  }

  function getThumbClasses(key: string, isDrag: boolean, position: EThumbPosition) {
    return {
      [`${props.cssClass}__track-additional-thumb`]: true,
      [`${props.cssClass}__track-additional-thumb-${key}`]: true,
      [`${props.cssClass}__track-additional-thumb--drag`]: isDrag,
      [`${props.cssClass}__track-additional-thumb--left`]: position === EThumbPosition.LEFT,
      [`${props.cssClass}__track-additional-thumb--right`]: position === EThumbPosition.RIGHT,
    };
  }

  function calculateStylesForTrackByValue(value: Array<number> | number): string {
    if (Array.isArray(value)) {
      const firstValue = getPercentageByValue(value[0]);
      const secondValue = getPercentageByValue(value[1]);

      return `width: ${secondValue - firstValue}%; left: ${firstValue}%`;
    }

    return `width: ${getPercentageByValue(value)}%`;
  }

  function calculateNewTrackValue(
    value: Array<number> | number,
    clientX: number,
    position: EThumbPosition,
  ): number | [number, number] {
    if (!sliderRef.value) {
      return 0;
    }

    const startPosition = sliderRef.value.getBoundingClientRect().left;

    const currentPositionForThumb = Math.min(
      Math.max(0, clientX - startPosition),
      sliderRef.value.offsetWidth,
    );

    const percentage = currentPositionForThumb / sliderRef.value.offsetWidth;

    let newValue = roundByStep(min.value + (max.value - min.value) * percentage);

    if (props.points && props.points.length > 0) {
      newValue = findClosestPoint(newValue);
    }

    newValue = Math.max(min.value, Math.min(max.value, newValue));

    if (Array.isArray(value)) {
      const newValue2 = [
        position === EThumbPosition.LEFT ? newValue : value[0],
        position === EThumbPosition.RIGHT ? newValue : value[1],
      ];

      return [
        position === EThumbPosition.RIGHT
          ? newValue2[0]
          : clamp(min.value, newValue2[0], newValue2[1]),
        position === EThumbPosition.LEFT
          ? newValue2[1]
          : clamp(newValue2[0], newValue2[1], max.value),
      ];
    }

    return newValue;
  }

  function calculateFirstWithThumbIndex() {
    if (currentThumbIndex.value !== -1) {
      return;
    }

    const firstWithThumbIndex = props.tracks.findIndex((track) => track.thumb);

    if (firstWithThumbIndex === -1) {
      return;
    }

    currentThumbIndex.value = firstWithThumbIndex;
  }

  function getDirection(value: Array<number> | number, clientX: number): EThumbPosition {
    if (!sliderRef.value) {
      return EThumbPosition.RIGHT;
    }

    const clientValue =
      (clientX / sliderRef.value.offsetWidth) * (max.value - min.value) + min.value;

    if (!Array.isArray(value)) {
      return EThumbPosition.RIGHT;
    }

    const [leftThumbValue, rightThumbValue] = value;

    if (clientValue < (leftThumbValue + rightThumbValue) / 2) {
      return EThumbPosition.LEFT;
    }

    return EThumbPosition.RIGHT;
  }

  function findClosestPoint(value: number): number {
    if (!props.points || !props.points.length) {
      return value;
    }

    return props.points.reduce(
      (prev, curr) => (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev),
      0,
    );
  }

  function updateValue(value: [number, number] | number, index: number) {
    emits(
      'update:model-value',
      props.modelValue.map((item, arrIndex) => (arrIndex === index ? value : item)),
    );
  }

  function onMouseOver() {
    hovered.value = true;
  }

  function onMouseLeave() {
    hovered.value = false;
  }

  function onExpandEnter(el: Element) {
    const htmlElement = el as HTMLElement;

    htmlElement.style.height = el.scrollHeight + 'px';
  }

  function onExpandAfterEnter(el: Element) {
    const htmlElement = el as HTMLElement;

    htmlElement.style.height = 'auto';
  }

  function onExpandBeforeLeave(el: Element) {
    const htmlElement = el as HTMLElement;

    htmlElement.style.height = htmlElement.scrollHeight + 'px';
  }

  return {
    uniqueID,
    componentClasses,
    commonPoints,
    clamp,
    roundByStep,
    getPercentageByValue,
    getAdditionalTrackClasses,
    getThumbClasses,
    calculateStylesForTrackByValue,
    calculateNewTrackValue,
    calculateFirstWithThumbIndex,
    getDirection,
    findClosestPoint,
    updateValue,
    onMouseOver,
    onMouseLeave,
    onExpandEnter,
    onExpandAfterEnter,
    onExpandBeforeLeave,
  };
}
