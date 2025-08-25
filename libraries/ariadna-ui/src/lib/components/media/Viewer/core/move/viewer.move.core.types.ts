/**
 * Defines the movement boundaries for the Viewer, specifying the maximum and minimum allowed positions.
 */
export type TViewerMoveLimits = {
  /**
   * The maximum allowed top offset for the Viewer.
   */
  maxTop: number;

  /**
   * The minimum allowed top offset for the Viewer.
   */
  minTop: number;

  /**
   * The maximum allowed left offset for the Viewer.
   */
  maxLeft: number;

  /**
   * The minimum allowed left offset for the Viewer.
   */
  minLeft: number;
};

/**
 * Represents a 2D position with x and y coordinates.
 */
export type TViewerMovePosition = {
  /**
   * The x-coordinate of the position.
   */
  x: number;

  /**
   * The y-coordinate of the position.
   */
  y: number;
};

/**
 * Describes the size of an element in the Viewer, including width and height.
 */
export interface TViewerMoveElementSize {
  /**
   * The width of the element.
   */
  width: number;

  /**
   * The height of the element.
   */
  height: number;
}

/**
 * Options for configuring the core movement logic of the Viewer.
 */
export type TViewerMoveCoreOptions = {
  /**
   * The size of the container element. Can be null if not set.
   */
  containerSize: TViewerMoveElementSize | null;

  /**
   * The size of the item being moved. Can be null if not set.
   */
  moveItemSize: TViewerMoveElementSize | null;

  /**
   * The factor by which movement is slowed down.
   */
  slowFactor: number;
};

/**
 * Core type for managing Viewer movement, including drag state and offset updates. Manages the calculation of offsets
 * and movement restrictions in the container.
 */
export type TViewerMoveCore = {
  /**
   * The current top offset of the move item.
   */
  topOffset: number;

  /**
   * The current left offset of the move item.
   */
  leftOffset: number;

  /**
   * Indicates whether the move item is currently being dragged.
   */
  isDragging: boolean;

  /**
   * Starts the dragging operation at the specified client coordinates.
   *
   * @param {number} clientX - The X coordinate where the drag starts.
   * @param {number} clientY - The Y coordinate where the drag starts.
   */
  start(clientX: number, clientY: number): void;

  /**
   * Updates the position of the move item during dragging.
   *
   * @param {number} clientX - The current X coordinate during the drag.
   * @param {number} clientY - The current Y coordinate during the drag.
   */
  move(clientX: number, clientY: number): void;

  /**
   * Ends the dragging operation.
   */
  end(): void;

  /**
   * Resets the movement state to its initial values.
   */
  reset(): void;

  /**
   * Updates the offsets when the zoom level changes, optionally around a center point.
   *
   * @param {number} newZoom - The new zoom level.
   * @param {number} oldZoom - The previous zoom level.
   * @param {number} centerX - (Optional) The X coordinate of the zoom center.
   * @param {number} centerY - (Optional) The Y coordinate of the zoom center.
   */
  updateOffsetsWithZoom(newZoom: number, oldZoom: number, centerX?: number, centerY?: number): void;

  /**
   * Updates the size of the container element.
   *
   * @param {TViewerMoveElementSize} size - The new size of the container.
   */
  updateContainerSize(size: TViewerMoveElementSize): void;

  /**
   * Updates the size of the move item.
   *
   * @param {TViewerMoveElementSize} size - The new size of the move item.
   */
  updateMoveItemSize(size: TViewerMoveElementSize): void;
};
