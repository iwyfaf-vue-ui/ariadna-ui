/**
 * Clones an HTML input element clone.
 *
 * @description This function is used to create a clone of an existing HTML input element.
 *
 * @param {HTMLInputElement} input - The input element to clone.
 *
 * @returns {HTMLInputElement} - The cloned HTML input element.
 *
 * @example
 * // Clone an existing input element
 * const originalInput = document.querySelector('input');
 * const clonedInput = inputCloneCore(originalInput);
 */
export default function inputCloneCore(input: HTMLInputElement): HTMLInputElement {
  const clonedInput = input.cloneNode() as HTMLInputElement;

  clonedInput.setAttribute('id', !!input.id ? input.id + '-cloned' : '-cloned');
  clonedInput.setAttribute(
    'class',
    input.classList.value ? input.classList.value + '-cloned' : '-cloned',
  );
  clonedInput.setAttribute('placeholder', input.placeholder);
  clonedInput.setAttribute('aria-hidden', 'true');
  clonedInput.setAttribute('disabled', 'true');
  clonedInput.setAttribute('readonly', 'true');

  input.insertAdjacentElement('beforebegin', clonedInput);

  return clonedInput;
}
