import type { EThumbPosition } from './Slider.enums';

export type TSliderTrack = {
  /**
   * A unique track key.
   */
  key: string;

  /**
   * Enables / disables thumb element.
   */
  thumb: boolean;

  /**
   * Enables / disables the label for thumb element.
   */
  label: boolean;

  /**
   * The postfix for label.
   */
  labelPostfix?: string;

  /**
   * The prefix for label.
   */
  labelPrefix?: string;

  /**
   * The zIndex of the track.
   */
  zIndex: number;
};

/**
 * Represents data related to a slider thumb.
 */
export type TThumbData = {
  /**
   * The position direction of the thumb.
   */
  direction: EThumbPosition;

  /**
   * The index of the thumb in the slider.
   */
  index: number;
};

/**
 * Represents the current activity state of a slider thumb.
 */
export type TCurrentActivityType = {
  /**
   * Indicates whether the thumb is currently active.
   */
  thumb: boolean;

  /**
   * The data of the active thumb, or null if none is active.
   */
  thumbData: TThumbData | null;
};
