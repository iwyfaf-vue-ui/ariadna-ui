import { computed, type ModelRef, ref, type Ref } from 'vue';
import type { TUseSelectMultipleActionsReturn } from './useSelectMultipleActions.types';
import type { TSelectMultipleProps } from '../../SelectMultiple';
import { deepEqual } from '@/shared/utils/comparisons/deep-equal/deep-equal.utils';

export default function useSelectMultipleActions(
  props: TSelectMultipleProps,
  vModel: ModelRef<
    TSelectMultipleProps['modelValue'],
    string,
    TSelectMultipleProps['modelValue'],
    TSelectMultipleProps['modelValue']
  >,
  calculate: () => void,
  opened: Ref<boolean, boolean>,
): TUseSelectMultipleActionsReturn {
  const optionLabel = ref<string>(props.optionLabel!);

  const hideCleanButton = computed(() => !vModel.value || vModel.value.length === 0);

  const selectedOptions = computed(() =>
    props.optionValue
      ? props.options.filter((option) =>
          vModel.value.some((modelItem) => deepEqual(option[props.optionValue || ''], modelItem)),
        )
      : vModel.value,
  );

  const generatedLabel = computed(() => {
    if (!vModel || !Array.isArray(vModel.value) || vModel.value.length === 0) {
      return '';
    }

    if (props.maxSelectedLabels && selectedOptions.value.length > props.maxSelectedLabels) {
      if (props.selectedItemsLabel) {
        return props.selectedItemsLabel.replace('{0}', String(selectedOptions.value.length));
      }

      return `${selectedOptions.value.length} items selected`;
    }

    return selectedOptions.value.map((option) => option[optionLabel.value]).join(', ');
  });

  const showGeneratedLabel = computed(() => {
    if (!props.maxSelectedLabels) {
      return true;
    }

    return selectedOptions.value.length - 1 < props.maxSelectedLabels;
  });

  function removeLabel(option: TSelectMultipleProps['options'][0]) {
    const newOption = props.optionValue ? option[props.optionValue] : option;

    vModel.value = vModel.value.filter((item) => !deepEqual(item, newOption));
  }

  function selectOptionHandler(option: TSelectMultipleProps['options'][0]) {
    const newValue = props.optionValue ? option[props.optionValue] : option;

    if (vModel.value.some((item) => deepEqual(item, newValue))) {
      removeLabel(option);
      return;
    }

    vModel.value = [...vModel.value, newValue];
  }

  function cleanSelectedData(event: Event): void {
    event.stopPropagation();
    vModel.value = [];
  }

  function toggleDropdownHandler(): void {
    if (props.disabled) {
      return;
    }

    calculate();
    opened.value = !opened.value;
  }

  function closeDropdownHandler(): void {
    if (props.disabled) {
      return;
    }

    opened.value = false;
  }

  function onClickItem(item: TSelectMultipleProps['options'][0]) {
    selectOptionHandler(item);
  }

  const isSelected = computed(() => {
    return (option: Record<string, any>): boolean => {
      const optionValue = props.optionValue ? option[props.optionValue] : option;
      return vModel.value.some((item) => deepEqual(item, optionValue));
    };
  });

  return {
    selectedOptions,
    generatedLabel,
    showGeneratedLabel,
    hideCleanButton,
    removeLabel,
    selectOptionHandler,
    cleanSelectedData,
    toggleDropdownHandler,
    closeDropdownHandler,
    onClickItem,
    isSelected,
  };
}
