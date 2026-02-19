import type { ComputedRef } from 'vue';

/**
 * @description
 * Return type for the `useHeaderScroll` composable function.
 * Contains reactive properties and methods for Header component functionality.
 */
export type TUseHeaderScrollReturn = {
  scrollClasses: ComputedRef<string>;
};
