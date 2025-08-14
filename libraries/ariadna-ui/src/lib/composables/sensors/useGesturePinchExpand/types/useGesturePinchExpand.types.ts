import { EUseGesturePinchExpandType } from './useGesturePinchExpand.enums';

/**
 * Represents an optional configuration object for useGesturePinchExpand composable.
 */
export type TUseGesturePinchExpandOptions = {
  /**
   * Minimum distance change (in pixels) required to trigger the gesture handler. Defaults to 4.
   */
  threshold: number;
};

/**
 * Represents a pinch-zoom event, providing details about the event type and the center coordinates of the gesture.
 */
export type TUseGesturePinchExpandEvent = {
  /**
   * The type of pinch-expand event.
   */
  type: EUseGesturePinchExpandType;

  /**
   * The X coordinate of the center point of the pinch gesture.
   */
  centerX: number;

  /**
   * The Y coordinate of the center point of the pinch gesture.
   */
  centerY: number;
};
