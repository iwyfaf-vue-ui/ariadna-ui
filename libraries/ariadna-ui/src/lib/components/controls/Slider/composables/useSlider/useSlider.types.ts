import type { ComputedRef } from 'vue';
import type { EThumbPosition } from '../../types/Slider.enums';

/**
 * @description
 * Return type for the `useSlider` composable function.
 * Contains reactive properties and methods for Slider component functionality.
 */
export type TUseSliderReturn = {
  /**
   * Computed unique identifier for the component instance.
   */
  uniqueID: ComputedRef<string>;

  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;

  /**
   * Computed array of common points (numeric values) used for snapping or reference on the slider track.
   */
  commonPoints: ComputedRef<number[]>;

  /**
   * Clamps a number between a minimum and maximum value, ensuring the result is within the specified range.
   * @param {number} min - The minimum allowable value.
   * @param {number} middle - The value to be clamped.
   * @param {number} max - The maximum allowable value.
   * @returns {number} - The clamped value, guaranteed to be between min and max.
   */
  clamp: (min: number, middle: number, max: number) => number;

  /**
   * Rounds a given value to the nearest step increment.
   * @param {number} value - The number to be rounded.
   * @returns {number} - The value rounded according to the step size.
   */
  roundByStep: (value: number) => number;

  /**
   * Calculates the percentage position on the slider track corresponding to a given value.
   * @param {number} value - Numeric value to convert to percentage.
   * @returns {number} - Percentage (0-100) representing the position on the slider track.
   */
  getPercentageByValue: (value: number) => number;

  /**
   * Returns an object representing CSS classes for the additional track element based on the provided key.
   * @param {string} key - A string key used to determine which additional track classes to apply.
   * @returns {{[p: string]: boolean}} - An object where keys are class names and values are booleans indicating whether the class should be applied.
   */
  getAdditionalTrackClasses: (key: string) => { [p: string]: boolean };

  /**
   * Returns an object representing CSS classes for the slider thumb element based on the provided key, drag state,
   * and thumb position.
   *
   * @param {string} key - A string key used to determine which thumb classes to apply.
   * @param {boolean} isDrag - A boolean indicating whether the thumb is currently being dragged.
   * @param {EThumbPosition} position - The position of the thumb, represented by the EThumbPosition enum.
   * @returns {{[p: string]: boolean}} - An object where keys are class names and values are booleans indicating
   * whether the class should be applied.
   */
  getThumbClasses: (
    key: string,
    isDrag: boolean,
    position: EThumbPosition,
  ) => { [p: string]: boolean };

  /**
   * Calculates inline CSS styles for the slider track based on the current value(s).
   * @param {Array<number> | number} value - Single number or array of numbers representing slider values.
   * @returns {string} - CSS style string to apply to the slider track element.
   */
  calculateStylesForTrackByValue: (value: Array<number> | number) => string;

  /**
   * Calculates a new value or range for the slider track based on pointer position and thumb.
   * @param {Array<number> | number} value - Current slider value(s).
   * @param {number} clientX - Horizontal coordinate of the pointer event.
   * @param {EThumbPosition} position - Thumb position indicating which thumb is being moved.
   * @returns {number | [number, number]} - New slider value or tuple of values representing the updated range.
   */
  calculateNewTrackValue: (
    value: Array<number> | number,
    clientX: number,
    position: EThumbPosition,
  ) => number | [number, number];

  /**
   * Calculates and updates the index of the first slider value that has an associated thumb.
   */
  calculateFirstWithThumbIndex: () => void;

  /**
   * Determines the thumb position (left or right) based on the current value(s) and client X coordinate.
   * @param {Array<number> | number} value - Current slider value(s).
   * @param {number} clientX - Horizontal coordinate of the pointer event.
   * @returns {EThumbPosition} - Thumb position enum indicating which thumb is active or targeted.
   */
  getDirection: (value: Array<number> | number, clientX: number) => EThumbPosition;

  /**
   * Finds the closest point from the common points array to a given value.
   * @param {number} value - Numeric value to find the closest point for.
   * @returns {number} - Closest numeric point from the commonPoints array.
   */
  findClosestPoint: (value: number) => number;

  /**
   * Updates the slider value at a specified index.
   * @param {[number, number] | number} value - New value or range to set.
   * @param {number} index - Index of the thumb or value to update.
   */
  updateValue: (value: [number, number] | number, index: number) => void;

  /**
   * Handler invoked when the mouse pointer enters the slider component area.
   */
  onMouseOver: () => void;

  /**
   * Handler invoked when the mouse pointer leaves the slider component area.
   */
  onMouseLeave: () => void;

  /**
   * Handler for the start of the expand transition.
   *
   * @param el Element being expanded
   */
  onExpandEnter: (el: Element) => void;

  /**
   * Handler for after the expand transition has completed.
   *
   * @param el Element that finished expanding
   */
  onExpandAfterEnter: (el: Element) => void;

  /**
   * Handler for before the collapse transition starts.
   *
   * @param el Element being collapsed
   */
  onExpandBeforeLeave: (el: Element) => void;
};
