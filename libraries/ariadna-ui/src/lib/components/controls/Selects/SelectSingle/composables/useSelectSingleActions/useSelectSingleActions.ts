import { computed, type ModelRef, type Ref, ref } from 'vue';
import type { TUseSelectSingleActionsReturn } from './useSelectSingleActions.types';
import type { TSelectSingleProps } from '../../SelectSingle';
import { deepEqual } from '@/shared/utils/comparisons/deep-equal/deep-equal.utils';

export default function useSelectSingleActions(
  props: TSelectSingleProps,
  vModel: ModelRef<any, string, any, any>,
  calculate: () => void,
  opened: Ref<boolean, boolean>,
): TUseSelectSingleActionsReturn {
  const optionLabel = ref<string>(props.optionLabel!);
  const optionValue = ref<string | null>(props.optionValue!);

  const selectedLabel = computed(
    () =>
      (props.optionValue
        ? props.options.filter((option) => {
            return deepEqual(vModel.value, option[props.optionValue || '']);
          })
        : vModel.value
          ? [vModel.value]
          : []
      )
        ?.map((item: Record<string, any>) => item[optionLabel.value])
        ?.join(', ') ?? '',
  );

  function isSelected(option: Record<string, any>): boolean {
    if (!vModel.value) {
      return false;
    }

    const optionValue = props.optionValue ? option[props.optionValue] : option;
    return deepEqual(vModel.value, optionValue);
  }

  function selectOptionHandler(option: TSelectSingleProps['options']) {
    const newValue = optionValue.value ? option[optionValue.value as keyof typeof option] : option;

    if (deepEqual(vModel.value, newValue)) {
      vModel.value = null;
      return;
    }

    vModel.value = newValue;
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

  function onClickItem(item: TSelectSingleProps['options'][0]) {
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
