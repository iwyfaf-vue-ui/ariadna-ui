import type { Ref } from 'vue';
import type {
  TUseDragViewportOptions,
  TUseDragViewportReturn,
} from './types/useDragViewport.types';

/**
 * Ariadna UI | composables | useDragViewport
 *
 * useDragViewport provides drag-and-drop functionality for a specified target element within a viewport. This
 * composable enables tracking and handling of drag events, supporting both HTML and SVG elements.
 *
 * @param {Ref<HTMLElement | SVGElement | null>} container
 * @param {Ref<HTMLElement | SVGElement | null>} target
 * @param {TUseDragViewportOptions} options
 *
 * @returns {TUseDragViewportReturn}
 *
 * @example
 * const draggableContainer = ref<HTMLElement | null>(null);
 * const draggableTarget = ref<HTMLElement | null>(null);
 *
 * const { x, y, position, transform, isDragging } = useDragViewport(draggableContainer, draggableTarget);
 */
declare function useDragViewport(
  /**
   * The container element that will be dragged.
   */
  container: Ref<HTMLElement | SVGElement | null>,

  /**
   * The element inside the container that will be used to drag the container.
   */
  target: Ref<HTMLElement | SVGElement | null>,

  /**
   * Optional configuration for customizing drag behavior.
   */
  options?: TUseDragViewportOptions,
): TUseDragViewportReturn;

export default useDragViewport;
