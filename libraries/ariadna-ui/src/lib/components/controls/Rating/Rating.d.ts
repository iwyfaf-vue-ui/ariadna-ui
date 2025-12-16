import type {
  ClassComponent,
  GlobalComponentConstructor,
  TSharedPropsModifier,
  TSharedPropsSize,
} from '../../../../types/component';
import type { VNode } from 'vue';
import type { ERatingPropsDefault } from './types/Rating.enums';
import type { TRatingPropsValuePosition } from './types/Rating.types';
import type { Nullable } from '../../../../types';

/**
 * Component props definition.
 */
export type TRatingProps = {
  /**
   * Value of the component.
   *
   * @type number
   * @default 0
   * @required
   * @example v-model="ratingValue"
   */
  modelValue: Nullable<number>;

  /**
   * Rating label text.
   *
   * @type string
   * @default undefined
   * @example label="Associated label"
   */
  label?: string;

  /**
   * Rating id attribute.
   *
   * @type string
   * @default Random generated string by using Vue 3.5 useId() helper.
   * @see https://vuejs.org/api/composition-api-helpers.html#useid
   * @example id="custom-id"
   */
  id?: string;

  /**
   * The number of rating stars.
   *
   * @type number
   * @default {@link ERatingPropsDefault.STAR_COUNT}
   * @example :star-count="10"
   */
  starCount?: number;

  /**
   * The rating star filling step value.
   *
   * @type number
   * @default {@link ERatingPropsDefault.FILL_STEP}
   * @example :rounding-step="10"
   */
  fillStep?: number;

  /**
   * Will render one star, instead of the total number of stars. Works only with the `:readonly="true"`
   *
   * @type boolean
   * @default false
   * @example :single-mode="true"
   */
  singleMode?: boolean;

  /**
   * Predefined size variants for the component.
   *
   * @type TSharedPropsSize
   * @default {@link ERatingPropsDefault.SIZE}
   * @example size="small"
   * @example size="medium"
   * @example size="large"
   */
  size?: TSharedPropsSize;

  /**
   * Will render the current rating as understandable values. Example: 3.5/5.
   *
   * @type boolean
   * @default false
   * @example :show-label="true"
   */
  showValue?: boolean;

  /**
   * Positioning the value relative to the stars.
   *
   * @type TRatingPropsValuePosition
   * @default {@link ERatingPropsDefault.VALUE_POSITION}
   * @example :label-pos="left"
   */
  valuePosition?: TRatingPropsValuePosition;

  /**
   * Enables or disables the ability to reset rating.
   *
   * @type boolean
   * @default false
   * @example :cancel="true"
   */
  reset?: boolean;

  /**
   * Rating disabled state.
   *
   * @type boolean
   * @default false
   * @example :disabled="true"
   */
  disabled?: boolean;

  /**
   * Disabling the editing mode.
   *
   * @type boolean
   * @default false
   * @example :readonly="true"
   */
  readonly?: boolean;

  /**
   * Rating valid state.
   *
   * @type boolean
   * @default false
   * @example :valid="true"
   */
  valid?: boolean;

  /**
   * Rating invalid state.
   *
   * @type boolean
   * @default false
   * @example :invalid="true"
   */
  invalid?: boolean;

  /**
   * An array of component error messages.
   *
   * @type Array<string>
   * @default []
   * @example :errors="['First error', 'Second error']"
   */
  errors?: Array<string>;

  /**
   * Redefines the CSS class of the root element and its descendants.
   *
   * @type string
   * @default {@link ERatingPropsDefault.CSS_CLASS}
   * @example css-class="example"
   */
  cssClass?: string;

  /**
   * Modifier of the basic CSS class.
   *
   * @type TSharedPropsModifier
   * @default undefined
   * @example modifier="primary"
   */
  modifier?: TSharedPropsModifier;
};

/**
 * Component slots definition.
 */
export type TRatingSlots = {
  /**
   * Slot for active star.
   * @returns {VNode[]}
   */
  active?(): VNode[];

  /**
   * Slot for inactive star.
   * @returns {VNode[]}
   */
  inactive?(): VNode[];

  /**
   * Slot for value.
   *
   * @param {string | undefined} props.value - Rating value.
   * @param {number} props.starCount - Star count.
   * @returns {VNode[]}
   */
  value?(props: { value: string | undefined; starCount: number }): VNode[];

  /**
   * Slot for rendering a custom reset button.
   *
   * @param {() => void} props.cancel - A function that resets the current rating value when invoked.
   * @returns {VNode[]}
   */
  reset?(props: { reset: () => void }): VNode[];

  /**
   * Component error messages.
   *
   * @param {Array<string>} props.errors - An array of component error messages.
   * @returns {VNode[]}
   */
  errors?(props: { errors: Array<string> }): VNode[];
};

/**
 * Component events emitted.
 */
export type TRatingEmits = {
  /**
   * Emitted when the model value is updated.
   *
   * @param {"update:model-value"} e - The event name: 'update:model-value'.
   * @param {TRatingProps["modelValue"]} payload - The new value of the Rating component.
   */
  (e: 'update:model-value', payload: TRatingProps['modelValue']): void;

  /**
   * Emitted when component gains focus.
   * @param {"focus"} e - The event name: 'focus'.
   * @param {Event} event - The focus event object.
   */
  (e: 'focus', event: Event): void;
};

/**
 * Ariadna UI | Components | Rating
 *
 * Rating component is a star based selection.
 */
declare class Rating extends ClassComponent<
  TRatingProps,
  TRatingSlots,
  TRatingEmits,
  HTMLDivElement
> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Rating: GlobalComponentConstructor<Rating>;
  }
}

export default Rating;
