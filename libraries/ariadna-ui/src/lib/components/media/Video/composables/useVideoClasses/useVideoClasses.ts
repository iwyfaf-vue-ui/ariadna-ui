import { computed } from 'vue';
import type { Ref } from 'vue';
import type { TUseVideoClassesReturn } from './useVideoClasses.types';
import type { TVideoProps } from '../../Video';

export default function useVideoClasses(
  props: TVideoProps,
  focusedAction: Ref<boolean, boolean>,
  focusedVolume: Ref<boolean, boolean>,
  focusedFullscreen: Ref<boolean, boolean>,
  focusedTimeLine: Ref<boolean, boolean>,
  timeLinePopupVisible: Ref<boolean, boolean>,
): TUseVideoClassesReturn {
  const actionClasses = computed(() => ({
    [`${props.cssClass}__controls-action`]: true,
    [`${props.cssClass}__controls-action--focused`]: focusedAction.value,
  }));

  const volumeClasses = computed(() => ({
    [`${props.cssClass}__controls-volume`]: true,
    [`${props.cssClass}__controls-volume--focused`]: focusedVolume.value,
  }));

  const fullscreenClasses = computed(() => ({
    [`${props.cssClass}__controls-fullscreen`]: true,
    [`${props.cssClass}__controls-fullscreen--focused`]: focusedFullscreen.value,
  }));

  const timeLineClasses = computed(() => ({
    [`${props.cssClass}__timeline`]: true,
    [`${props.cssClass}__timeline--focused`]: focusedTimeLine.value,
  }));

  const timeLinePopupClasses = computed(() => ({
    [`${props.cssClass}__timeline-time-popup`]: true,
    [`${props.cssClass}__timeline-time-popup--visible`]: timeLinePopupVisible.value,
  }));

  return {
    actionClasses,
    volumeClasses,
    fullscreenClasses,
    timeLineClasses,
    timeLinePopupClasses,
  };
}
