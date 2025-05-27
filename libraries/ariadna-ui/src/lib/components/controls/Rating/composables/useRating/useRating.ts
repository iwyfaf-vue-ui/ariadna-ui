import type { CSSProperties, Ref } from 'vue';
import { computed, ref, useId } from 'vue';
import type { TRatingEmits, TRatingProps } from '../../Rating';
import type { TUseRatingReturn } from './useRating.types';
import ratingMathCeilToMultiple from '../../core/rating-math/rating-math.core';

export default function useRating(
  props: TRatingProps,
  emits: TRatingEmits,
  value: Ref<number, number>,
  hoverValue: Ref<number, number>,
): TUseRatingReturn {
  const id = useId();
  const focused = ref(false);
  const hovered = ref(false);

  const _starCount = ref(props.starCount!);
  const _fillStep = ref(props.fillStep!);

  const uniqueID = computed(() => props.id || id);

  function onFocus(event: Event) {
    focused.value = true;

    emits('focus', event);
  }

  function onBlur() {
    focused.value = false;
  }

  function onMouseOver() {
    hovered.value = true;
  }

  function onMouseLeave() {
    hovered.value = false;
  }

  function onReset() {
    value.value = 0;

    emits('update:model-value', value.value);
  }

  const componentClasses = computed(() => {
    const base = props.cssClass;

    const theme = `${base}--theme`;
    const size = props.size ? `${base}--${props.size}` : undefined;
    const focus = focused.value ? `${base}--focused` : undefined;
    const hover = hovered.value && !focused.value ? `${base}--hovered` : undefined;
    const readonly = props.readonly ? `${base}--readonly` : undefined;
    const disable = props.disabled ? `${base}--disabled` : undefined;
    const valid = props.valid ? `${base}--valid` : undefined;
    const invalid = props.invalid ? `${base}--invalid` : undefined;
    const modifier = props.modifier ? `${base}--${props.modifier}` : undefined;

    return [base, theme, size, focus, hover, readonly, valid, invalid, disable, modifier]
      .filter(Boolean)
      .join(' ');
  });

  const ratingStyles = computed(() => {
    const flexDirectionValues = {
      top: 'column-reverse',
      left: 'row-reverse',
      right: 'row',
      bottom: 'column',
    };

    return {
      'flex-direction':
        flexDirectionValues[props.valuePosition as keyof typeof flexDirectionValues],
    } as CSSProperties;
  });

  const readableRating = computed(() => {
    return (Math.round(Number(props.modelValue) * _starCount.value * 100) / 100).toString();
  });

  const ratingStarMaskStyles = computed(() => {
    if (props.disabled)
      return {
        width: '0',
      };

    let total: number;

    if (props.singleMode && props.readonly) {
      total = 100;
    } else {
      const width = ratingMathCeilToMultiple(Math.round(value.value * 100), _fillStep.value);
      total = hoverValue.value || width;
    }

    return {
      width: `${total}%`,
    };
  });

  const starsCount = computed(() => (props.singleMode && props.readonly ? 1 : props.starCount));

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
    ratingStyles,
    readableRating,
    ratingStarMaskStyles,
    starsCount,
    onFocus,
    onBlur,
    onMouseOver,
    onMouseLeave,
    onReset,
    onExpandEnter,
    onExpandAfterEnter,
    onExpandBeforeLeave,
  };
}
