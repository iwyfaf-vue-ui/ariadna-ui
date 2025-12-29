import { computed, ref, useId } from 'vue';
import type { TUseChipsReturn } from './useChips.types';
import type { TChipsProps, TChipsEmits } from '../../Chips';

export default function useChips(props: TChipsProps, emits: TChipsEmits): TUseChipsReturn {
  const id = useId();
  const focused = ref(false);
  const hovered = ref(false);
  const focusedIdx = ref<number | null>(null);

  const uniqueID = computed(() => props.id || id);

  function onFocus(event: Event) {
    focused.value = true;
    focusedIdx.value = null;
    emits('focus', event);
  }

  function onBlur(event: Event) {
    focused.value = false;
    focusedIdx.value = null;
    emits('blur', event);
  }

  function onMouseOver() {
    hovered.value = true;
  }

  function onMouseLeave() {
    hovered.value = false;
  }

  function onInput() {
    focusedIdx.value = null;
  }

  const listeners = computed(() => {
    return {
      input: onInput,
      focus: onFocus,
      blur: onBlur,
      mouseover: onMouseOver,
      mouseleave: onMouseLeave,
    };
  });

  const componentClasses = computed(() => {
    const base = props.cssClass;

    const theme = `${base}--theme`;
    const size = props.size ? `${base}--${props.size}` : undefined;
    const focus = focused.value ? `${base}--focused` : undefined;
    const hover = hovered.value && !focused.value ? `${base}--hovered` : undefined;
    const selected =
      props.modelValue && props.modelValue.length > 0 ? `${base}--selected` : undefined;
    const disable = props.disabled ? `${base}--disabled` : undefined;
    const valid = props.valid ? `${base}--valid` : undefined;
    const invalid = props.invalid ? `${base}--invalid` : undefined;
    const modifier = props.modifier ? `${base}--${props.modifier}` : undefined;

    return [base, theme, size, focus, hover, selected, valid, invalid, disable, modifier]
      .filter(Boolean)
      .join(' ');
  });

  function onExpandEnter(el: Element) {
    const htmlElement = el as HTMLElement;

    htmlElement.style.height = el.scrollHeight + 'px';
  }

  function onExpandAfterEnter(el: Element) {
    const htmlElement = el as HTMLElement;

    htmlElement.style.height = 'auto';
  }

  function onExpandBeforeLeave(el: Element) {
    const htmlElement = el as HTMLElement;

    htmlElement.style.height = htmlElement.scrollHeight + 'px';
  }

  return {
    focusedIdx,
    uniqueID,
    listeners,
    componentClasses,
    onExpandEnter,
    onExpandAfterEnter,
    onExpandBeforeLeave,
  };
}
