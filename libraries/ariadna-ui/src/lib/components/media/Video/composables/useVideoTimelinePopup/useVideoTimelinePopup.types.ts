import type { Ref } from 'vue';

/**
 * @description
 * Return type for the `useVideoTimelinePopup` composable function.
 * Contains reactive properties and methods for Video component functionality.
 */
export type TUseVideoTimelinePopupReturn = {
  /**
   * A ref representing the left offset (in pixels) of the popup relative to the timeline.
   */
  timeLinePopupLeft: Ref<number, number>;

  /**
   * A ref representing the time value (in seconds) displayed in the popup.
   */
  timeLinePopupTime: Ref<number, number>;

  /**
   * A ref indicating whether the timeline popup is currently visible.
   */
  timeLinePopupVisible: Ref<boolean, boolean>;

  /**
   * Handler for mouse enter events on the timeline; shows the popup.
   */
  onTimeLineMouseEnter: () => void;

  /**
   * Handler for mouse leave events on the timeline; hides the popup.
   */
  onTimeLineMouseLeave: () => void;

  /**
   * Handler for mouse move events on the timeline; updates popup position and time.
   * @param {MouseEvent} event - The mouse event triggered when the mouse moves over the timeline.
   */
  onTimeLineMouseMove: (event: MouseEvent) => void;
};
