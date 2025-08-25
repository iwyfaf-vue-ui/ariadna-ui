/**
 * Represents a pair of coordinates in the viewer core.
 */
export type TViewerPositionCoreCoordinates = {
  /**
   * The horizontal coordinate.
   */
  x: number;

  /**
   * The vertical coordinate.
   */
  y: number;
};

/**
 * Represents the size (width and height) of an element in the viewer core.
 */
export type TViewerPositionCoreElementSize = {
  /**
   * The width of the element.
   */
  width: number;

  /**
   * The height of the element.
   */
  height: number;
};

/**
 * Options for configuring the viewer position core, including the items and container sizes.
 */
export type TViewerPositionCoreOptions = {
  /**
   * An array of sizes for each item in the viewer.
   */
  items: Array<TViewerPositionCoreElementSize>;

  /**
   * The size of the container element.
   */
  container: TViewerPositionCoreElementSize;
};

/**
 * The core type for managing viewer positions, including coordinates and update methods.
 */
export type TViewerPositionCore = {
  /**
   * An array of coordinates for each item in the viewer.
   */
  coords: Array<TViewerPositionCoreCoordinates>;

  /**
   * Updates the size of the container.
   *
   * @param {TViewerPositionCoreElementSize} size - The new size of the container.
   */
  updateContainerSize(size: TViewerPositionCoreElementSize): void;

  /**
   * Updates the size of a specific item in the viewer.
   *
   * @param {TViewerPositionCoreElementSize} size - The new size of the item.
   * @param {number} index - The index of the item to update.
   */
  updateMoveItemSize(size: TViewerPositionCoreElementSize, index: number): void;

  /**
   * Updates the sizes of all items in the viewer.
   *
   * @param {Array<TViewerPositionCoreElementSize>} items - The new sizes for all items.
   */
  updateMoveItemsSize(items: Array<TViewerPositionCoreElementSize>): void;
};
