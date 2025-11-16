import type { ComputedRef } from 'vue';
import type { TSelectSingleProps } from '../../SelectSingle';

/**
 * @description
 * Return type for the `useSelectSingleActions` composable function.
 * Contains reactive properties and methods for SelectSingle component functionality.
 */
export type TUseSelectSingleActionsReturn = {
  selectedLabel: ComputedRef<string>;
  isSelected(option: Record<string, any>): boolean;
  selectOptionHandler: (option: TSelectSingleProps['options']) => void;
  toggleDropdownHandler(): void;
  closeDropdownHandler(): void;
  cleanSelectedData(event: Event): void;
  onClickItem(item: any): void;
};
