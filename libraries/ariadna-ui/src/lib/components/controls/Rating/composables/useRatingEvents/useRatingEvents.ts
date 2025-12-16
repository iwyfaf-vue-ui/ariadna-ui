import type { TRatingEmits, TRatingProps } from '@/lib/components/controls/Rating/Rating';
import type { Ref, ShallowRef } from 'vue';
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import ratingMathCeilToMultiple from '../../core/rating-math/rating-math.core';

export default function useRatingEvents(
  props: TRatingProps,
  emits: TRatingEmits,
  ratingRef: Readonly<ShallowRef<HTMLDivElement | null>>,
  value: Ref<number | null, number | null>,
  hoverValue: Ref<number, number>,
): void {
  const _starCount = ref(props.starCount!);
  const _fillStep = ref(props.fillStep!);
  const widthWrapper = ref(0);

  const clickHandler = () => {
    if (props.disabled) return;
    value.value = hoverValue.value / 100;

    emits('update:model-value', value.value);
  };

  const mouseMoveHandler = (event: MouseEvent) => {
    if (props.disabled) return;

    const rating = ratingRef.value;

    if (!rating) return;

    const rect = rating.getBoundingClientRect();
    const maskWidth = Math.round(((event.clientX - rect.left) / widthWrapper.value) * 100);

    hoverValue.value = ratingMathCeilToMultiple(
      maskWidth,
      (100 / _starCount.value) * _fillStep.value,
    );
  };

  const mouseLeaveHandler = () => {
    if (props.disabled) return;

    hoverValue.value = 0;
  };

  const observeWidth = () => {
    if (props.disabled) return;

    const rating = ratingRef.value;
    if (!rating) return;

    const resizeObserver = new ResizeObserver(() => {
      widthWrapper.value = rating.getBoundingClientRect().width;
    });

    resizeObserver.observe(rating);
  };

  const addEventHandlers = () => {
    const rating = ratingRef.value;

    if (!rating) return;

    rating.addEventListener('click', clickHandler);
    rating.addEventListener('mousemove', mouseMoveHandler);
    rating.addEventListener('mouseleave', mouseLeaveHandler);
  };

  const removeEventHandlers = () => {
    const rating = ratingRef.value;

    if (!rating) return;

    rating.removeEventListener('click', clickHandler);
    rating.removeEventListener('mousemove', mouseMoveHandler);
    rating.removeEventListener('mouseleave', mouseLeaveHandler);
  };

  onMounted(() => {
    const rating = ratingRef.value;

    if (!rating) return;

    widthWrapper.value = rating.getBoundingClientRect().width;
    observeWidth();

    if (!props.readonly) {
      addEventHandlers();
    }
  });

  onBeforeUnmount(() => {
    removeEventHandlers();
  });

  watch(
    () => props.modelValue,
    (newRate) => {
      value.value = newRate;
      const maskWidth = props.readonly ? newRate! * 100 : Math.round(newRate! * 100);

      hoverValue.value = ratingMathCeilToMultiple(maskWidth, _fillStep.value);
    },
  );

  watch(
    () => props.readonly,
    (newValue) => {
      if (newValue) {
        removeEventHandlers();
      } else {
        addEventHandlers();
      }
    },
  );
}
