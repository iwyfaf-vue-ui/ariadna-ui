import { computed } from 'vue';
import type { Ref, ComputedRef, Reactive } from 'vue';
import type { TUseViewerClassesReturn } from './useViewerClasses.types';
import type { TViewerProps } from '../../Viewer';
import type { TViewerSwipeCore } from '../../core/swipe/viewer.swipe.core.types';
import type { TViewerZoomCore } from '../../core/zoom/viewer.zoom.core.types';

export default function useViewerClasses(
  props: TViewerProps,
  sliderIsResize: Ref<boolean, boolean>,
  sliderIsCalculating: Ref<boolean, boolean>,
  nextButtonDisabled: ComputedRef<boolean>,
  prevButtonDisabled: ComputedRef<boolean>,
  swipeCore: Reactive<TViewerSwipeCore>,
  zoomCore: Reactive<TViewerZoomCore>,
): TUseViewerClassesReturn {
  const sliderClasses = computed(() => ({
    [`${props.cssClass}__slider`]: true,
    [`${props.cssClass}__slider--no-transition`]: swipeCore.isDragging || sliderIsResize.value,
    [`${props.cssClass}__slider--is-calculating`]: sliderIsCalculating.value,
  }));

  const nextButtonClasses = computed(() => ({
    [`${props.cssClass}__controls-next`]: true,
    [`${props.cssClass}__controls-next--disabled`]: nextButtonDisabled.value,
  }));

  const prevButtonClasses = computed(() => ({
    [`${props.cssClass}__controls-prev`]: true,
    [`${props.cssClass}__controls-prev--disabled`]: prevButtonDisabled.value,
  }));

  const contentClasses = computed(() => ({
    [`${props.cssClass}__content`]: true,
    [`${props.cssClass}__content--zoom`]: zoomCore.isScaled,
  }));

  return {
    sliderClasses,
    nextButtonClasses,
    prevButtonClasses,
    contentClasses,
  };
}
