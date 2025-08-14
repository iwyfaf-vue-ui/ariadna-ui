import type { Ref } from 'vue';
export type {
  TUseGesturePinchExpandEvent,
  TUseGesturePinchExpandOptions,
} from './types/useGesturePinchExpand.types';
export { EUseGesturePinchExpandType } from './types/useGesturePinchExpand.enums';
export { useGesturePinchExpandDefaultOptions } from './useGesturePinchExpand';

/**
 * Ariadna UI | composables | useGesturePinchExpand
 *
 * Vue composable useGesturePinchExpand is designed for handling pinch and expand gestures on a specified container
 * element.
 *
 * @description This composable is listens for touch events and invokes the provided handler with gesture details and
 * the original event.
 *
 * @param {(pinchExpandEvent: TUseGesturePinchExpandEvent, event: TouchEvent) => void} handler - Callback function
 * invoked when a pinch-expand gesture is detected. Receives a pinchExpandEvent object and the original TouchEvent.
 * @param {Ref<HTMLElement | null>} container - Vue ref to the container HTMLElement to attach gesture listeners to.
 * If null, listeners are attached to the window.
 * @param {TUseGesturePinchExpandOptions} options - Optional configuration object.
 * @param {{threshold?: number}} options.threshold - Minimum distance change (in pixels) required to trigger the
 * gesture handler. Defaults to 4.
 *
 * @example
 * const containerRef = ref<HTMLElement | null>(null);
 *
 * useGesturePinchExpand(
 *   (pinchExpandEvent, event) => {
 *     if (pinchExpandEvent.type === EUseGesturePinchExpandType.EXPAND) {
 *       console.log('Zooming out at', pinchExpandEvent.centerX, pinchExpandEvent.centerY);
 *     } else if (pinchExpandEvent.type === EUseGesturePinchExpandType.PINCHING) {
 *       console.log('Zooming in at', pinchExpandEvent.centerX, pinchExpandEvent.centerY);
 *     }
 *   },
 *   containerRef,
 *   { threshold: 8 }
 * );
 */
declare function useGesturePinchExpand(
  handler: (pinchExpandEvent: TUseGesturePinchExpandEvent, event: TouchEvent) => void,
  container: Ref<HTMLElement | null>,
  options?: TUseGesturePinchExpandOptions,
): void;

export default useGesturePinchExpand;
