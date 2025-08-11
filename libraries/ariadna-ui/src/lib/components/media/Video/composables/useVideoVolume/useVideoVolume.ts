import { ref, watch } from 'vue';
import type { ShallowRef } from 'vue';
import type { TVideoEmits, TVideoProps } from '../../Video';
import type { TUseVideoVolumeReturn } from './useVideoVolume.types';
import { EVideoConfig, EVideoErrors } from '../../types/Video.enums';
import type { TSliderTrack } from '@/lib/components/controls/Slider/types/Slider.types';
import { ELibraryConfig } from '@/types/internal';

export default function useVideoVolume(
  props: TVideoProps,
  emits: TVideoEmits,
  videoTagRef: Readonly<ShallowRef<HTMLVideoElement | null>>,
): TUseVideoVolumeReturn {
  const volume = ref<number>(props.volume!);

  const volumeState = ref(props.muted ? [0] : [volume.value]);
  const volumeTracks = ref<Array<TSliderTrack>>([
    {
      key: 'volume',
      label: false,
      thumb: true,
      zIndex: 1,
    },
  ]);

  function onToggleVolume() {
    if (!videoTagRef.value) {
      return;
    }

    volumeState.value[0] = videoTagRef.value.volume;
  }

  function onClickVolume() {
    if (!videoTagRef.value || props.muted) {
      return;
    }

    if (volumeState.value[0] >= 1) {
      videoTagRef.value.volume = 0;
      emits('muted');
      return;
    }

    if (volumeState.value[0] <= 0) {
      videoTagRef.value.volume = 1;
      return;
    }

    videoTagRef.value.volume = 0;
    emits('muted');
  }

  function onChangeVolume({
    value,
  }: {
    track: TSliderTrack;
    value: Array<number> | number;
    index: number;
  }) {
    if (videoTagRef.value) {
      videoTagRef.value.volume = Number(value);
    }
  }

  watch(
    () => props.volume,
    (newVolume) => {
      if (!newVolume) {
        return;
      }

      if (newVolume < 0 || newVolume > 1) {
        console.warn(
          `${ELibraryConfig.NAME}(${EVideoConfig.NAME}): ${EVideoErrors.PROP_VOLUME_ERROR} ${newVolume}`,
        );
      }
    },
    { immediate: true },
  );

  return {
    volumeState,
    volumeTracks,
    onToggleVolume,
    onClickVolume,
    onChangeVolume,
  };
}
