/**
 * Enum representing the types of pinch zoom gestures detected by the useGesturePinchExpand composable.
 */
export enum EUseGesturePinchExpandType {
  /**
   * Indicates a pinching gesture (scale in).
   *
   * @type {EUseGesturePinchExpandType.PINCHING}
   */
  PINCHING = 'pinch',

  /**
   * Indicates an expanding gesture (scale out).
   *
   * @type {EUseGesturePinchExpandType.EXPAND}
   */
  EXPAND = 'expand',
}
