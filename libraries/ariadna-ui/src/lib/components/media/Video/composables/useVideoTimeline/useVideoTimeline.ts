import { ref } from 'vue';
import type { ShallowRef } from 'vue';
import type { TVideoEmits, TVideoProps } from '../../Video';
import type { TUseVideoTimelineReturn } from './useVideoTimeline.types';
import type { TSliderTrack } from '@/lib/components/controls/Slider/types/Slider.types';
import clamp from '@/lib/utilities/number/Clamp/Clamp';

export default function useVideoTimeline(
  props: TVideoProps,
  emits: TVideoEmits,
  videoTagRef: Readonly<ShallowRef<HTMLVideoElement | null>>,
  playLocal: () => void,
  stopLocal: () => void,
): TUseVideoTimelineReturn {
  const fastForwardSeconds = ref<number>(props.fastForwardSeconds!);
  const fastRewindSeconds = ref<number>(props.fastRewindSeconds!);

  const timePassed = ref<number>(0);
  const timeLineValues = ref([0, 0, 0]); // playing, loading, hover
  const timeLineTracks = ref<Array<TSliderTrack>>([
    {
      key: 'playing',
      label: false,
      thumb: true,
      zIndex: 3,
    },
    {
      key: 'loading',
      label: false,
      thumb: false,
      zIndex: 2,
    },
    {
      key: 'hover',
      label: false,
      thumb: false,
      zIndex: 1,
    },
  ]);
  const loadingPercentage = ref<number>(0);
  const loading = ref<boolean>(false);

  function seek(toSeconds: number) {
    if (!videoTagRef.value) {
      return;
    }

    videoTagRef.value.currentTime = toSeconds;
  }

  function fastForward() {
    if (!videoTagRef.value || !props.controls) {
      return;
    }

    seek(
      clamp(
        0,
        videoTagRef.value.currentTime + fastForwardSeconds.value,
        videoTagRef.value.duration || 0,
      ),
    );
  }

  function fastRewind() {
    if (!videoTagRef.value || !props.controls) {
      return;
    }

    seek(
      clamp(
        0,
        videoTagRef.value.currentTime - fastRewindSeconds.value,
        videoTagRef.value.duration || 0,
      ),
    );
  }

  function onVideoTimeUpdate() {
    timePassed.value = videoTagRef.value?.currentTime || 0;

    if (!videoTagRef.value) {
      return;
    }

    timeLineValues.value[0] = (timePassed.value / videoTagRef.value.duration) * 100;

    emits('playing', {
      playedInSeconds: videoTagRef.value.currentTime,
      loadedInSeconds: (loadingPercentage.value / 100) * videoTagRef.value.duration,
      allTimeInSeconds: videoTagRef.value.duration,
    });
  }

  function onVideoProgress() {
    if (!videoTagRef.value) {
      return;
    }
    const bufferLength = videoTagRef.value.buffered.length;

    loadingPercentage.value =
      (videoTagRef.value.buffered.end(bufferLength - 1) / (videoTagRef.value.duration || 0)) * 100;
    timeLineValues.value[1] = loadingPercentage.value;
  }

  function onVideoWaiting() {
    loading.value = true;
  }

  function onVideoCanPlay() {
    loading.value = false;
  }

  function onChangeTimeLineStart({
    value,
  }: {
    track: TSliderTrack;
    value: Array<number> | number;
    index: number;
  }) {
    if (!videoTagRef.value) {
      return;
    }

    stopLocal();
    seek(((value as number) / 100) * (videoTagRef.value.duration || 0));
  }

  function onChangeTimeLineEnd({
    value,
  }: {
    track: TSliderTrack;
    value: Array<number> | number;
    index: number;
  }) {
    if (!videoTagRef.value) {
      return;
    }

    playLocal();
    seek(((value as number) / 100) * (videoTagRef.value.duration || 0));
  }

  return {
    timePassed,
    timeLineValues,
    timeLineTracks,
    loading,
    clamp,
    seek,
    fastForward,
    fastRewind,
    onVideoTimeUpdate,
    onVideoProgress,
    onVideoWaiting,
    onVideoCanPlay,
    onChangeTimeLineStart,
    onChangeTimeLineEnd,
  };
}
