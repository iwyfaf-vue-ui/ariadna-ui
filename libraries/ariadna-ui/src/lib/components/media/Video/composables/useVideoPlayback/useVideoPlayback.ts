import { ref } from 'vue';
import type { ShallowRef } from 'vue';
import type { TVideoEmits, TVideoProps } from '../../Video';
import type { TUseVideoPlaybackReturn } from './useVideoPlayback.types';

export default function useVideoPlayback(
  props: TVideoProps,
  emits: TVideoEmits,
  videoTagRef: Readonly<ShallowRef<HTMLVideoElement | null>>,
): TUseVideoPlaybackReturn {
  const playedState = ref(false);

  function playLocal() {
    if (!videoTagRef.value) {
      return;
    }

    if (!videoTagRef.value.play) {
      return;
    }

    videoTagRef.value.play();
  }

  function stopLocal() {
    if (!videoTagRef.value) {
      return;
    }

    if (!videoTagRef.value.pause) {
      return;
    }

    videoTagRef.value.pause();
  }

  function togglePlay() {
    if (!props.controls) {
      return;
    }

    if (playedState.value) {
      return stopLocal();
    }

    playLocal();
  }

  function onVideoPlay() {
    playedState.value = true;
    emits('play');
  }

  function onVideoPause() {
    playedState.value = false;
    emits('stop');
  }

  return {
    playedState,
    playLocal,
    stopLocal,
    togglePlay,
    onVideoPlay,
    onVideoPause,
  };
}
