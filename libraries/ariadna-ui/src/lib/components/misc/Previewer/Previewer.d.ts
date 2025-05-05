import type { ClassComponent, GlobalComponentConstructor } from '../../../../types/component';
import type { Component, VNode } from 'vue';
import { EPreviewerPropsDefault } from './types/Previewer.enums';

/**
 * Component props definition.
 */
export type TPreviewerProps = {
  /**
   * Component to be rendered in the preview.
   *
   * @default undefined
   */
  component?: Component | string;

  /**
   * Component source to be rendered as a raw text.
   *
   * @default undefined
   */
  componentSource?: string;

  /**
   * Whether to show the code block immediately.
   *
   * @type boolean
   * @default false
   */
  showCode?: boolean;

  /**
   * Whether to show the code toggle button.
   *
   * @type boolean
   * @default true
   */
  showCodeToggle?: boolean;

  /**
   * Redefines the CSS class of the root element and its descendants.
   *
   * @example css-class="example"
   * @default {@link EPreviewerPropsDefault.CSS_CLASS}
   */
  cssClass?: string;
};

/**
 * Component slots definition.
 */
export type TPreviewerSlots = {
  /**
   * Slot for rendering the header content above the previewed component.
   *
   * @returns {VNode[]}
   */
  header?(): VNode[];

  /**
   * Slot for rendering the description content below the header and above the previewed component.
   *
   * @returns {VNode[]}
   */
  description?(): VNode[];

  /**
   * Slot for customizing the code toggle button.
   *
   * @param {() => void} props.toggle - A function to toggle the visibility of the code block.
   * @param {boolean} props.isShown - Indicates whether the code block is currently visible.
   * @returns {VNode[]}
   */
  showCodeToggle?(props: { toggle: () => void; isShown: boolean }): VNode[];

  /**
   * Slot for rendering a custom copy button.
   *
   * @param {Promise<unknown> } props.toggle - A function to be called when the copy action should be triggered.
   * @param {boolean} props.isCopied - Indicates whether the code is having been copied.
   * @returns {VNode[]}
   */
  copy?(props: { handler: Promise<unknown>; isCopied: boolean }): VNode[];

  /**
   * Slot for customizing the component source code appearance.
   *
   * @param {boolean} props.source - Component source to be rendered as a raw text.
   * @returns {VNode[]}
   */
  source?(props: { source: string }): VNode[];
};

/**
 * Component events emitted.
 */
export type TPreviewerEmits = {};

/**
 * Ariadna UI | Components | Misc
 *
 * Previewer for demonstrating other Vue components with the ability to display the component's source code. Ideal for
 * documentation, design systems, or playgrounds.
 */
declare class Previewer extends ClassComponent<
  TPreviewerProps,
  TPreviewerSlots,
  TPreviewerEmits,
  HTMLButtonElement
> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Previewer: GlobalComponentConstructor<Previewer>;
  }
}

export default Previewer;
