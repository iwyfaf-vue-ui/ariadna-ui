import type {
  ClassComponent,
  GlobalComponentConstructor,
  TSharedPropsModifier,
} from '../../../../types/component';
import type { VNode } from 'vue';
import type { EDropboxPropsDefault } from './types/Dropbox.enums';

/**
 * Component props definition.
 */
export type TDropboxProps = {
  /**
   * Value of the component.
   *
   * @type boolean
   * @default false
   * @required
   * @example v-model="dropboxValue"
   */
  modelValue: boolean;

  /**
   * Disabling auto position.
   *
   * @type boolean
   * @default false
   * @example :disable-auto-position="true"
   */
  disableAutoPosition?: boolean;

  /**
   * Specifies if clicked outside of Dropbox should hide the Dropbox.
   *
   * @type boolean
   * @default false
   * @example :close-on-click-outside="true"
   */
  closeOnClickOutside?: boolean;

  /**
   * Specifies if pressing Escape key should hide the Dropbox.
   *
   * @type boolean
   * @default true
   * @example :close-on-escape="true"
   */
  closeOnEscape?: boolean;

  /**
   * Redefines the CSS class of the root element and its descendants.
   *
   * @type string
   * @default {@link EDropboxPropsDefault.CSS_CLASS}
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
export type TDropboxSlots = {
  /**
   * The default slot, receives the current open state of the Dropbox.
   *
   * @param {boolean} props.opened - Indicates whether the Dropbox is currently open.
   * @returns {VNode[]}
   */
  default(props: { opened: boolean }): VNode[];

  /**
   * The activator slot, receives the open state and control functions for the Dropbox.
   *
   * @param {boolean} props.opened - Indicates whether the Dropbox is currently open.
   * @param {() => void} props.open - Function to open the Dropbox.
   * @param {() => void} props.close - Function to close the Dropbox.
   * @param {() => void} props.toggle - Function to toggle the Dropbox's open state.
   * @returns {VNode[]}
   */
  activator(props: {
    opened: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
  }): VNode[];

  /**
   * The header slot, receives the open state and control functions for the Dropbox.
   *
   * @param {boolean} props.opened - Indicates whether the Dropbox is currently open.
   * @param {() => void} props.open - Function to open the Dropbox.
   * @param {() => void} props.close - Function to close the Dropbox.
   * @param {() => void} props.toggle - Function to toggle the Dropbox's open state.
   * @returns {VNode[]}
   */
  header?(props: {
    opened: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
  }): VNode[];
};

/**
 * Component events emitted.
 */
export type TDropboxEmits = {
  /**
   * Emitted when the model value is updated.
   *
   * @param {"update:model-value"} e - The event name.
   * @param {TDropboxProps["modelValue"]} payload - The new value of the checkbox.
   */
  (e: 'update:model-value', payload: TDropboxProps['modelValue']): void;

  /**
   * Emitted when the Dropbox is shown.
   *
   * @param {"show"} e - The event name.
   */
  (e: 'show'): void;

  /**
   * Emitted when the Dropbox is hidden.
   * @param {"hide"} e - The event name.
   */
  (e: 'hide'): void;
};

/**
 * Component exposes.
 */
export type TDropboxExposes = {
  /**
   * Function to open the Dropbox.
   */
  open: () => Promise<void>;

  /**
   * Function to close the Dropbox.
   */
  close: () => void;

  /**
   * Function to toggle the Dropbox's open state.
   */
  toggle: () => Promise<void>;

  /**
   * Function to calculate Dropbox's position.
   */
  calculate: () => void;
};

/**
 * Ariadna UI | Components | Dropbox
 *
 * Dropbox component is a container element for the content that needs to be shown after the trigger of the
 * activator-button. The content and the activator-button must be located inside the Dropbox component using slots.
 */
declare class Dropbox
  extends ClassComponent<TDropboxProps, TDropboxSlots, TDropboxEmits, HTMLDivElement>
  implements TDropboxExposes
{
  /**
   * Function to open the Dropbox.
   */
  open: () => Promise<void>;

  /**
   * Function to close the Dropbox.
   */
  close: () => void;

  /**
   * Function to toggle the Dropbox's open state.
   */
  toggle: () => Promise<void>;

  /**
   * Function to calculate Dropbox's position.
   */
  calculate: () => void;
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Dropbox: GlobalComponentConstructor<Dropbox>;
  }
}

export default Dropbox;
