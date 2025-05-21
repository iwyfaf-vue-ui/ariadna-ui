/**
 * Adjusts the height of a given HTMLTextAreaElement to fit its content automatically.
 *
 * @description
 * The function sets the textarea's height to 'auto', calculates the required height based on the scrollHeight and
 * min-height CSS property, and includes the border width in the calculation. This ensures that the textarea expands
 * or shrinks to fit its content without unnecessary scrollbars.
 *
 * @param textareaElement - The HTMLTextAreaElement whose height should be adjusted.
 */
export default function adjustmentTextareaHeight(textareaElement: HTMLTextAreaElement) {
  const minHeight = parseFloat(getComputedStyle(textareaElement).getPropertyValue('min-height'));
  textareaElement.style.setProperty('height', 'auto');

  const border =
    parseFloat(getComputedStyle(textareaElement).getPropertyValue('border-top-width')) * 2;

  textareaElement.style.setProperty(
    'height',
    `${Math.max(textareaElement.scrollHeight < minHeight ? minHeight : textareaElement.scrollHeight) + border}px`,
  );
}
