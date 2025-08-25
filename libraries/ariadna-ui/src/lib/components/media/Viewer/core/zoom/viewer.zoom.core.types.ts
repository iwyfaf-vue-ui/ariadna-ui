import Observable from '@/shared/utils/patterns/observable/observable.utils';

/**
 * Data structure representing the details of a zoom change event in the viewer.
 *
 * @property newValue - The new zoom scale value after the change.
 * @property oldValue - The previous zoom scale value before the change.
 * @property centerX - (Optional) The X coordinate of the zoom center, if applicable.
 * @property centerY - (Optional) The Y coordinate of the zoom center, if applicable.
 */
export type TViewerZoomCoreOnZoomChangeData = {
  newValue: number;
  oldValue: number;
  centerX?: number;
  centerY?: number;
};

/**
 * Options for configuring the zoom core functionality.
 *
 * @property maxScale - The maximum allowed zoom scale.
 */
export type TViewerZoomOptions = {
  maxScale: number;
};

/**
 * Interface describing the core zoom functionality for a viewer component.
 *
 * @property scale - The current zoom scale.
 * @property isScaled - Indicates whether the viewer is currently zoomed (scale !== 1).
 * @property normalizedScale - The normalized zoom scale value.
 * @property onZoomChange - Observable that emits when the zoom changes.
 */
export type TViewerZoomCore = {
  /**
   * The current zoom scale value.
   */
  scale: number;

  /**
   * Indicates whether the viewer is currently zoomed (true if scale !== 1).
   */
  isScaled: boolean;

  /**
   * The normalized zoom scale value, typically adjusted to fit within allowed bounds.
   */
  normalizedScale: number;

  /**
   * Observable that emits whenever the zoom changes.
   */
  onZoomChange: Observable<TViewerZoomCoreOnZoomChangeData>;

  /**
   * Changes the zoom scale by the specified delta.
   *
   * @param {number} delta - The amount to change the zoom scale by.
   */
  zoom(delta: number): void;

  /**
   * Changes the zoom scale by the specified delta at a specific center point.
   *
   * @param {number} delta - The amount to change the zoom scale by.
   * @param {number} centerX - The X coordinate to center the zoom on.
   * @param {number} centerY - The Y coordinate to center the zoom on.
   */
  zoomAt(delta: number, centerX: number, centerY: number): void;

  /**
   * Sets the zoom scale to a specific value, optionally centered at a point.
   *
   * @param {number} scale - The new zoom scale to set.
   * @param {number} centerX - (Optional) The X coordinate to center the zoom on.
   * @param {number} centerY - (Optional) The Y coordinate to center the zoom on.
   */
  setScale(scale: number, centerX?: number, centerY?: number): void;

  /**
   * Normalizes the provided scale value according to internal logic.
   *
   * @param {number} scale - The scale value to normalize.
   *
   * @returns {number} - The normalized scale value.
   */
  normalizeScale(scale: number): number;
};
