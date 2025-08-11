import type { Ref } from 'vue';
import type { TSliderTrack } from '@/lib/components/controls/Slider/types/Slider.types';

/**
 * @description
 * Return type for the `useVideoVolume` composable function.
 * Contains reactive properties and methods for Video component functionality.
 */
export type TUseVideoVolumeReturn = {
  /**
   * Reactive reference representing the current volume level of the media.
   */
  volumeState: Ref<Array<number>, Array<number>>;

  /**
   * Reactive reference to the slider tracks representing volume segments.
   */
  volumeTracks: Ref<Array<TSliderTrack>>;

  /**
   * Handler to be called when the video volume toggled.
   */
  onToggleVolume: () => void;

  /**
   * Handler to be called when the volume control is clicked.
   */
  onClickVolume: () => void;

  /**
   * Handler to be called when the video volume changes.
   * @param {Array<number> | number} value
   * @param params.track - The slider track being interacted with.
   * @param params.value - The value(s) of the timeline at the end of interaction.
   * @param params.index - The index of the timeline handle.
   */
  onChangeVolume: ({
    value,
  }: {
    track: TSliderTrack;
    value: number[] | number;
    index: number;
  }) => void;
};
