import type {
  ClassComponent,
  GlobalComponentConstructor,
  TSharedPropsModifier,
} from '../../../../types/component';
import type { VNode } from 'vue';
import type { EDialogPropsDefault } from './types/Dialog.enums';

/**
 * Component props definition.
 */
export type TDialogProps = {
  /**
   * Specifies the visibility of the Dialog.
   *
   * @type boolean
   * @default false
   * @required
   * @example :visible="dialogVisible"
   */
  visible: boolean;

  /**
   * Put Dialog into maximized mode.
   *
   * @type boolean
   * @default false
   * @example :maximized="true"
   */
  maximized?: boolean;

  /**
   * Make Dialog draggable. Not work with `maximized` prop.
   *
   * @type boolean
   * @default false
   * @example :draggable="true"
   */
  draggable?: boolean;

  /**
   * Make only Dialog content scrollable.
   *
   * @type boolean
   * @default false
   * @example :content-scrollable="true"
   */
  contentScrollable?: boolean;

  /**
   * User cannot dismiss Dialog if clicking outside of it or hitting ESC key.
   *
   * @type boolean
   * @default false
   * @example :persistent="true"
   */
  persistent?: boolean;

  /**
   * User cannot dismiss Dialog by clicking on overlay. No need to set it if 'persistent' prop is set or `overlay`
   * props is set off.
   *
   * @type boolean
   * @default false
   * @example :no-overlay-dismiss="true"
   */
  noOverlayDismiss?: boolean;

  /**
   * User cannot dismiss Dialog by hitting ESC key. No need to set it if 'persistent' prop is also set.
   *
   * @type boolean
   * @default false
   * @example :no-esc-dismiss="true"
   */
  noEscDismiss?: boolean;

  /**
   * Shake up the Dialog to catch user's attention when trying to close it in a prohibited way.
   *
   * @type boolean
   * @default false
   * @example :shake="true"
   */
  shake?: boolean;

  /**
   * Component show overlay element.
   *
   * @type boolean
   * @default true
   * @example :overlay="false"
   */
  overlay?: boolean;

  /**
   * A valid query selector or an HTMLElement to specify where the dialog gets attached.
   *
   * @type 'body' | string
   * @default {@link EDialogPropsDefault.APPEND_TO}
   * @example append-to="#teleports"
   */
  appendTo?: 'body' | string;

  /**
   * Redefines the CSS class of the root element and its descendants.
   *
   * @type string
   * @default {@link EDialogPropsDefault.CSS_CLASS}
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
export type TDialogSlots = {
  /**
   * Slot for rendering dialog header content.
   *
   * @param {(event: Event) => void} props.hide - A function that hides the dialog when called with an event.
   * @param {(event: Event) => void} props.toggleMaximize - A function that toggle the dialog maximized state.
   * @returns {VNode[]}
   */
  header?: (props: {
    hide: (event: Event) => void;
    toggleMaximize: (event: Event) => void;
  }) => VNode[];

  /**
   * Slot for rendering dialog main content.
   *
   * @returns {VNode[]}
   */
  content?: () => VNode[];

  /**
   * Slot for rendering dialog footer content.
   *
   * @returns {VNode[]}
   */
  footer?: () => VNode[];
};

/**
 * Component events emitted.
 */
export type TDialogEmits = {
  /**
   * Emitted when Dialog is mounted.
   *
   * @param {"mounted"} e - The event name.
   */
  (e: 'mounted'): void;

  /**
   * Emitted when the visible value is updated.
   *
   * @param {"update:visible"} e - The event name.
   * @param {TDialogProps["modelValue"]} payload - The new value of the checkbox.
   */
  (e: 'update:visible', payload: TDialogProps['visible']): void;

  /**
   * Emitted when Dialog is shown.
   *
   * @param {"hide"} e - The event name.
   */
  (e: 'show'): void;

  /**
   * Emitted when Dialog is hidden.
   *
   * @param {"hide"} e - The event name.
   * @param {"Event"} event - The hide event object.
   */
  (e: 'hide', event: Event): void;

  /**
   * Emitted after Dialog is hidden.
   *
   * @param {"hide"} e - The event name.
   */
  (e: 'after-hide'): void;

  /**
   * Emitted when a dialog gets maximized.
   *
   * @param {"maximized"} e - The event name.
   * @param {"Event"} event - The maximized event object.
   */
  (e: 'maximized', event: Event): void;

  /**
   * Emitted when a dialog gets unmaximized.
   *
   * @param {"unMaximized"} e - The event name.
   * @param {"Event"} event - The unMaximized event object.
   */
  (e: 'unMaximized', event: Event): void;

  /**
   * Emitted when Dialog drag begins.
   *
   * @param {"mounted"} e - The event name.
   */
  (e: 'drag-start'): void;

  /**
   * Emitted when Dialog drag completes.
   *
   * @param {"mounted"} e - The event name.
   */
  (e: 'drag-end'): void;
};

/**
 * Ariadna UI | Components | Dialog
 *
 * Dialog component is a container to display content in an overlay window.
 */
declare class Dialog extends ClassComponent<
  TDialogProps,
  TDialogSlots,
  TDialogEmits,
  HTMLDivElement
> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Dialog: GlobalComponentConstructor<Dialog>;
  }
}

export default Dialog;
