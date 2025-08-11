import type { Ref } from 'vue';
import type { TSliderTrack } from '@/lib/components/controls/Slider/types/Slider.types';

/**
 * @description
 * Return type for the `useVideoTimeline` composable function.
 * Contains reactive properties and methods for Video component functionality.
 */
export type TUseVideoTimelineReturn = {
  /**
   * Reactive reference to the number of seconds passed in the media.
   */
  timePassed: Ref<number, number>;

  /**
   * Reactive reference to the timeline values (e.g., for slider positions).
   */
  timeLineValues: Ref<number[], number[]>;

  /**
   * Reactive reference to the slider tracks representing timeline segments.
   */
  timeLineTracks: Ref<Array<TSliderTrack>>;

  /**
   * Reactive reference indicating if the media is currently loading.
   */
  loading: Ref<boolean, boolean>;

  /**
   * Clamps a number between a minimum and maximum value, ensuring the result is within the specified range.
   * @param {number} min - The minimum allowable value.
   * @param {number} middle - The value to be clamped.
   * @param {number} max - The maximum allowable value.
   * @returns {number} - The clamped value, guaranteed to be between min and max.
   */
  clamp: (min: number, middle: number, max: number) => number;

  /**
   * Seeks the media to a specific time in seconds.
   *
   * @param {number} toSeconds - The time in seconds to seek to.
   */
  seek: (toSeconds: number) => void;

  /**
   * Fast forwards the media playback.
   */
  fastForward: () => void;

  /**
   * Rewinds the media playback.
   */
  fastRewind: () => void;

  /**
   * Handler for updating the current time of the video.
   */
  onVideoTimeUpdate: () => void;

  /**
   * Handler for updating the loading progress of the video.
   */
  onVideoProgress: () => void;

  /**
   * Handler for when the video is waiting/buffering.
   */
  onVideoWaiting: () => void;

  /**
   * Handler for when the video can resume playback.
   */
  onVideoCanPlay: () => void;

  /**
   * Handler for when the timeline interaction starts.
   *
   * @param {Array<number> | number} value
   * @param params.track - The slider track being interacted with.
   * @param params.value - The value(s) of the timeline at the start of interaction.
   * @param params.index - The index of the timeline handle.
   */
  onChangeTimeLineStart: ({
    value,
  }: {
    track: TSliderTrack;
    value: Array<number> | number;
    index: number;
  }) => void;

  /**
   * Handler for when the timeline interaction ends.
   *
   * @param {Array<number> | number} value
   * @param params.track - The slider track being interacted with.
   * @param params.value - The value(s) of the timeline at the end of interaction.
   * @param params.index - The index of the timeline handle.
   */
  onChangeTimeLineEnd: ({
    value,
  }: {
    track: TSliderTrack;
    value: Array<number> | number;
    index: number;
  }) => void;
};
