/**
 * Generic event handler type that can accept any type of event.
 */
export type EventHandler<T = any> = (event: T) => void;

/**
 * Interface for an event bus that allows subscribing to, unsubscribing from, and emitting events.
 */
export interface IEventBus {
  /**
   * Registers an event handler for a specific event type.
   *
   * @template T - The type of the event payload.
   * @param {string} type - The name of the event to listen for.
   * @param {EventHandler<T>} handler - The function to handle the event.
   */
  on<T>(type: string, handler: EventHandler<T>): void;

  /**
   * Unregisters an event handler for a specific event type.
   *
   * @template T - The type of the event payload.
   * @param {string} type - The name of the event to stop listening for.
   * @param {EventHandler<T>} handler - The function to remove from the event listeners.
   */
  off<T>(type: string, handler: EventHandler<T>): void;

  /**
   * Emits an event of a specific type to all registered handlers.
   *
   * @template T - The type of the event payload.
   * @param {string} type - The name of the event to emit.
   * @param {T} event - The event payload to send to handlers.
   */
  emit<T>(type: string, event: T): void;
}
