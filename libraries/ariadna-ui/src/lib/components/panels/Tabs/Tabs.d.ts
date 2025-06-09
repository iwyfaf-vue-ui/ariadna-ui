import type {
  ClassComponent,
  GlobalComponentConstructor,
  TSharedPropsModifier,
} from '../../../../types/component';
import type { VNode } from 'vue';
export type {
  TTabItem,
  TTabsSlotsDefault,
  TTabsSlotsLabel,
  TTabsEmitsChange,
} from './types/Tabs.types';
import type { ETabsPropsDefault } from './types/Tabs.enums';

/**
 * Component props definition.
 */
export type TTabsProps = {
  /**
   * List of tabs.
   *
   * @type Array<TTabItem>
   * @required
   * @default []
   * @example :tabs="[{ label: 'Tab 1', content: 'Content 1' }, { label: 'Tab 2', content: 'Content 2' }]"
   */
  tabs: Array<TTabItem>;

  /**
   * The tab index that will be opened by default.
   *
   * @type number
   * @default 0
   * @example :opened-by-default="1"
   */
  openedByDefault?: number;

  /**
   * The tab key for opening with SSR. Takes precedence over prop `openedByDefault`.
   *
   * @type string
   * @default undefined
   * @example active-key-by-default="tab_2"
   */
  activeKeyByDefault?: string;

  /**
   * The key of the tab header.
   *
   * @type string
   * @default {@link ETabsPropsDefault.TITLE_KEY}
   * @example title-key="label"
   */
  titleKey?: string;

  /**
   * Enables slide functionality.
   *
   * @type boolean
   * @default false
   * @example :slide="true'
   */
  slide?: boolean;

  /**
   * Redefines the CSS class of the root element and its descendants.
   *
   * @type string
   * @default {@link ETabsPropsDefault.CSS_CLASS}
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
export type TTabsSlots = {
  /**
   * Slot for rendering the label of a tab.
   *
   * @param {any} props.item - The tab item data.
   * @param {boolean} props.selected - Indicates whether the tab is currently selected.
   * @returns {VNode[]}
   */
  [key: `label-${number}`]: (props: TTabsSlotsLabel) => VNode[];

  /**
   * Default slot for rendering the content of a tab.
   *
   * @param {any} props.item - The tab item data.
   * @returns {VNode[]}
   */
  [key: `default-${number}`]: (props: TTabsSlotsDefault) => VNode[];
};

/**
 * Component events emitted.
 */
export type TTabsEmits = {
  /**
   * Emitted when component active tab is changed.
   *
   * @param {"change"} event - The name of the event being emitted.
   * @param payload - The data associated with the event.
   * @param payload.key - The unique key identifying the selected tab.
   * @param payload.tab - The tab item object corresponding to the selected tab.
   */
  (event: 'change', payload: TTabsEmitsChange): void;
};

/**
 * Ariadna UI | Components | Tabs
 *
 * Tabs provides switching between different views.
 */
declare class Tabs extends ClassComponent<TTabsProps, TTabsSlots, TTabsEmits, HTMLElement> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Tabs: GlobalComponentConstructor<Tabs>;
  }
}

export default Tabs;
