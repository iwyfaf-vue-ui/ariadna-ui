import { computed, type ModelRef, ref, type Ref } from 'vue';
import type { TUseSelectMultipleGroupActionsReturn } from './useSelectMultipleGroupActions.types';
import type { TSelectMultipleGroupProps } from '../../SelectMultipleGroup';
import { deepEqual } from '@/shared/utils/comparisons/deep-equal/deep-equal.utils';

export default function useSelectMultipleGroupActions(
  props: TSelectMultipleGroupProps,
  vModel: ModelRef<
    TSelectMultipleGroupProps['modelValue'],
    string,
    TSelectMultipleGroupProps['modelValue'],
    TSelectMultipleGroupProps['modelValue']
  >,
  calculate: () => void,
  opened: Ref<boolean, boolean>,
): TUseSelectMultipleGroupActionsReturn {
  const optionLabel = ref<string>(props.optionLabel!);
  const optionValue = ref<string | null>(props.optionValue!);
  const optionGroupChildren = ref<string>(props.optionGroupChildren!);

  const hideCleanButton = computed(() => !vModel.value || vModel.value.length === 0);

  const selectedOptions = computed(() => {
    if (props.optionValue) {
      const foundItems = [];

      for (const group of props.options) {
        const groupChildren = group[optionGroupChildren.value];

        if (Array.isArray(groupChildren)) {
          const matchingChildren = groupChildren.filter((child: any) =>
            vModel.value.some((modelItem: any) =>
              deepEqual(child[props.optionValue || ''], modelItem),
            ),
          );

          foundItems.push(...matchingChildren);
        }
      }

      return foundItems;
    } else {
      return Array.isArray(vModel.value) ? vModel.value : [];
    }
  });

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

    return selectedOptions.value.map((option: any) => option[optionLabel.value]).join(', ');
  });

  const showGeneratedLabel = computed(() => {
    if (!props.maxSelectedLabels) {
      return true;
    }

    return selectedOptions.value.length - 1 < props.maxSelectedLabels;
  });

  function removeLabel(option: TSelectMultipleGroupProps['options'][0]) {
    const newOption = props.optionValue ? option[props.optionValue] : option;

    vModel.value = vModel.value.filter((item) => !deepEqual(item, newOption));
  }

  function selectGroupOptionHandler(option: TSelectMultipleGroupProps['options'][0]) {
    const newValue = optionValue.value ? option[optionValue.value as keyof typeof option] : option;

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

  function onClickItem(item: TSelectMultipleGroupProps['options'][0]) {
    selectGroupOptionHandler(item);
  }

  const selectedOptionsMap = computed(() => {
    const map = new Map<TSelectMultipleGroupProps['options'][0], boolean>();

    for (const group of props.options) {
      const groupChildren = group[optionGroupChildren.value];

      if (Array.isArray(groupChildren)) {
        for (const option of groupChildren) {
          const optionVal = props.optionValue ? option[props.optionValue] : option;

          const isSelected = vModel.value.some((item) => deepEqual(item, optionVal));

          map.set(option, isSelected);
        }
      }
    }

    return map;
  });

  return {
    selectedOptions,
    generatedLabel,
    showGeneratedLabel,
    hideCleanButton,
    removeLabel,
    selectGroupOptionHandler,
    cleanSelectedData,
    toggleDropdownHandler,
    closeDropdownHandler,
    onClickItem,
    selectedOptionsMap,
  };
}
