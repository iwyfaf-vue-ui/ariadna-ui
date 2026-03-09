import type { ClassComponent, GlobalComponentConstructor } from '../../../../types/component';
import type { VNode } from 'vue';
import type { EToastPropsDefault } from './types/Toast.enums';
import type { TToastMessage, TToastPositionX, TToastPositionY } from './types/Toast.types';
export type { TToastApi, TToastEvent } from './types/Toast.types';

/**
 * Component props definition.
 */
export type TToastProps = {
  /**
   * Y-axis positioning.
   *
   * @type TToastPositionY
   * @default {@link EToastPropsDefault.POSITION_Y}
   * @required
   * @example position-y="top"
   */
  positionY?: TToastPositionY;

  /**
   * Y-axis positioning.
   *
   * @type TToastPositionX
   * @default {@link EToastPropsDefault.POSITION_X}
   * @required
   * @example position-x="center"
   */
  positionX?: TToastPositionX;

  /**
   * Unique identifier of a message group.
   *
   * @type string
   * @default {@link EToastPropsDefault.GROUP}
   * @example group="foo"
   */
  group?: string;

  /**
   * Maximum number of toast messages displayed at the same time. When the limit is reached,
   * the oldest existing toast is removed first before adding a new one.
   *
   * Set to `0` (default) to allow unlimited toasts.
   *
   * @type number
   * @default undefined
   * @example :max="3"
   */
  max?: number;

  /**
   * Whether the progressbar should be shown on the notification or not.
   *
   * @type boolean
   * @default false
   * @example :hide-progressbar="true"
   */
  hideProgressbar?: boolean;

  /**
   * Specifies the name of the transition animation applied to Toast messages when they enter and leave the DOM.
   *
   * @type string
   * @default {@link EToastPropsDefault.TRANSITION}
   * @example transition="zoom-in"
   */
  transition?: string;

  /**
   * A valid query selector or an HTMLElement to specify where the component gets attached.
   *
   * @type 'body' | string
   * @default {@link EToastPropsDefault.APPEND_TO}
   * @example append-to="#teleports"
   */
  appendTo?: 'body' | string;

  /**
   * Used to specify a callback function to be run when the mouseenter event is fired on the message component.
   *
   * @type Function
   * @default undefined
   * @example :on-mouse-enter="() => console.log('onMouseEnter')"
   */
  onMouseEnter?: Function;

  /**
   * Used to specify a callback function to be run when the mouseleave event is fired on the message component.
   *
   * @type Function
   * @default undefined
   * @example :on-mouse-leave="() => console.log('onMouseLeave')"
   */
  onMouseLeave?: Function;

  /**
   * Used to specify a callback function to be run when the click event is fired on the message component.
   *
   * @type Function
   * @default undefined
   * @example :on-click="() => console.log('onClick')"
   */
  onClick?: Function;

  /**
   * Redefines the CSS class of the root element and its descendants.
   *
   * @type string
   * @default {@link EPanelPropsDefault.CSS_CLASS}
   * @example css-class="example"
   */
  cssClass?: string;
};

/**
 * Component slots definition.
 */
export type TToastSlots = {
  /**
   * Slot for rendering the component message detail.
   *
   * @param {TToastMessage['detail']} props.detail - Toast message detail information.
   * @returns {VNode[]}
   */
  detail?(props: { detail: TToastMessage['detail'] }): VNode[];

  /**
   * Slot for rendering the component message icon.
   *
   * @returns {VNode[]}
   */
  messageIcon?(): VNode[];

  /**
   * Slot for rendering the component summary information.
   *
   * @param {TToastMessage['summary']} props.summary - Toast message summary information.
   * @returns {VNode[]}
   */
  summary?(props: { summary: TToastMessage['summary'] }): VNode[];

  /**
   * Slot for rendering the component caption information.
   *
   * @param {TToastMessage['caption']} props.caption - Toast message caption information.
   * @returns {VNode[]}
   */
  caption?(props: { caption: TToastMessage['caption'] }): VNode[];

  /**
   * Slot for rendering the component close icon.
   *
   * @param {() => void} props.close - Method for close Toast message.
   * @returns {VNode[]}
   */
  closeIcon?(props: { close: () => void }): VNode[];

  /**
   * Slot for rendering the component info icon.
   *
   * @returns {VNode[]}
   */
  infoIcon?(): VNode[];

  /**
   * Slot for rendering the component warning icon.
   *
   * @returns {VNode[]}
   */
  warnIcon?(): VNode[];

  /**
   * Slot for rendering the component error icon.
   *
   * @returns {VNode[]}
   */
  dangerIcon?(): VNode[];

  /**
   * Slot for rendering the component success icon.
   *
   * @returns {VNode[]}
   */
  successIcon?(): VNode[];
};

/**
 * Component events emitted.
 */
export type TToastEmits = {
  /**
   * Emitted when the Toast is added.
   *
   * @param {"add"} e - The event name: 'add'.
   * @param {TToastEvent} payload - The payload of the event.
   */
  (e: 'add', payload: TToastEvent): void;

  /**
   * Emitted when the Toast is closed.
   *
   * @param {"close"} e - The event name: 'close'.
   * @param {TToastEvent} payload - The payload of the event.
   */
  (e: 'close', payload: TToastEvent): void;

  /**
   * Emitted when the Toast timeout is over.
   *
   * @param {"ttl-end"} e - The event name: 'ttl-end'.
   * @param {TToastEvent} payload - The payload of the event.
   */
  (e: 'ttl-end', payload: TToastEvent): void;
};

/**
 * Ariadna UI | Components | Toast
 *
 * Toast component is used to display messages in an overlay.
 */
declare class Toast extends ClassComponent<TToastProps, TToastSlots, TToastEmits, HTMLDivElement> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Toast: GlobalComponentConstructor<Toast>;
  }
}

export default Toast;
