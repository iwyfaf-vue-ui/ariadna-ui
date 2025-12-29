/**
 * @description
 * Return type for the `useChipsControls` composable function.
 * Contains reactive properties and methods for Chips component functionality.
 */
export type TUseChipsControlsReturn = {
  /**
   * Adds a new chip to the collection.
   *
   * @param {string} chip - The text content of the chip to be added.
   */
  addChip: (chip: string) => void;

  /**
   * Removes a chip from the collection by its index.
   *
   * @param {number} idx - The zero-based index of the chip to remove.
   */
  removeChip: (idx: number) => void;

  /**
   * Clears all chips from the collection.
   *
   * @param {Event} event - The event that triggered the clear action.
   */
  clearChips: (event: Event) => void;
};
