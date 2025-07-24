import type {
  ClassComponent,
  GlobalComponentConstructor,
  TSharedPropsModifier,
} from '../../../../types/component';
import type { VNode } from 'vue';
export type { TSliderTrack } from './types/Slider.types';
import type { ESliderPropsDefault } from './types/Slider.enums';

/**
 * Component props definition.
 */
export type TSliderProps = {
  /**
   * Values for tracks.
   *
   * @type Array<[number, number] | number>
   * @required
   * @example v-model="[[50, 60], 90]"
   */
  modelValue: Array<[number, number] | number>;

  /**
   * Slider tracks.
   *
   * @type Array<TSliderTrack>
   * @required
   * @example
   * ```ts
   * :tracks="tracks"
   *
   * const tracks = ref([
   *   {
   *     key: 'playing',
   *     thumb: true,
   *     zIndex: 0,
   *     label: false,
   *   },
   * ]);
   * ```
   */
  tracks: Array<TSliderTrack>;

  /**
   * Slider label text.
   *
   * @type string
   * @default undefined
   * @example label="Associated label"
   */
  label?: string;

  /**
   * Slider native id attribute.
   *
   * @type string
   * @default Random generated string by using Vue 3.5 useId() helper.
   * @see https://vuejs.org/api/composition-api-helpers.html#useid
   * @example id="custom-id"
   */
  id?: string;

  /**
   * The minimum slider value.
   *
   * @type number
   * @default {@link ESliderPropsDefault.MIN}
   * @example :min="10"
   */
  min?: number;

  /**
   * The maximum value.
   *
   * @type number
   * @default {@link ESliderPropsDefault.MAX}
   * @example :max="90"
   */
  max?: number;

  /**
   * The value step.
   *
   * @type number | null
   * @default null
   * @example :step="5"
   */
  step?: number | null;

  /**
   * Defines the points on the track where the track can move. Has a higher priority than props.step.
   *
   * @type Array<number> | null
   * @default null
   * @example :points="[0, 25, 50, 75, 100]"
   */
  points?: Array<number> | null;

  /**
   * Slider native disabled attribute.
   *
   * @type boolean
   * @default false
   * @example :disabled="true"
   */
  disabled?: boolean;

  /**
   * Slider valid state.
   *
   * @type boolean
   * @default false
   * @example :valid="true"
   */
  valid?: boolean;

  /**
   * Slider invalid state.
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
   * @default {@link ESliderPropsDefault.CSS_CLASS}
   * @example css-class="example"
   */
  cssClass?: string;

  /**
   * Modifier of the basic CSS class.
   *
   * @default undefined
   * @example modifier="primary"
   */
  modifier?: TSharedPropsModifier;
};

/**
 * Component slots definition.
 */
export type TSliderSlots = {
  /**
   * Custom points on the track.
   *
   * @param {Array<string>} props.value - Value of the point.
   * @returns {VNode[]}
   */
  point?(props: { value: number }): VNode[];

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
export type TSliderEmits = {
  /**
   * Emitted when the model value is updated.
   *
   * @param {"update:model-value"} e - The event name: 'update:model-value'.
   * @param {TSliderProps["modelValue"]} payload - The new value of the Slider.
   */
  (e: 'update:model-value', payload: TSliderProps['modelValue']): void;

  /**
   * Emitted when any track start changing.
   * @param {"changeStart"} e - The event name: 'update:model-value'.
   * @param {TSliderProps["modelValue"]} payload - The data associated with the event.
   * @param {TSliderProps["modelValue"]} payload.track - The slider track where the change started.
   * @param {TSliderProps["modelValue"]} payload.value - The current value(s) of the slider.
   * @param {TSliderProps["modelValue"]} payload.index - The index of the slider handle being changed.
   */
  (
    e: 'changeStart',
    payload: { track: TSliderTrack; value: Array<number> | number; index: number },
  ): void;

  /**
   * Emitted when the value of an any track changes.
   * @param {"change"} e
   * @param {TSliderProps["modelValue"]} payload - The data associated with the event.
   * @param {TSliderProps["modelValue"]} payload.track - The slider track where the change is occurring.
   * @param {TSliderProps["modelValue"]} payload.value - The current value(s) of the slider.
   * @param {TSliderProps["modelValue"]} payload.index - The index of the slider handle being changed.
   */
  (
    e: 'change',
    payload: { track: TSliderTrack; value: Array<number> | number; index: number },
  ): void;

  /**
   * Emitted when the modification of an any track is completed.
   * @param {"changeEnd"} e
   * @param {TSliderProps["modelValue"]} payload - The data associated with the event.
   * @param {TSliderProps["modelValue"]} payload.track - The slider track where the change ended.
   * @param {TSliderProps["modelValue"]} payload.value - The final value(s) of the slider.
   * @param {TSliderProps["modelValue"]} payload.index - The index of the slider handle that was changed.
   */
  (
    e: 'changeEnd',
    payload: { track: TSliderTrack; value: Array<number> | number; index: number },
  ): void;
};

/**
 * Ariadna UI | Components | Slider
 *
 * Slider is a component to provide input with a drag handle.
 */
declare class Slider extends ClassComponent<
  TSliderProps,
  TSliderSlots,
  TSliderEmits,
  HTMLDivElement
> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Slider: GlobalComponentConstructor<Slider>;
  }
}

export default Slider;
