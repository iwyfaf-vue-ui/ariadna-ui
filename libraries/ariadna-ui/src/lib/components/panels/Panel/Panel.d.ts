import type {
  ClassComponent,
  GlobalComponentConstructor,
  TSharedPropsModifier,
} from '../../../../types/component';
import type { VNode } from 'vue';
import type { EPanelPropsDefault } from './types/Panel.enums';
export type { TPanelToggleEvent } from './types/Panel.types';

/**
 * Component props definition.
 */
export type TPanelProps = {
  /**
   * The text of the panel title.
   *
   * @type string
   * @default undefined
   * @required
   * @example header="Panel header"
   */
  header?: string;

  /**
   * Defines if content of panel can be expanded and collapsed.
   *
   * @default false
   * @example :toggleable="true"
   */
  toggleable?: boolean;

  /**
   * Defines the initial state of panel content.
   *
   * @default false
   * @example :toggleable="true"
   */
  collapsed?: boolean;

  /**
   * Redefines the CSS class of the root element and its descendants.
   *
   * @type string
   * @default {@link EPanelPropsDefault.CSS_CLASS}
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
export type TPanelSlots = {
  /**
   * Slot for rendering the component content.
   *
   * @returns {VNode[]}
   */
  default?(): VNode[];

  /**
   * Slot for rendering the component header.
   *
   * @param {string | undefined} props.isCollapsed - Indicates whether the content is collapsed.
   * @returns {VNode[]}
   */
  header?(props: { isCollapsed: boolean }): VNode[];

  /**
   * Slot for rendering the component icons.
   *
   * @returns {VNode[]}
   */
  icons?(): VNode[];

  /**
   * Slot for rendering the component collapse or expand buttons.
   *
   * @param {string | undefined} props.isCollapsed - Indicates whether the content is collapsed.
   * @param {event: TPanelToggleEvent['originalEvent']} props.toggleCollapsed - Function to toggle the collapsed state.
   * @returns {VNode[]}
   */
  toggleButton?(props: {
    isCollapsed: boolean;
    toggleCollapsed: (event: TPanelToggleEvent['originalEvent']) => void;
  }): VNode[];

  /**
   * Slot for rendering the component contents of the collapse or expand button.
   *
   * @param {string | undefined} props.isCollapsed - Indicates whether the content is collapsed.
   * @returns {VNode[]}
   */
  toggleIcon?(props: { isCollapsed: boolean }): VNode[];

  /**
   * Slot for rendering the component footer.
   *
   * @returns {VNode[]}
   */
  footer?(): VNode[];
};

/**
 * Component events emitted.
 */
export type TPanelEmits = {
  /**
   * Emitted when the panel content is collapsed or expanded.
   *
   * @param {"scrolled"} e - The event name: 'toggle'.
   * @param {TPanelToggleEvent} payload - The payload of the event.
   */
  (e: 'toggle', payload: TPanelToggleEvent): void;
};

/**
 * Component exposes.
 */
export type TPanelExposes = {
  /**
   * Function for collapsing or expanding the contents of the panel.
   */
  toggle: (event: TPanelToggleEvent) => void;
};

/**
 * Ariadna UI | Components | Panel
 *
 * Panel is a grouping component providing with content toggle feature.
 */
declare class Panel
  extends ClassComponent<TPanelProps, TPanelSlots, TPanelEmits, HTMLDivElement>
  implements TPanelExposes
{
  toggle: (event: TPanelToggleEvent) => void;
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Panel: GlobalComponentConstructor<Panel>;
  }
}

export default Panel;
