import { computed, type ModelRef, type Ref, ref } from 'vue';
import type { TUseSelectSingleGroupActionsReturn } from './useSelectSingleGroupActions.types';
import type { TSelectSingleGroupProps } from '../../SelectSingleGroup';
import { deepEqual } from '@/shared/utils/comparisons/deep-equal/deep-equal.utils';

export default function useSelectSingleActions(
  props: TSelectSingleGroupProps,
  vModel: ModelRef<any, string, any, any>,
  calculate: () => void,
  opened: Ref<boolean, boolean>,
): TUseSelectSingleGroupActionsReturn {
  const optionLabel = ref<string>(props.optionLabel!);
  const optionValue = ref<string | null>(props.optionValue!);
  const optionGroupChildren = ref<string>(props.optionGroupChildren!);

  const selectedLabel = computed(() => {
    if (props.optionValue) {
      for (const group of props.options) {
        const foundItem = group[optionGroupChildren.value]?.find((child: any) =>
          deepEqual(vModel.value, child[props.optionValue || '']),
        );
        if (foundItem) {
          return foundItem[optionLabel.value] ?? '';
        }
      }
      return '';
    } else {
      return vModel.value
        ? (Array.isArray(vModel.value) ? vModel.value : [vModel.value])
            .map((item: Record<string, any>) => item[optionLabel.value])
            .filter(Boolean)
            .join(', ') || ''
        : '';
    }
  });

  function isSelected(option: Record<string, any>): boolean {
    if (!vModel.value) {
      return false;
    }

    const optionValue = props.optionValue ? option[props.optionValue] : option;
    return deepEqual(vModel.value, optionValue);
  }

  function selectGroupOptionHandler(option: TSelectSingleGroupProps['options']) {
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

  function onClickItem(item: TSelectSingleGroupProps['options'][0]) {
    selectGroupOptionHandler(item);
    closeDropdownHandler();
  }

  return {
    selectedLabel,
    isSelected,
    selectGroupOptionHandler,
    toggleDropdownHandler,
    closeDropdownHandler,
    cleanSelectedData,
    onClickItem,
  };
}
