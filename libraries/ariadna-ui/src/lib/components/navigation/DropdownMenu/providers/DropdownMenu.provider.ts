import type { InjectionKey, VNode } from 'vue';
import type { TDropdownMenuItem, TDropdownMenuPropsExpandMode } from '../types/DropdownMenu.types';

/**
 * Shape of the data provided by DropdownMenu to all descendant components.
 */
export type TDropdownMenuProvider = {
  /**
   * Base CSS class of the root DropdownMenu component.
   * Used by children to generate BEM-style class names.
   */
  cssClass: string;

  /**
   * Sub-menu expand mode ('click' | 'hover').
   */
  expandMode: TDropdownMenuPropsExpandMode;

  /**
   * Closes the root dropdown menu.
   */
  close: () => void;

  /**
   * Emits the `item-click` event on the root DropdownMenu.
   */
  emitItemClick: (item: TDropdownMenuItem) => void;

  /**
   * Custom item slot function provided by the consumer.
   * When defined, it replaces the default item rendering.
   */
  itemSlot?: (props: { item: TDropdownMenuItem; level: number; close: () => void }) => VNode[];
};

export const DropdownMenuProviderKey: InjectionKey<TDropdownMenuProvider> =
  Symbol('DropdownMenuProvider');
