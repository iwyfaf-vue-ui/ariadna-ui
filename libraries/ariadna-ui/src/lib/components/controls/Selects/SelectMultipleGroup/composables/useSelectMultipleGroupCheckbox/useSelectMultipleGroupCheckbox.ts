import { computed, type ModelRef, ref } from 'vue';
import type { TUseSelectMultipleGroupCheckboxReturn } from './useSelectMultipleGroupCheckbox.types';
import type { TSelectMultipleGroupProps } from '../../SelectMultipleGroup';

export default function useSelectMultipleGroupCheckbox(
  vModel: ModelRef<
    TSelectMultipleGroupProps['modelValue'],
    string,
    TSelectMultipleGroupProps['modelValue'],
    TSelectMultipleGroupProps['modelValue']
  >,
  props: TSelectMultipleGroupProps,
): TUseSelectMultipleGroupCheckboxReturn {
  const optionGroupChildren = ref<string>(props.optionGroupChildren!);

  const multiselectCheckboxChecked = computed(() => (vModel.value.length || 0) > 0);

  function onChangeMultiselectCheckbox(): void {
    if (vModel.value.length > 0) {
      vModel.value = [];
      return;
    }

    vModel.value = props.options.flatMap((option) =>
      option[optionGroupChildren.value].map((option: Record<string, any>) =>
        props.optionValue ? option[props.optionValue] : option,
      ),
    );
  }

  return {
    multiselectCheckboxChecked,
    onChangeMultiselectCheckbox,
  };
}
