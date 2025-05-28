import type { ComputedRef, Ref } from 'vue';

/**
 * @description
 * Return type for the `useCard` composable function.
 * Contains reactive properties and methods for Card component functionality.
 */
export type TUseCardReturn = {
  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;

  /**
   * A Vue Ref<boolean> indicating whether the Card content is currently collapsed.
   */
  isContentCollapsed: Ref<boolean>;

  /**
   * Toggles the collapsed state of the Card content.
   */
  toggleCollapsed: () => void;

  /**
   * Resets the collapsed state of the Card content to its default value.
   */
  toggleCollapsedDefault: () => void;

  /**
   * Handler for the start of the collapse transition.
   *
   * @param el Element being expanded
   */
  onCollapseEnter: (el: Element) => void;

  /**
   * Handler for after the collapse transition has completed.
   *
   * @param el Element that finished expanding
   */
  onCollapseAfterEnter: (el: Element) => void;

  /**
   * Handler for before the collapse transition starts.
   *
   * @param el Element being collapsed
   */
  onCollapseBeforeLeave: (el: Element) => void;
};
