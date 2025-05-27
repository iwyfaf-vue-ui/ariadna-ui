import type { ComputedRef, CSSProperties } from 'vue';

/**
 * @description
 * Return type for the `useRating` composable function.
 * Contains reactive properties and methods for Rating component functionality.
 */
export type TUseRatingReturn = {
  /**
   * Computed unique identifier for the component instance.
   */
  uniqueID: ComputedRef<string>;

  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;

  /**
   A computed reference containing the dynamic CSS styles for the Rating component. This property is typically used to
   apply inline styles that depend on the component's state or props, such as color, size, or animation transitions.
   */
  ratingStyles: ComputedRef<CSSProperties>;

  /**
   * A computed property that returns a human-readable string representation of the rating value when the component is
   * in readonly mode and a model value is present. The value is calculated by multiplying the model value by the star
   * count, rounding to two decimal places, and converting the result to a string. If the component is not readonly or
   * the model value is undefined, the property returns `undefined`.
   */
  readableRating: ComputedRef<string | undefined>;

  /**
   * Computes the CSS style object for the width of the rating star mask, which visually represents the filled portion
   * of the rating component. The width is determined based on the component's state, such as whether it is disabled,
   * in single mode, readonly, or being hovered. This computed property ensures that the mask accurately reflects the
   * current rating value, hover state, and rounding step.
   */
  ratingStarMaskStyles: ComputedRef<{ width: string }>;

  /**
   * Computes the number of stars to display in the rating component. If the component is in single mode and is
   * readonly, it returns 1. Otherwise, it returns the value of the `starCount` prop.
   */
  starsCount: ComputedRef<number | undefined>;

  /**
   * Handles the focus event on the Radio component.
   *
   * @param event - The focus event object.
   */
  onFocus: (event: Event) => void;

  /**
   * Handles the blur event on the Radio component.
   */
  onBlur: () => void;

  /**
   * Handles the mouse over event on the Radio component.
   */
  onMouseOver: () => void;

  /**
   * Handles the mouse leave event on the Radio component.
   */
  onMouseLeave: () => void;

  /**
   * Handles the reset action for the Rating component, typically invoked when the user clears their rating selection.
   */
  onReset: () => void;

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
