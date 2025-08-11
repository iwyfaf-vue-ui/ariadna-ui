/**
 * Playing event payload.
 */
export type TVideoPlayingPayloadEmit = {
  /**
   * The amount of time that has passed, in seconds.
   */
  playedInSeconds: number;

  /**
   * Loaded / buffered in seconds.
   */
  loadedInSeconds: number;

  /**
   * Video length in seconds
   */
  allTimeInSeconds: number;
};
