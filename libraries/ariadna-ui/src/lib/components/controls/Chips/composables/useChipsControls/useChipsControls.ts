import { type ModelRef, type Ref } from 'vue';
import type { TUseChipsControlsReturn } from './useChipsControls.types';
import type { TChipsProps, TChipsEmits } from '../../Chips';
import InputText from '@/lib/components/controls/InputText/InputText.vue';

export default function useChipsControls(
  props: TChipsProps,
  emits: TChipsEmits,
  vModel: ModelRef<
    TChipsProps['modelValue'],
    string,
    TChipsProps['modelValue'],
    TChipsProps['modelValue']
  >,
  inputTextRef: Ref<InstanceType<typeof InputText> | null>,
  writableModel: ModelRef<string | undefined, string, string | undefined, string | undefined>,
): TUseChipsControlsReturn {
  function addChip(chip: string) {
    if (props.disabled) {
      return;
    }

    if (chip.trim().length) {
      const values = [...vModel.value];
      values.push(chip);

      vModel.value = values;

      emits('add', { value: chip });

      if (!inputTextRef.value) {
        return;
      }

      writableModel.value = '';
    }
  }

  function removeChip(idx: number) {
    if (props.disabled) {
      return;
    }

    let values = [...vModel.value];
    const removedItem = values.splice(idx, 1);

    vModel.value = values;

    emits('remove', {
      idx,
      value: removedItem[0],
    });
  }

  function clearChips(event: Event) {
    if (props.disabled) {
      return;
    }

    vModel.value = [];
    emits('clear', event);
  }

  return {
    addChip,
    removeChip,
    clearChips,
  };
}
