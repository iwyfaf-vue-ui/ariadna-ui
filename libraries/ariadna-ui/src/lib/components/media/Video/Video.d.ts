import type { ClassComponent, GlobalComponentConstructor } from '../../../../types/component';
import type { VNode } from 'vue';
import { EVideoPropsDefault } from './types/Video.enums';
import type { TVideoPlayingPayloadEmit } from './types/Video.types';

/**
 * Component props definition.
 */
export type TVideoProps = {
  /**
   * Source of video.
   *
   * @type string
   * @required
   * @example src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
   */
  src: string;

  /**
   * Video preload native attribute.
   *
   * @type Exclude<HTMLVideoElement['preload'], ''>
   * @default {@link EVideoPropsDefault.PRELOAD}
   * @example preload="metadata"
   */
  preload?: Exclude<HTMLVideoElement['preload'], ''>;

  /**
   * Video controls visible state.
   *
   * @type boolean
   * @default true
   * @example controls
   */
  controls?: boolean;

  /**
   * Controls are never hidden.
   *
   * @type boolean
   * @default false
   * @example show-controls-always
   */
  showControlsAlways?: boolean;

  /**
   * The time during which controls will be hidden when the user is not actively moving.
   *
   * @type number
   * @default {@link EVideoPropsDefault.TIME_TO_HIDE_CONTROLS_MS}
   * @example :time-to-hide-controls-ms="1000"
   */
  timeToHideControlsMs?: number;

  /**
   * The time after which the controls will be hidden if the mouse is outside the Video.
   *
   * @type number
   * @default {@link EVideoPropsDefault.TIME_TO_HIDE_CONTROLS_ON_OUTSIDE_MS}
   * @example :time-to-hide-controls-on-outside-ms="100"
   */
  timeToHideControlsOnOutsideMs?: number;

  /**
   * Mutes the sound in the Video, and also removes the volume icon.
   *
   * @type boolean
   * @default false
   * @example muted
   */
  muted?: boolean;

  /**
   * Enables auto-playback, works only with active props muted.
   *
   * @type boolean
   * @default false
   * @example autoplay
   */
  autoplay?: boolean;

  /**
   * Enables video looping.
   *
   * @type boolean
   * @default false
   * @example loop
   */
  loop?: boolean;

  /**
   * Video volume value ranges from 0 to 1.
   *
   * @type number
   * @default {@link EVideoPropsDefault.VOLUME}
   * @example :volume="0.5"
   */
  volume?: number;

  /**
   * Number of seconds to fast-forward.
   *
   * @type number
   * @default {@link EVideoPropsDefault.FAST_FORWARD_SECONDS}
   * @example :fast-forward-seconds="10"
   */
  fastForwardSeconds?: number;

  /**
   * Number of seconds to fast-rewind.
   *
   * @type number
   * @default {@link EVideoPropsDefault.FAST_REWIND_SECONDS}
   * @example :fast-rewind-seconds="10"
   */
  fastRewindSeconds?: number;

  /**
   * The height of the Video. Ignored when fullscreen is active.
   *
   * @type number
   * @default undefined
   * @example :fast-rewind-seconds="10"
   */
  height?: number;

  /**
   * The width of the Video. Ignored when fullscreen is active.
   *
   * @type number
   * @default undefined
   * @example :fast-rewind-seconds="10"
   */
  width?: number;

  /**
   * The poster for the video. If you do not specify it, a random frame from the video will be taken.
   *
   * @type string
   * @default undefined
   * @example poster="/poster.jpg"
   */
  poster?: string;

  /**
   * Redefines the CSS class of the root element and its descendants.
   *
   * @type string
   * @default {@link EVideoPropsDefault.CSS_CLASS}
   * @example css-class="example"
   */
  cssClass?: string;
};

/**
 * Component slots definition.
 */
