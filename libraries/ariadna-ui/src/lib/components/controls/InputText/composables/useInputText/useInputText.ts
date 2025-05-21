import { computed, ref, useId } from 'vue';
import type { TUseInputTextReturn } from './useInputText.types';
import type { TInputTextEmits, TInputTextProps, TInputTextSlots } from '../../InputText';

export default function useInputText(
  props: TInputTextProps,
  slots: TInputTextSlots,
  emits: TInputTextEmits,
): TUseInputTextReturn {
  const id = useId();
  const focused = ref(false);
  const hovered = ref(false);

  const uniqueID = computed(() => props.id || id);

  const defaultPlaceholder = computed(() => {
    return !!slots.placeholder ? undefined : props.placeholder;
  });

  function onFocus(event: Event) {
    focused.value = true;
    emits('focus', event);
  }

  function onBlur(event: Event) {
    focused.value = false;
    emits('blur', event);
  }

  function onChange(event: Event) {
    emits('change', event);
  }

  function onMouseOver() {
    hovered.value = true;
  }

  function onMouseLeave() {
    hovered.value = false;
  }

  const listeners = computed(() => {
    return {
      focus: onFocus,
      blur: onBlur,
      change: onChange,
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
    const fill = !!props.modelValue ? `${base}--filled` : undefined;
    const disable = props.disabled ? `${base}--disabled` : undefined;
    const valid = props.valid ? `${base}--valid` : undefined;
    const invalid = props.invalid ? `${base}--invalid` : undefined;
    const modifier = props.modifier ? `${base}--${props.modifier}` : undefined;

    return [base, theme, size, focus, hover, fill, valid, invalid, disable, modifier]
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
    uniqueID,
    defaultPlaceholder,
    listeners,
    componentClasses,
    onExpandEnter,
    onExpandAfterEnter,
    onExpandBeforeLeave,
  };
}
