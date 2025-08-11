import { ref, onMounted, onUnmounted } from 'vue';
import type { ShallowRef } from 'vue';
import type { TVideoEmits, TVideoProps } from '../../Video';
import type { TUseVideoFullscreenReturn } from './useVideoFullscreen.types';

export default function useVideoFullscreen(
  props: TVideoProps,
  emits: TVideoEmits,
  videoRef: Readonly<ShallowRef<HTMLDivElement | null>>,
): TUseVideoFullscreenReturn {
  const fullscreenState = ref(false);

  function fullscreenLocal() {
    if (!videoRef.value) {
      return;
    }

    videoRef.value.requestFullscreen();
  }

  function unFullscreenLocal() {
    return document.exitFullscreen();
  }

  function toggleFullscreen() {
    if (!props.controls) {
      return;
    }

    if (fullscreenState.value) {
      return unFullscreenLocal();
    }

    return fullscreenLocal();
  }

  function onFullscreenChange() {
    if (!videoRef.value) {
      return;
    }

    if (!document.fullscreenElement) {
      fullscreenState.value = false;
      emits('unFullscreen');
      return;
    }

    if (document.fullscreenElement.id !== videoRef.value.id) {
      return;
    }

    fullscreenState.value = true;
    emits('fullscreen');
  }

  onMounted(() => document.addEventListener('fullscreenchange', onFullscreenChange));
  onUnmounted(() => document.removeEventListener('fullscreenchange', onFullscreenChange));

  return {
    fullscreenState,
    fullscreenLocal,
    unFullscreenLocal,
    toggleFullscreen,
  };
}
