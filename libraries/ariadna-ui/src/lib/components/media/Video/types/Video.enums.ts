/**
 * Video config.
 */
export enum EVideoConfig {
  NAME = 'Video',
}

/**
 * Video default props values.
 */
export enum EVideoPropsDefault {
  PRELOAD = 'auto',
  VOLUME = 0.5,
  TIME_TO_HIDE_CONTROLS_MS = 300,
  TIME_TO_HIDE_CONTROLS_ON_OUTSIDE_MS = 300,
  FAST_FORWARD_SECONDS = 10,
  FAST_REWIND_SECONDS = 10,
  CSS_CLASS = 'ar-video',
}

/**
 * Video errors.
 */
export enum EVideoErrors {
  PROP_VOLUME_ERROR = 'Volume must be between 0 and 1, got',
}
