/**
 * @description Body CSS class toggle.
 * @param {"add" | "remove"} addRemoveClass
 * @param {string} className
 */
export default function toggleBodyClass(addRemoveClass: 'add' | 'remove', className: string): void {
  if (window) {
    const { body } = document;
    addRemoveClass === 'add' ? body.classList.add(className) : body.classList.remove(className);
  } else {
    useHead({
      bodyAttrs: {
        class: addRemoveClass === 'add' ? className : undefined,
      },
    });
  }
}
