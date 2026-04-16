import type { ComputedRef, Ref, VNode } from 'vue';
import type { TDropdownMenuItem } from '../../types/DropdownMenu.types';

/**
 * Render strategy for the interactive element inside a menu item.
 * - `action`   — `<a>` with an onclick handler (no href)
 * - `external` — `<a href target="_blank">` for external URLs or when no router is present
 * - `internal` — `<RouterLink>` for in-app navigation
 * - `toggle`   — `<button>` that opens/closes the nested sub-menu
 * - `plain`    — `<div>` with no interaction
 */
export type TDropdownMenuItemRenderType = 'action' | 'external' | 'internal' | 'toggle' | 'plain';

/**
 * Return type for the `useDropdownMenuItem` composable.
 */
export type TUseDropdownMenuItemReturn = {
  /**
   * Base CSS class injected from the DropdownMenu provider.
   */
  cssClass: string;

  /**
   * Whether the item is in a disabled state.
   */
  isDisabled: ComputedRef<boolean>;

  /**
   * Whether the item has nested children.
   */
  hasChildren: ComputedRef<boolean>;

  /**
   * Whether the nested sub-menu is currently open.
   */
  isSubOpen: Ref<boolean>;

  /**
   * Strategy that determines which HTML tag / component to render.
   */
  renderType: ComputedRef<TDropdownMenuItemRenderType>;

  /**
   * Computed HTML attributes bound to the interactive element (href, target, rel).
   */
  linkAttrs: ComputedRef<Record<string, string | undefined>>;

  /**
   * BEM CSS class string for the `<li>` element.
   */
  componentClasses: ComputedRef<string>;

  /**
   * BEM CSS class string for the inner interactive element.
   */
  linkClasses: ComputedRef<string>;

  /**
   * Click handler for the interactive element.
   * Handles: disabled guard, sub-menu toggle (click mode), action call, close.
   */
  clickHandler: () => void;

  /**
   * Mouseenter handler — opens sub-menu when expandMode is 'hover'.
   */
  hoverHandler: () => void;

  /**
   * Mouseleave handler — closes sub-menu when expandMode is 'hover'.
   */
  leaveHandler: () => void;

  /**
   * Custom item slot function from the DropdownMenu provider, if provided by the consumer.
   */
  itemSlot?: (props: { item: TDropdownMenuItem; level: number; close: () => void }) => VNode[];

  /**
   * Closes the root dropdown menu (from provider).
   */
  close: () => void;
};
