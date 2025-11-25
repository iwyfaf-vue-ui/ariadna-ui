import { computed, type ModelRef } from 'vue';
import type { TUseSelectMultipleCheckboxReturn } from './useSelectMultipleCheckbox.types';
import type { TSelectMultipleProps } from '../../SelectMultiple';

export default function useSelectMultipleCheckbox(
  vModel: ModelRef<
    TSelectMultipleProps['modelValue'],
    string,
    TSelectMultipleProps['modelValue'],
    TSelectMultipleProps['modelValue']
  >,
  props: TSelectMultipleProps,
): TUseSelectMultipleCheckboxReturn {
  const multiselectCheckboxChecked = computed(() => (vModel.value.length || 0) > 0);

  function onChangeMultiselectCheckbox(): void {
    if (vModel.value.length > 0) {
      vModel.value = [];
      return;
    }

    vModel.value = props.options.map((option) =>
      props.optionValue ? option[props.optionValue] : option,
    );
  }

  return {
    multiselectCheckboxChecked,
    onChangeMultiselectCheckbox,
  };
}
