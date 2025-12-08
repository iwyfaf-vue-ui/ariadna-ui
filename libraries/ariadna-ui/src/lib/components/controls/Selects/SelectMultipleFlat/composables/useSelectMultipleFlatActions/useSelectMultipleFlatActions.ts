import { computed, type ModelRef, type Ref } from 'vue';
import type { TUseSelectMultipleFlatActionsReturn } from './useSelectMultipleFlatActions.types';
import type { TSelectMultipleFlatProps } from '../../SelectMultipleFlat';
import { deepEqual } from '@/shared/utils/comparisons/deep-equal/deep-equal.utils';
import type { Primitive } from '@/types';

export default function useSelectMultipleFlatActions(
  props: TSelectMultipleFlatProps,
  vModel: ModelRef<
    TSelectMultipleFlatProps['modelValue'],
    string,
    TSelectMultipleFlatProps['modelValue'],
    TSelectMultipleFlatProps['modelValue']
  >,
  calculate: () => void,
  opened: Ref<boolean, boolean>,
): TUseSelectMultipleFlatActionsReturn {
  const hideCleanButton = computed(() => !vModel.value || vModel.value.length === 0);

  const selectedOptions = computed(() =>
    props.options.filter((option) =>
      vModel.value.some((modelItem) => deepEqual(option, modelItem)),
    ),
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

    return vModel.value.join(', ');
  });

  const showGeneratedLabel = computed(() => {
    if (!props.maxSelectedLabels) {
      return true;
    }

    return selectedOptions.value.length - 1 < props.maxSelectedLabels;
  });

  function removeLabel(option: Primitive) {
    vModel.value = vModel.value.filter((item) => !deepEqual(item, option));
  }

  function selectOptionHandler(option: TSelectMultipleFlatProps['options'][0]) {
    if (vModel.value.some((item) => deepEqual(item, option))) {
      removeLabel(option);
      return;
    }

    vModel.value = [...vModel.value, option];
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

  function onClickItem(item: TSelectMultipleFlatProps['options'][0]) {
    selectOptionHandler(item);
  }

  const isSelected = computed(() => {
    return (option: Primitive): boolean => {
      return vModel.value.some((item) => deepEqual(item, option));
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
