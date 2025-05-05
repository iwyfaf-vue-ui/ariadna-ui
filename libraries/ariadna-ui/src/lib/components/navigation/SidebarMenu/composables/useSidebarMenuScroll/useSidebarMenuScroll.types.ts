import type { ComputedRef, Ref } from 'vue';

/**
 * Return type for the `useSidebarMenuScroll` composable function.
 */
export type TUseSidebarMenuScrollReturn = {
  /**
   * CSS class name for the sidebar menu scroll, injected from the provider.
   */
  cssClass: string | undefined;

  /**
   * Reactive ref indicating whether the Sidebar is collapsed.
   */
  collapsed: Ref<boolean | undefined>;

  /**
   * Reactive ref indicating whether the scrollbar is visible.
   */
  isVisible: Ref<boolean, boolean>;

  /**
   * Reactive ref indicating whether the scrollbar is draggable.
   */
  isDraggable: Ref<boolean, boolean>;

  /**
   * Reactive ref to the scroll container element.
   */
  scrollRef: Ref<HTMLDivElement | null, HTMLDivElement | null>;

  /**
   * Reactive ref to the scrollbar element.
   */
  scrollBarRef: Ref<HTMLDivElement | null, HTMLDivElement | null>;

  /**
   * Reactive ref to the scroll thumb element.
   */
  scrollThumbRef: Ref<HTMLDivElement | null, HTMLDivElement | null>;

  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;

  /**
   * Handler for mouse entering the scroll area. Shows the custom scrollbar and updates its position.
   */
  onMouseIn: () => void;

  /**
   * Handler for mouse up event after dragging the scrollbar thumb. Ends the drag operation and removes related event
   * listeners.
   */
  onMouseUp: () => void;

  /**
   * Handler for mouse leaving the scroll area. Hides the custom scrollbar.
   */
  onMouseLeave: () => void;

  /**
   * Handler for mouse movement during scrollbar thumb drag. Updates the scroll position based on mouse Y coordinate.
   * Should be attached to the window during drag operation.
   *
   * @param {MouseEvent} event
   */
  onMouseMove: (event: MouseEvent) => void;

  /**
   * Handler for mouse down event on the scrollbar thumb. Initiates the drag operation for the scrollbar thumb.
   *
   * @param {MouseEvent} event
   */
  onMouseDown: (event: MouseEvent) => void;

  /**
   * Handler for mouse click event on the scrollbar track. Moves the scrollbar thumb to the clicked position.
   *
   * @param {MouseEvent} event
   */
  onClick: (event: MouseEvent) => void;

  /**
   * Handler for scroll event on the scroll container. Updates the scrollbar thumb position to reflect the current
   * scroll state.
   */
  onScroll: () => void;
};
