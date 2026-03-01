import type { ComputedRef, Ref } from 'vue';
import type { TPanelToggleEvent } from '../../types/Panel.types';

/**
 * @description
 * Return type for the `usePanelCollapse` composable function.
 * Contains reactive properties and methods for Panel component functionality.
 */
export type TUsePanelCollapseReturn = {
  /**
   * Reactive flag that represents the current collapsed state of the panel content.
   */
  isInnerCollapsed: Ref<boolean, boolean>;

  /**
   * Event handler that toggles the panel collapse state.
   *
   * @param {TPanelToggleEvent["originalEvent"]} event
   * The original event that triggered the toggle action.
   */
  collapseHandler: (event: TPanelToggleEvent['originalEvent']) => void;

  /**
   * Transition hook called when the collapse enter animation starts.
   *
   * @param {Element} el
   * The DOM element that is entering (the collapsible content container).
   */
  onCollapseEnter: (el: Element) => void;

  /**
   * Transition hook called after the collapse enter animation completes.
   *
   * @param {Element} el
   * The DOM element that has finished entering.
   */
  onCollapseAfterEnter: (el: Element) => void;

  /**
   * Transition hook called right before the collapse leave animation starts.
   *
   * @param {Element} el
   * The DOM element that is about to leave (collapse).
   */
  onCollapseBeforeLeave: (el: Element) => void;

  /**
   * Computed CSS class string for the collapsible content container.
   */
  collapseClasses: ComputedRef<string>;
};
