import type { Ref } from 'vue';

/**
 * @description
 * Return type for the `useVideoPlayback` composable function.
 * Contains reactive properties and methods for Video component functionality.
 */
export type TUseVideoPlaybackReturn = {
  /**
   * Reactive reference indicating whether the media is currently playing.
   */
  playedState: Ref<boolean, boolean>;

  /**
   * Function to start media playback.
   */
  playLocal: () => void;

  /**
   * Function to stop media playback.
   */
  stopLocal: () => void;

  /**
   * Function to toggle between play and pause states.
   */
  togglePlay: () => void;

  /**
   * Handler to be called when the video starts playing.
   */
  onVideoPlay: () => void;

  /**
   * Handler to be called when the video is paused.
   */
  onVideoPause: () => void;
};
