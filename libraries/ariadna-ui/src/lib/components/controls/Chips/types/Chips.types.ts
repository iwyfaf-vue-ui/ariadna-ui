/**
 * Represents the payload emitted when a new chip is added.
 */
export type TChipsEmitAddPayload = {
  /**
   * The string value of the newly added chip. Contains the actual text/content of the chip that was added.
   */
  value: string;
};

/**
 * Represents the payload emitted when a chip is removed.
 */
export type TChipsEmitRemovePayload = {
  /**
   * The index position of the removed chip in the chips array. Indicates the position where the chip was located
   * before removal.
   */
  idx: number;

  /**
   * The string value of the removed chip. Contains the actual text/content of the chip that was removed.
   */
  value: string;
};
