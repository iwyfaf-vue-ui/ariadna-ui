import { computed, type ModelRef, type Ref } from 'vue';
import type { TUseSelectSingleFlatActionsReturn } from './useSelectSingleFlatActions.types';
import type { TSelectSingleFlatProps } from '../../SelectSingleFlat';
import { deepEqual } from '@/shared/utils/comparisons/deep-equal/deep-equal.utils';
import type { Primitive } from '@/types';

export default function useSelectSingleFlatActions(
  props: TSelectSingleFlatProps,
  vModel: ModelRef<any, string, any, any>,
  calculate: () => void,
  opened: Ref<boolean, boolean>,
): TUseSelectSingleFlatActionsReturn {
  const selectedLabel = computed(() => {
    if (!vModel.value) {
      return '';
    }

    const selectedOption = props.options.find((option) => deepEqual(vModel.value, option));

    return selectedOption?.toString() ?? '';
  });

  function isSelected(option: Primitive): boolean {
    if (!vModel.value) {
      return false;
    }

    return deepEqual(vModel.value, option);
  }

  function selectOptionHandler(option: TSelectSingleFlatProps['options'][0]) {
    if (deepEqual(vModel.value, option)) {
      vModel.value = null;
      return;
    }

    vModel.value = option;
  }

  function toggleDropdownHandler(): void {
    if (props.disabled) {
      return;
    }

    calculate();
    opened.value = !opened.value;
  }

  function closeDropdownHandler(): void {
    if (props.disabled) return;

    opened.value = false;
  }

  function cleanSelectedData(event: Event): void {
    event.stopPropagation();
    vModel.value = null;
  }

  function onClickItem(item: TSelectSingleFlatProps['options'][0]) {
    selectOptionHandler(item);
    closeDropdownHandler();
  }

  return {
    selectedLabel,
    isSelected,
    selectOptionHandler,
    toggleDropdownHandler,
    closeDropdownHandler,
    cleanSelectedData,
    onClickItem,
  };
}
