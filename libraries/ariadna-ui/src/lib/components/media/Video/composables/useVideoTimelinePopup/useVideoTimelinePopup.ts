import { ref } from 'vue';
import type { Ref, ShallowRef } from 'vue';
import type { TUseVideoTimelinePopupReturn } from './useVideoTimelinePopup.types';

export default function useVideoTimelinePopup(
  timeLineValues: Ref<number[], number[]>,
  clamp: (min: number, middle: number, max: number) => number,
  timeLineRef: Readonly<ShallowRef<HTMLDivElement | null>>,
  timeLinePopupRef: Readonly<ShallowRef<HTMLSpanElement | null>>,
  videoTagRef: Readonly<ShallowRef<HTMLVideoElement | null>>,
): TUseVideoTimelinePopupReturn {
  const timeLinePopupVisible = ref<boolean>(false);
  const timeLinePopupLeft = ref<number>(0);
  const timeLinePopupTime = ref<number>(0);

  function onTimeLineMouseEnter() {
    timeLinePopupVisible.value = true;
  }

  function onTimeLineMouseLeave() {
    timeLinePopupVisible.value = false;
  }

  function onTimeLineMouseMove(event: MouseEvent) {
    if (!timeLinePopupRef.value || !timeLineRef.value || !videoTagRef.value) {
      return;
    }

    const startPosition = timeLineRef.value.getBoundingClientRect().left;
    const endPosition = timeLineRef.value.offsetWidth - timeLinePopupRef.value.offsetWidth;

    timeLinePopupLeft.value = clamp(
      0,
      event.clientX - startPosition - timeLinePopupRef.value.offsetWidth / 2,
      endPosition,
    );

    const currentPositionForTimeLine = clamp(
      0,
      event.clientX - startPosition,
      timeLineRef.value.offsetWidth,
    );

    timeLinePopupTime.value =
      (currentPositionForTimeLine / timeLineRef.value.offsetWidth) *
      (videoTagRef.value.duration || 0);
    timeLineValues.value[2] = (timeLinePopupTime.value / videoTagRef.value.duration) * 100;
  }

  return {
    timeLinePopupLeft,
    timeLinePopupTime,
    timeLinePopupVisible,
    onTimeLineMouseEnter,
    onTimeLineMouseLeave,
    onTimeLineMouseMove,
  };
}
