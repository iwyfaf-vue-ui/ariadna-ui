import { computed, ref, useId } from 'vue';
import type { TUseSelectSingleReturn } from './useSelectSingle.types';
import type { TSelectSingleEmits, TSelectSingleProps } from '../../SelectSingle';

export default function useSelectSingle(
  props: TSelectSingleProps,
  emits: TSelectSingleEmits,
): TUseSelectSingleReturn {
  const id = useId();
  const focused = ref(false);
  const hovered = ref(false);
  const opened = ref(false);

  const uniqueID = computed(() => props.id || id);

  function onFocus(event: Event) {
    focused.value = true;
    emits('focus', event);
  }

  function onBlur(event: Event) {
    focused.value = false;
    emits('blur', event);
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
    const selected = !!props.modelValue ? `${base}--selected` : undefined;
    const open = opened.value ? `${base}--opened` : undefined;
    const disable = props.disabled ? `${base}--disabled` : undefined;
    const valid = props.valid ? `${base}--valid` : undefined;
    const invalid = props.invalid ? `${base}--invalid` : undefined;
    const modifier = props.modifier ? `${base}--${props.modifier}` : undefined;

    return [base, theme, size, focus, hover, selected, open, valid, invalid, disable, modifier]
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
    opened,
    uniqueID,
    listeners,
    componentClasses,
    onExpandEnter,
    onExpandAfterEnter,
    onExpandBeforeLeave,
  };
}
