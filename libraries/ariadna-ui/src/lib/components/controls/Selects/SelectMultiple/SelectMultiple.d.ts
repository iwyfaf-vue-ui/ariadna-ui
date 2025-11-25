import type {
  ClassComponent,
  GlobalComponentConstructor,
  TSharedPropsModifier,
  TSharedPropsSize,
} from '../../../../../types/component';
import type { VNode } from 'vue';
import type { ESelectMultiplePropsDefault } from './types/SelectMultiple.enums';
import type {
  TSelectMultipleFilter,
  TSelectMultipleVirtualScroller,
} from './types/SelectMultiple.types';

/**
 * Component props definition.
 */
export type TSelectMultipleProps = {
  /**
   * Value of the component.
   *
   * @type Array<Record<string, any>> | any[]
   * @default []
   * @required
   * @example v-model="selectMultipleValue"
   */
  modelValue: Array<Record<string, any>> | any[];

  /**
   * Value of input filter.
   *
   * @type string
   * @default ''
   * @example v-model:filter-value="filterValue"
   */
  filterValue?: string;

  /**
   * An array of SelectMultiple items to display as the available options.
   *
   * @type Array<Record<string, any>> | Array<any>
   * @default []
   * @required
   * @example :options="selectMultipleOptions"
   */
  options: Array<Record<string, any>> | Array<any>;

  /**
   * Property name to use as the label of an option.
   *
   * @type string
   * @default {@link ESelectMultiplePropsDefault.OPTION_LABEL}
   * @example option-label="name"
   */
  optionLabel?: string;

  /**
   * Property name to use as the value of an option, defaults to the option itself when not defined.
   *
   * @type string | null
   * @default null
   * @example option-value="id"
   */
  optionValue?: string | null;

  /**
   * Input label text.
   *
   * @type string
   * @default undefined
   * @example label="Associated label"
   */
  label?: string;

  /**
   * Input native id attribute.
   *
   * @type string
   * @default Random generated string by using Vue 3.5 useId() helper.
   * @see https://vuejs.org/api/composition-api-helpers.html#useid
   * @example id="custom-id"
   */
  id?: string;

  /**
   * Input placeholder. Will be ignored if placeholder slot is defined.
   *
   * @type string
   * @default undefined
   * @example placeholder="Placeholder from props"
   */
  placeholder?: string;

  /**
   * The selected values are displayed as tiles.
   *
   * @type boolean
   * @default false
   * @example :tiles="true"
   */
  tiles?: boolean;

  /**
   * Decides how many selected item labels to show at most.
   *
   * @type number
   * @default undefined
   * @example :max-selected-labels="5"
   */
  maxSelectedLabels?: number;

  /**
   * Label to display after exceeding max selected labels. Will work only if prop maxSelectedLabels is defined.
   *
   * @type string
   * @default undefined
   * @example selected-items-label="`Elements selected: {0}`"
   */
  selectedItemsLabel?: string;

  /**
   * Enables and disables the multiselect checkbox control.
   *
   * @type boolean
   * @default false
   * @example :multiselect-checkbox="true"
   */
  multiselectCheckbox?: boolean;

  /**
   * Input native disabled attribute.
   *
   * @type boolean
   * @default false
   * @example :disabled="true"
   */
  disabled?: boolean;

  /**
   * Whether the component is in loading state.
   *
   * @type boolean
   * @default false
   * @example :loading="true"
   */
  loading?: boolean;

  /**
   * Predefined size variants for the component.
   *
   * @type TSharedPropsSize
   * @default {@link ESelectMultiplePropsDefault.SIZE}
   * @example size="small"
   * @example size="medium"
   * @example size="large"
   */
  size?: TSharedPropsSize;

  /**
   * Activates the built-in filtering of options, outputs the default contents of the filter slot.
   *
   * @type TSelectMultipleFilter
   * @default undefined
   * @example :filter="{ filterLabel: [[{ field: 'label' }]] }"
   */
  filter?: TSelectMultipleFilter;

  /**
   * Activates the VirtualScroller in the list of options.
   *
   * @type TSelectMultipleVirtualScroller
   * @default undefined
   * @example :virtual-scroller="{ itemHeight: 40, height: 200 }"
   */
  virtualScroller?: TSelectMultipleVirtualScroller;

  /**
   * Input valid state.
   *
   * @type boolean
   * @default false
   * @example :valid="true"
   */
  valid?: boolean;

  /**
   * Input invalid state.
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
   * @default {@link ESelectMultiplePropsDefault.CSS_CLASS}
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

  /**
   * Label native attribute for better accessibility.
   *
   * @type string
   * @default {@link ESelectMultiplePropsDefault.ARIA_LABEL}
   * @example aria-label="Show list"
   */
  ariaLabel?: string;
};

