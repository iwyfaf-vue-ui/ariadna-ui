import { type ModelRef, type Ref } from 'vue';
import type { TUseChipsKeyboardReturn } from './useChipsKeyboard.types';
import type { TChipsProps } from '../../Chips';

export default function useChipsKeyboard(
  props: TChipsProps,
  vModel: ModelRef<
    TChipsProps['modelValue'],
    string,
    TChipsProps['modelValue'],
    TChipsProps['modelValue']
  >,
  focusedIdx: Ref<number | null, number | null>,
  addChip: (chip: string) => void,
  removeChip: (idx: number) => void,
  clearChips: (event: Event) => void,
): TUseChipsKeyboardReturn {
  function onInputKeyDown(event: KeyboardEvent) {
    if (!event.target) {
      return;
    }

    const { value } = event.target as HTMLInputElement;

    switch (event.key) {
      case 'Enter':
      case 'NumpadEnter':
        addChip(value);

        break;

      case 'Backspace':
        if (value.length === 0 && vModel.value.length > 0) {
          focusedIdx.value !== null
            ? removeChip(focusedIdx.value)
            : removeChip(vModel.value.length - 1);
        }

        break;
    }
  }

  function onRootWrapperKeyDown(event: KeyboardEvent) {
    if (!event.target) {
      return;
    }

    const { classList } = event.target as HTMLElement;
    const isSpaceKey = event.key === ' ' || event.key === 'Space';

    switch (event.key) {
      case 'ArrowLeft':
        if (vModel.value.length > 0) {
          focusedIdx.value =
            focusedIdx.value === null ? vModel.value.length - 1 : focusedIdx.value - 1;

          if (focusedIdx.value < 0) focusedIdx.value = 0;
        }

        break;

      case 'ArrowRight':
        if (vModel.value.length > 0) {
          focusedIdx.value = focusedIdx.value === null ? 0 : ++focusedIdx.value;

          if (focusedIdx.value > vModel.value.length - 1)
            focusedIdx.value = vModel.value.length - 1;
        }

        break;

      case 'Enter':
      case 'NumpadEnter':
        if (classList.contains(`${props.cssClass}__item-clear`)) {
          return clearChips(event);
        }

        if (vModel.value.length > 0 && focusedIdx.value !== null) {
          removeChip(focusedIdx.value);

          focusedIdx.value = null;
        }

        break;
    }

    if (isSpaceKey) {
      if (classList.contains(`${props.cssClass}__item-clear`)) {
        return clearChips(event);
      }
      if (vModel.value.length > 0 && focusedIdx.value !== null) {
        removeChip(focusedIdx.value);
        focusedIdx.value = null;
      }
    }
  }

  return {
    onInputKeyDown,
    onRootWrapperKeyDown,
  };
}
