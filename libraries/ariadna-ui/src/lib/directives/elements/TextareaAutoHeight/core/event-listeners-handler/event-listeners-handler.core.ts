const EVENTS: Array<keyof HTMLElementEventMap> = [
  'click',
  'input',
  'change',
  'cut',
  'paste',
  'drop',
];

/**
 * Adds or removes a set of common event listeners to a given textarea element.
 *
 * @description
 * This utility function attaches or detaches a predefined list of event listeners
 * (`click`, `input`, `change`, `cut`, `paste`, `drop`) to the specified HTMLTextAreaElement.
 *
 * @param textarea - The textarea element to which the event listeners will be added or removed.
 * @param handler - The event handler function to be attached or detached.
 * @param action - Specifies whether to 'add' or 'remove' the event listeners.
 */
export default function handleEventListeners(
  textarea: HTMLTextAreaElement,
  handler: EventListener,
  action: 'add' | 'remove',
) {
  EVENTS.forEach((event) => textarea[`${action}EventListener`](event, handler));
}
