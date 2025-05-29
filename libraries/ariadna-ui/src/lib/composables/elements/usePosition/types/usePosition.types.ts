import type { Ref } from 'vue';
import type { EUsePosition } from './usePosition.enums';

export type TUsePositionReturn = {
  /**
   * The value of the top property when positioned absolutely relative to the button/activator.
   */
  top: Ref<number>;

  /**
   * The value of the left property when positioned absolutely relative to the button/activator.
   */
  left: Ref<number>;

  /**
   * Position calculation function.
   */
  calculate: () => void;

  /**
   * Css class with position. Possible values: `top`, `right`, `left`, `bottom`.
   */
  cssClass: Ref<string>;

  /**
   * Secondary cssClass with position. Possible values: `top`, `right`, `left`, `bottom`, `center`.
   */
  secondaryCssClass: Ref<string>;
};

/**
 * Provides a set of functions for determining available space and calculating positions for UI elements relative to
 * the viewport or container.
 *
 * @description
 * The `TPositionedFunctions` type defines utility methods to check if there is enough space on each side (top, bottom,
 * left, right) of an element, as well as methods to compute the exact position for "nailing" (attaching) the element
 * to a specific side. These functions are useful for dynamic positioning in overlays, tooltips, dropdowns, and
 * similar UI components.
 */
export type TPositionedFunctions = {
  /**
   * Determines whether the space at the top is free.
   *
   * @param {number} threshold - Invisible indentation, allows you to reduce/increase the width/height of the window
   * for calculations.
   */
  isTopPlace: (threshold?: number) => boolean;

  /**
   * Determines whether the space at the bottom is free.
   *
   * @param {number} threshold - Invisible indentation, allows you to reduce/increase the width/height of the window
   * for calculations.
   */
  isBottomPlace: (threshold?: number) => boolean;

  /**
   * Determines whether the space at the right is free.
   *
   * @param {number} threshold - Invisible indentation, allows you to reduce/increase the width/height of the window
   * for calculations.
   */
  isRightPlace: (threshold?: number) => boolean;

  /**
   * Determines whether the space at the left is free.
   *
   * @param {number} threshold - Invisible indentation, allows you to reduce/increase the width/height of the window
   * for calculations.
   */
  isLeftPlace: (threshold?: number) => boolean;

  /**
   * Contains a ready-made formula for nailing an element from above.
   */
  positionTop: () => number;

  /**
   * Contains a ready-made formula for nailing an element from below.
   */
  positionBottom: () => number;

  /**
   * Contains a ready-made formula for nailing an element to the right.
   */
  positionRight: () => number;

  /**
   * Contains a ready-made formula for nailing an element to the left.
   */
  positionLeft: () => number;
};

/**
 * Specifying X and Y padding for a specific position EUsePosition. [number, number] = [x, y].
 *
 * @description
 * Defines a mapping between each `EUsePosition` value and a function that calculates the X and Y indents (padding)
 * for that position. The function receives references to the positioned element, the button, the dropbox, and the
 * container, and returns a tuple representing the X and Y indents as numbers.
 */
export type TUsePositionIndents = Record<
  EUsePosition,
  (
    positioned: TPositionedFunctions,
    button: HTMLElement,
    dropbox: HTMLElement,
    container: HTMLElement,
  ) => [number, number]
>;

/**
 * @description
 * Options for configuring the positioning logic in the usePosition composable. This type defines the parameters that
 * control how an element's position is calculated relative to a container, including thresholds, disabled state,
 * positioning order, and indents.
 */
export type TUsePositionOptions = {
  /**
   * Container relative to which calculations about available space will be made.
   *
   * @type {null | HTMLElement}
   * @default null
   */
  container?: null | HTMLElement;

  /**
   * Invisible indentation, allows you to reduce/increase the width/height of the window for calculations.
   *
   * @type {number}
   * @default 0
   */
  threshold: number;

  /**
   * The disabled state disables position calculation if true.
   *
   * @type {() => boolean}
   * @default () => false
   */
  disabled: () => boolean;

  /**
   * Manages possible positioning options, as well as the priority of each positioning. The first element has the
   * highest priority, and the last element has the lowest.
   *
   * @type {[EUsePosition, EUsePosition]
   *     | [EUsePosition, EUsePosition, EUsePosition]
   *     | [EUsePosition, EUsePosition, EUsePosition, EUsePosition]}
   * @default [EUsePosition.BOTTOM, EUsePosition.TOP, EUsePosition.RIGHT, EUsePosition.LEFT]
   */
  positionOrder:
    | [EUsePosition, EUsePosition]
    | [EUsePosition, EUsePosition, EUsePosition]
    | [EUsePosition, EUsePosition, EUsePosition, EUsePosition];

  /**
   * Padding for each side of X and Y positioning.
   *
   * @type {TUsePositionIndents}
   * @default {
   *     [EUsePosition.TOP]: () => [0, 0],
   *     [EUsePosition.BOTTOM]: () => [0, 0],
   *     [EUsePosition.RIGHT]: () => [0, 0],
   *     [EUsePosition.LEFT]: () => [0, 0],
   *   }
   */
  indents: TUsePositionIndents;
};
