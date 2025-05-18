import replaceByIndex from '@/shared/utils/string/replace-char-at-index/replace-char-at-index.utils';

/**
 * Handles the backspace key event for a phone number input field.
 * This function ensures that the phone number format is maintained when the backspace key is pressed.
 *
 * @description
 * This function checks if the backspace key is pressed and performs specific actions based on the current value of the
 * input field. It clears the input if the value is '+7 (' or '+7', and removes specific characters at certain
 * positions to maintain the phone number format.
 *
 * @param {HTMLInputElement} element - The input element where the phone number is being entered.
 * @param {KeyboardEvent} e - The keyboard event object containing information about the key pressed.
 *
 * @example
 * // Assuming an input element with value '+7 (123) 456-78-90'
 * const inputElement = document.querySelector('input');
 * const event = new KeyboardEvent('keydown', { key: 'Backspace' });
 * backspaceHandler(inputElement, event);
 * // The value of inputElement will be modified based on the current length and format.
 */
export default function backspaceHandler(element: HTMLInputElement, e: KeyboardEvent): void {
  if (e.key !== 'Backspace') {
    return;
  }

  if (element.value === '+7 (' || element.value === '+7') {
    element.value = '';
  }

  if (element.value.length === 9) {
    element.value = replaceByIndex(element.value, 7, '').trim();
  }

  if (element.value.length === 13) {
    element.value = replaceByIndex(element.value, 11, '').trim();
  }

  if (element.value.length === 16) {
    element.value = replaceByIndex(element.value, 14, '').trim();
  }
}
