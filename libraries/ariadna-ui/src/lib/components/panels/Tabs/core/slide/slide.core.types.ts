/**
 * Represents the size of a container element.
 */
export type TContainerSize = {
  /**
   * The visible width of the container in pixels.
   */
  width: number;

  /**
   * The total scrollable width of the container in pixels.
   */
  scrollWidth: number;
};

/**
 * Core slide functionality and state. Provides properties and methods to manage sliding behavior.
 */
export type TSlideCore = {
  /**
   * Offset of the slide in pixels.
   */
  offset: number;

  /**
   * Indicates whether a slide action is currently in progress.
   */
  isSliding: boolean;

  /**
   * Updates the size of the container.
   *
   * @param {TContainerSize} newContainerSize - The new size of the container.
   */
  updateContainerSize(newContainerSize: TContainerSize): void;

  /**
   * Updates the left and right paddings.
   *
   * @param {[number, number]} newPaddings - Tuple representing [leftPadding, rightPadding] in pixels.
   */
  updatePaddings(newPaddings: [number, number]): void;

  /**
   * Called at the beginning of a slide action (e.g., touchstart or mousedown).
   *
   * @param {number} clientX - The horizontal coordinate where the slide started.
   */
  slideStart(clientX: number): void;

  /**
   * Called during the slide action (e.g., touchmove or mousemove).
   *
   * @param {number} clientX - The current horizontal coordinate during sliding.
   */
  slideMove(clientX: number): void;

  /**
   * Called at the end of a slide action (e.g., touchend or mouseup).
   */
  slideEnd(): void;
};

/**
 * Contains container size and optional paddings.
 */
export type TSlideCoreOptions = {
  /**
   * The size of the container.
   */
  containerSize: TContainerSize;

  /**
   * Optional paddings in pixels as [left, right].
   */
  paddings?: [number, number];
};
