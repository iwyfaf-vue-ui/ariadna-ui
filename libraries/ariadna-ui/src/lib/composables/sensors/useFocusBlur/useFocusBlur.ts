import { ref } from 'vue';
import type { TUseFocusBlurReturn } from './types/useFocusBlur.types';

export default function useFocusBlur(): TUseFocusBlurReturn {
  const isFocused = ref<boolean>(false);

  function onFocus() {
    isFocused.value = true;
  }

  function onBlur() {
    isFocused.value = false;
  }

  return {
    isFocused,
    onFocus,
    onBlur,
  };
}
