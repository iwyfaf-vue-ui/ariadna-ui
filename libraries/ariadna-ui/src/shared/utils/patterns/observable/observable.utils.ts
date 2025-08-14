/**
 * A callback function that is invoked when the observable emits new data.
 *
 * @param data - The data emitted by the observable.
 */
type ObserverCallback<T> = (data: T) => void;

/**
 * Implements the Observable pattern, allowing observers to subscribe to and receive notifications when data changes.
 * Observers can register and unregister their callbacks, and all registered observers are notified when new data is
 * emitted.
 *
 * @template T - The type of data that the observable emits.
 */
export default class Observable<T> {
  private observers: Set<ObserverCallback<T>> = new Set<ObserverCallback<T>>();

  /**
   * Registers an observer callback to be notified when data is emitted.
   *
   * @param {ObserverCallback<T>} callback - The observer callback to register.
   *
   * @returns void
   *
   * @example
   * observable.observe((data) => console.log(data));
   */
  observe(callback: ObserverCallback<T>): void {
    if (this.observers.has(callback)) {
      return;
    }

    this.observers.add(callback);
  }

  /**
   * Unregisters a previously registered observer callback.
   *
   * @param {ObserverCallback<T>} callback - The observer callback to remove.
   *
   * @returns void
   *
   * @example
   * observable.unobserve(callback);
   */
  unobserve(callback: ObserverCallback<T>): void {
    this.observers.delete(callback);
  }

  /**
   * Notifies all registered observers with the provided data.
   *
   * @param {T} data - The data to emit to all observers.
   *
   * @returns void
   *
   * @example
   * observable.notify(100);
   */
  notify(data: T): void {
    this.observers.forEach((callback) => callback(data));
  }
}