export type TVideoSlots = {
  /**
   * Custom content, displayed if the video tag is not supported.
   *
   * @returns {VNode[]}
   */
  default?(): VNode[];

  /**
   * Custom play icon.
   *
   * @returns {VNode[]}
   */
  playIcon?(): VNode[];

  /**
   * Custom stop icon.
   *
   * @returns {VNode[]}
   */
  stopIcon?(): VNode[];

  /**
   * Custom volume icon.
   *
   * @param {Array<string>} props.volume - Value of the volume.
   * @returns {VNode[]}
   */
  volumeIcon?(props: { volume: number }): VNode[];

  /**
   * Custom fullscreen icon.
   *
   * @returns {VNode[]}
   */
  fullscreenIcon?(): VNode[];

  /**
   * Custom unFullscreen icon.
   *
   * @returns {VNode[]}
   */
  unFullscreenIcon?(): VNode[];

  /**
   * Custom loading icon.
   *
   * @returns {VNode[]}
   */
  loadingIcon?(): VNode[];

  /**
   * Custom time text.
   *
   * @param {number} props.timePassedInSeconds - The amount of time that has passed, in seconds.
   * @param {number} props.durationInSeconds - The total duration time, in seconds.
   * @param {(time: number) => string} props.parseTime - A function to convert a numeric time value into a formatted string.
   * @returns {VNode[]}
   */
  time?(props: {
    timePassedInSeconds: number;
    durationInSeconds: number;
    parseTime: (time: number) => string;
  }): VNode[];
};

/**
 * Component events emitted.
 */
export type TVideoEmits = {
  /**
   * Emitted when the fullscreen mode is activated.
   *
   * @param {"fullscreen"} e - The event name: 'fullscreen'.
   */
  (e: 'fullscreen'): void;

  /**
   * Emitted when exiting fullscreen mode.
   *
   * @param {"unFullscreen"} e - The event name: 'unFullscreen'.
   */
  (e: 'unFullscreen'): void;

  /**
   * Emitted when the video starts playing.
   *
   * @param {"play"} e - The event name: 'play'.
   */
  (e: 'play'): void;

  /**
   * Emitted when the video is played.
   *
   * @param {"playing"} e - The event name: 'playing'.
   * @param {TVideoPlayingPayloadEmit} payload - The payload of the event.
   */
  (e: 'playing', payload: TVideoPlayingPayloadEmit): void;

  /**
   * Emitted when the video playback stops.
   *
   * @param {"play"} e - The event name: 'stop'.
   */
  (e: 'stop'): void;

  /**
   * Emitted when the video is muted.
   *
   * @param {"muted"} e - The event name: 'muted'.
   */
  (e: 'muted'): void;
};

/**
 * Component exposes.
 */
export type TVideoExposes = {
  /**
   * Function to starts playing the video.
   */
  play(): void;

  /**
   * Function to stop playing the video.
   */
  stop(): void;

  /**
   * Function to starts or stops playing the video.
   */
  togglePlay(): void;

  /**
   * Function that allows you to get the status of whether the Video is playing a video or not.
   */
  getPlayedState(): boolean;

  /**
   * Function to activates fullscreen mode.
   */
  fullscreen(): void;

  /**
   * Function to turns off fullscreen mode.
   */
  unFullscreen(): void;

  /**
   * Function to toggle fullscreen mode.
   */
  toggleFullscreen(): void;

  /**
   * Function that allows you to get the fullscreen state.
   */
  getFullscreenState(): boolean;

  /**
   * Function that allows you to rewind the video to the desired time period.
   * @param {number} toSeconds - The time in seconds to rewind the video to.
   */
  seek(toSeconds: number): void;
};

/**
 * Ariadna UI | Components | Video
 *
 * Video component is a custom implementation of the `<video>` tag.
 */
declare class Video
  extends ClassComponent<TVideoProps, TVideoSlots, TVideoEmits, HTMLDivElement>
  implements TVideoExposes
{
  play(): void;
  stop(): void;
  togglePlay(): void;
  getPlayedState(): boolean;
  fullscreen(): void;
  unFullscreen(): void;
  toggleFullscreen(): void;
  getFullscreenState(): boolean;
  seek(toSeconds: number): void;
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Video: GlobalComponentConstructor<Video>;
  }
}

export default Video;
