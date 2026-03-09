import type { ComputedRef } from 'vue';
import type { TToastMessageInternal } from '../../types/Toast.types';

/**
 * @description
 * Return type for the `useToastApi` composable function.
 * Contains reactive state and methods for managing Toast messages.
 */
export type TUseToastApiReturn = {
  /**
   * Reactive array of currently displayed toast messages.
   */
  messages: Array<TToastMessageInternal>;

  /**
   * Computed function that returns CSS class string for a given message.
   */
  messageClasses: ComputedRef<(message: TToastMessageInternal) => string>;

  /**
   * Removes a toast message by its internal ID and emits the `close` event.
   *
   * @param {number} id
   * The internal ID of the message to remove.
   */
  remove(id: number): void;

  /**
   * Removes all currently displayed toast messages and clears their timers.
   */
  removeAll(): void;

  /**
   * Adds a new toast message to the queue. If `ttl` is set, schedules
   * automatic removal and emits the `ttl-end` event upon expiry.
   *
   * @param {TToastMessageInternal} message
   * The message to add.
   */
  add(message: TToastMessageInternal): void;

  /**
   * Filters incoming messages by group and delegates to `add` if matched.
   *
   * @param {TToastMessageInternal} message
   * The incoming message.
   */
  filterMessagesByGroup(message: TToastMessageInternal): void;
};