/**
 * Component slots definition.
 */
export type TSelectMultipleSlots = {
  /**
   * Slot for rendering the label, which will replace the placeholder, as well as the text of the selected value.
   *
   * @param {Array<Record<string, any>>} props.selectedOptions - Array of selected options.
   * @param {string} props.label - Current component label.
   * @param {(option: Record<string, any>) => void} props.remove - A method for deleting the selected option.
   * @returns {VNode[]}
   */
  label?(props: {
    selectedOptions: Array<Record<string, any>>;
    label: string;
    remove: (option: Record<string, any>) => void;
  }): VNode[];

  /**
   * Slot for rendering the list of selectable options.
   *
   * @param {Record<string, any>} props.option - The current option to render.
   * @param {boolean} props.checked - Option checked state.
   * @returns {VNode[]}
   */
  options?(props: { option: Record<string, any>; checked: boolean }): VNode[];

  /**
   * Slot for rendering content when there are no options available.
   *
   * @returns {VNode[]}
   */
  empty?(): VNode[];

  /**
   * Slot for rendering tiles of selected values.
   *
   * @param {Array<any>} props.selectedOptions - Array of selected options.
   * @param {(option: Record<string, any>) => void} props.removeTile - A method for deleting the selected option by
   * tile click.
   * @param {string} props.optionLabel - Option label.
   * @returns {VNode[]}
   */
  tiles?(props: {
    selectedOptions: Array<any>;
    removeTile: (option: Record<string, any>) => void;
    optionLabel: string;
  }): VNode[];

  /**
   * Slot for rendering a multi-choice checkbox.
   *
   * @param {Record<string, any>} props.option - The current option to render.
   * @param {boolean} props.checked - Option checked state.
   * @returns {VNode[]}
   */
  multiselectCheckbox?(props: { select: () => void; checked: boolean }): VNode[];

  /**
   * Slot for rendering a custom filter input or UI.
   *
   * @param {{onFilter: (filterState: string) => Array<any>}} props.onFilter - A callback to trigger filtering with the
   * provided filter state.
   * @returns {VNode[]}
   */
  filterInput?(props: { onFilter: (filterState: string) => Array<any> }): VNode[];

  /**
   * Slot for rendering content when the filter yields no results.
   *
   * @returns {VNode[]}
   */
  emptyFilter?(): VNode[];

  /**
   * Slot for rendering the filter icon next to the input filtering field.
   *
   * @returns {VNode[]}
   */
  filterIcon?(): VNode[];

  /**
   * Slot for rendering the droplist disclosure icon. When an item is selected, it is replaced with the contents of the
   * cleanIcon slot.
   *
   * @returns {VNode[]}
   */
  toggleIcon?(): VNode[];

  /**
   * Slot for rendering a custom clean (clear) icon. This slot is appear when an option is selected.
   *
   * @returns {VNode[]}
   */
  cleanIcon?(): VNode[];

  /**
   * Slot for rendering a custom loading icon.
   *
   * @returns {VNode[]}
   */
  loadingIcon?(): VNode[];

  /**
   * Slot for rendering the loading indicator in the options list element.
   *
   * @returns {VNode[]}
   */
  loading?(): VNode[];

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
export type TSelectMultipleEmits = {
  /**
   * Emitted when the model value is updated.
   *
   * @param {"update:model-value"} e - The event name: 'update:model-value'.
   * @param {TSelectMultipleProps['modelValue']} payload - The new value of the SelectMultiple component.
   */
  (e: 'update:model-value', payload: TSelectMultipleProps['modelValue']): void;

  /**
   * Emitted when the model value filter is updated.
   *
   * @param {"update:filter-value"} e - The event name: 'update:model-value-filter'.
   * @param {TSelectMultipleProps['filterValue']} payload - The new filter value of the SelectMultiple component.
   */
  (e: 'update:filter-value', payload: TSelectMultipleProps['filterValue']): void;

  /**
   * Emitted when component gains focus.
   *
   * @param {"focus"} e - The event name: 'focus'.
   * @param {Event} event - The focus event object.
   */
  (e: 'focus', event: Event): void;

  /**
   * Emitted when component is blur.
   *
   * @param {"blur"} e - The event name: 'blur'.
   * @param {Event} event - The blur event object.
   */
  (e: 'blur', event: Event): void;
};

/**
 * Ariadna UI | Components | Controls
 *
 * SelectMultiple component is used to select multiple items from a collection.
 */
declare class SelectMultiple extends ClassComponent<
  TSelectMultipleProps,
  TSelectMultipleSlots,
  TSelectMultipleEmits,
  HTMLDivElement
> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    SelectMultiple: GlobalComponentConstructor<SelectMultiple>;
  }
}

export default SelectMultiple;
