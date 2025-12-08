import { computed, type ModelRef } from 'vue';
import type { TUseSelectMultipleFlatCheckboxReturn } from './useSelectMultipleFlatCheckbox.types';
import type { TSelectMultipleFlatProps } from '../../SelectMultipleFlat';

export default function useSelectMultipleFlatCheckbox(
  vModel: ModelRef<
    TSelectMultipleFlatProps['modelValue'],
    string,
    TSelectMultipleFlatProps['modelValue'],
    TSelectMultipleFlatProps['modelValue']
  >,
  props: TSelectMultipleFlatProps,
): TUseSelectMultipleFlatCheckboxReturn {
  const multiselectCheckboxChecked = computed(() => (vModel.value.length || 0) > 0);

  function onChangeMultiselectCheckbox(): void {
    if (vModel.value.length > 0) {
      vModel.value = [];
      return;
    }

    vModel.value = props.options.map((option) => option);
  }

  return {
    multiselectCheckboxChecked,
    onChangeMultiselectCheckbox,
  };
}
