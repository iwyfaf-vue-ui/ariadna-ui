import type { EventHandler, IEventBus } from './types/event-bus.types';

export default class EventBus implements IEventBus {
  /**
   * @description Store for event handlers.
   * @type {Map<string, EventHandler[]>}
   * @private
   */
  private handlersStore: Map<string, EventHandler[]> = new Map();

  public on<T>(type: string, handler: EventHandler<T>): void {
    let handlers = this.handlersStore.get(type);

    if (!handlers) {
      handlers = [handler];
    } else {
      handlers.push(handler);
    }

    this.handlersStore.set(type, handlers);
  }

  public off<T>(type: string, handler: EventHandler<T>): void {
    let handlers = this.handlersStore.get(type);

    if (handlers) {
      handlers.splice(handlers.indexOf(handler) >>> 0, 1);
    }
  }

  public emit<T>(type: string, event: T): void {
    const handlers = this.handlersStore.get(type);

    if (handlers) {
      handlers.slice().forEach((handler) => {
        handler(event);
      });
    }
  }
}
