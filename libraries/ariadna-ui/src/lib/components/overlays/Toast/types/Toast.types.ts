import type { TSharedPropsModifier } from '../../../../../types/component';

/**
 * Represents the vertical positioning options for a Toast notification.
 *
 * Defines where the Toast will appear along the vertical axis of the screen.
 */
export type TToastPositionY = 'top' | 'bottom' | 'center';

/**
 * Represents the horizontal positioning options for a Toast notification.
 *
 * Defines where the Toast will appear along the horizontal axis of the screen.
 */
export type TToastPositionX = 'right' | 'left' | 'center';

/**
 * Represents a single toast message instance displayed to the user.
 */
export type TToastMessage = {
  /**
   * A short title or heading displayed at the top of the Toast notification.
   */
  summary?: string;

  /**
   * A detailed description or body text displayed inside the Toast notification.
   */
  detail?: string;

  /**
   * A caption of the Toast notification.
   */
  caption?: string;

  /**
   * Lifetime of the toast in milliseconds before it is automatically removed.
   *
   * Omit the ttl option to make the Toast message sticky.
   */
  ttl?: number;

  /**
   * Determines whether the Toast can be manually closed by the user.
   *
   * @default 'false'
   */
  closable?: boolean | undefined;

  /**
   * Visual style modifier applied to the Toast notification.
   */
  modifier?: TSharedPropsModifier;

  /**
   * Target group identifier. The message will only be delivered to the Toast instance whose `group` prop matches this
   * value.
   *
   * @default 'default'
   */
  group?: string;
};

/**
 * Represents a single toast message internal instance.
 */
export type TToastMessageInternal = TToastMessage & {
  /**
   * Unique identifier for the toast instance.
   */
  _id: number;
};

/**
 * Component API.
 */
export type TToastApi = {
  /**
   * Registers a callback to be invoked when the component is created.
   *
   * @param {() => void} callback - The function to call upon creation.
   */
  created(callback: () => void): void;

  /**
   * Registers a callback to be invoked when the component is mounted to the DOM.
   *
   * @param {() => void} callback - The function to call upon mounting.
   */
  mounted(callback: () => void): void;

  /**
   * Registers a callback to be invoked when the component is unmounted from the DOM.
   *
   * @param {() => void} callback - The function to call upon unmounting.
   */
  unMounted(callback: () => void): void;

  /**
   * Adds a new Toast notification to the display queue.
   *
   * @param {TToastMessage} message
   * The message object containing the data for displaying the notification.
   */
  add(message: TToastMessage): void;

  /**
   * Removes the Toast message with the given internal ID.
   * The ID is available in the payload of `add`, `close`, and `ttl-end` events.
   *
   * @param {number} id - Internal ID of the message to remove.
   */
  remove(id: number): void;

  /**
   * Removes all Toast messages belonging to the specified group.
   *
   * @param {string} group - Group identifier matching the `group` prop of the target Toast instance.
   */
  removeGroup(group: string): void;

  /**
   * Removes all currently displayed Toast messages across all groups.
   */
  removeAll(): void;
};

/**
 * Payload emitted by Toast events such as `add`, `close` and `ttl-end`.
 */
export type TToastEvent = {
  /**
   * The message that triggered the event.
   */
  message: TToastMessage;
};

/**
 * Internal state of the auto-dismiss timer for a single Toast message.
 * Used to support pause and resume on hover.
 */
export type TToastTimerState = {
  /**
   * Timestamp (ms) when the current timer interval started or was last resumed.
   */
  startTime: number;

  /**
   * Remaining lifetime in milliseconds at the moment the timer was last paused or created.
   */
  remaining: number;

  /**
   * Active timeout handle, or `null` when the timer is paused.
   */
  timerId: ReturnType<typeof setTimeout> | null;
};
