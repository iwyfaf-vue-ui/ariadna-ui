/**
 * Interface for managing and controlling multiple HTML iframe video elements. Provides methods to register iframes,
 * play or stop individual or all videos, and clear the registry.
 */
export interface IIframeVideoHelper {
  /**
   * Registers an HTMLIFrameElement to be managed by the helper.
   *
   * @param {HTMLIFrameElement} iframe - The HTMLIFrameElement to register.
   */
  registerIframe(iframe: HTMLIFrameElement): void;

  /**
   * Plays the video in the specified iframe.
   *
   * @param {HTMLIFrameElement} iframe - The HTMLIFrameElement whose video should be played.
   */
  play(iframe: HTMLIFrameElement): void;

  /**
   * Stops the video in the specified iframe.
   * @param {HTMLIFrameElement} iframe - The HTMLIFrameElement whose video should be stopped.
   */
  stop(iframe: HTMLIFrameElement): void;

  /**
   * Plays videos in all registered iframes.
   */
  playAll(): void;

  /**
   * Stops videos in all registered iframes.
   */
  stopAll(): void;

  /**
   * Clears all registered iframes from the helper.
   */
  clear(): void;
}

export enum EIframeVideoHelperHosts {
  YOUTUBE = 'YOUTUBE',
  RUTUBE = 'RUTUBE',
}
