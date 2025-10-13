import type { ClassComponent, GlobalComponentConstructor } from '../../../../types/component';
import type { VNode } from 'vue';
import type { EVirtualScrollerPropsDefault } from './types/VirtualScroller.enums';
export type { TVirtualScrollerItem, TVirtualScrollerIndexes } from './types/VirtualScroller.types';

/**
 * Component props definition.
 */
export type TVirtualScrollerProps<Data> = {
  /**
   * VirtualScroller data.
   *
   * @type Array<Data>
   * @default []
   * @required
   * @example items="data"
   */
  items: Array<Data>;

  /**
   * The height of each list item (it is very important to specify the exact height).
   *
   * @type number
   * @default undefined
   * @required
   * @example :item-height="250"
   */
  itemHeight: number;

  /**
   * Height of VirtualScroller.
   *
   * @type number
   * @default {@link EVirtualScrollerPropsDefault.HEIGHT}
   * @example :height="500"
   */
  height?: number;

  /**
   * The number of additional elements to render.
   *
   * @type number
   * @default {@link EVirtualScrollerPropsDefault.OVERSCAN}
   * @example :overscan="10"
   */
  overscan?: number;

  /**
   * Redefines the CSS class of the root element and its descendants.
   *
   * @type string
   * @default {@link EVirtualScrollerPropsDefault.CSS_CLASS}
   * @example css-class="example"
   */
  cssClass?: string;
};

/**
 * Component slots definition.
 */
export type TVirtualScrollerSlots<Data> = {
  /**
   * Used to customize the display of each list item.
   *
   * @param {TVirtualScrollerItem<Data>} props.item - Item in list.
   * @returns {VNode[]}
   */
  default?(props: { item: TVirtualScrollerItem<Data> }): VNode[];
};

/**
 * Component events emitted.
 */
export type TVirtualScrollerEmits = {};

/**
 * Component exposes.
 */
export type TVirtualScrollerExposes = {
  /**
   * Used to scroll on an element by its index.
   * @param {number} index - Element index.
   */
  scrollTo: (index: number) => void;

  /**
   * Used to get the start and end index of the visible list items.
   * @returns {TVirtualScrollerIndexes}
   */
  getVisibleIndexes: () => TVirtualScrollerIndexes;
};

/**
 * Ariadna UI | Components | Data
 *
 * VirtualScroller is a component for optimized display of large amounts of data.
 */
declare class VirtualScroller<Data>
  extends ClassComponent<
    TVirtualScrollerProps<Data>,
    TVirtualScrollerSlots<Data>,
    TVirtualScrollerEmits,
    HTMLDivElement
  >
  implements TVirtualScrollerExposes
{
  scrollTo: (index: number) => void;
  getVisibleIndexes: () => TVirtualScrollerIndexes;
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    VirtualScroller: GlobalComponentConstructor<VirtualScroller>;
  }
}

export default VirtualScroller;
