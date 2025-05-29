import type { ComputedRef, CSSProperties, Ref } from 'vue';

export type TUseDragViewportReturn = {
  /**
   * The X coordinate of the dragged element.
   */
  x: Ref<number>;

  /**
   * The Y coordinate of the dragged element.
   */
  y: Ref<number>;

  /**
   * Computed styles with dynamic left & top property.
   */
  style: ComputedRef<CSSProperties>;

  /**
   * Dragging state.
   */
  isDragging: Ref<boolean>;
};

/**
 * Options for configuring the drag behavior of an element.
 *
 * @description
 * The `TUseDragViewportOptions` type defines the configuration options for enabling and customizing drag functionality
 * on a UI element. It allows you to control the visibility state, enable or disable dragging, and set the initial
 * position of the element.
 */
export type TUseDragViewportOptions = {
  /**
   * The visibility status of the target container element. It is necessary for the correct deletion of events when the
   * target element is hidden.
   *
   * @default false
   */
  state?: Ref<boolean>;

  /**
   * Disable or enable drag action.
   *
   * @default false
   */
  disabled?: Ref<boolean>;

  /**
   * Initial position of the draggable element.
   *
   * @default { x: 0, y: 0}
   */
  initialPosition?: { x: number; y: number };

  /**
   * The callback function is called when the dragging operation is started.
   */
  onDragStart?: () => void;

  /**
   * The callback function is called when the dragging operation is end.
   */
  onDragEnd?: () => void;
};
