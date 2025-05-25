import { computed, type ModelRef, ref, useId } from 'vue';
import type { TCheckboxEmits, TCheckboxProps } from '../../Checkbox';
import type { TUseCheckboxReturn } from './useCheckbox.types';

export default function useCheckbox(
  props: TCheckboxProps,
  emits: TCheckboxEmits,
  vModel: ModelRef<boolean | undefined, string, boolean | undefined, boolean | undefined>,
): TUseCheckboxReturn {
  const id = useId();
  const focused = ref(false);
  const hovered = ref(false);

  const uniqueID = computed(() => props.id || id);

  function toggleModel() {
    vModel.value = !vModel.value;

    emits('update:model-value', vModel.value);
  }

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

  const componentClasses = computed(() => {
    const base = props.cssClass;

    const theme = `${base}--theme`;
    const size = props.size ? `${base}--${props.size}` : undefined;
    const position = props.position ? `${base}--${props.position}` : undefined;
    const focus = focused.value ? `${base}--focused` : undefined;
    const hover = hovered.value && !focused.value ? `${base}--hovered` : undefined;
    const checked = props.modelValue ? `${base}--checked` : undefined;
    const disable = props.disabled ? `${base}--disabled` : undefined;
    const valid = props.valid ? `${base}--valid` : undefined;
    const invalid = props.invalid ? `${base}--invalid` : undefined;
    const modifier = props.modifier ? `${base}--${props.modifier}` : undefined;

    return [base, theme, size, position, focus, hover, checked, valid, invalid, disable, modifier]
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
    componentClasses,
    toggleModel,
    onFocus,
    onBlur,
    onChange,
    onMouseOver,
    onMouseLeave,
    onExpandEnter,
    onExpandAfterEnter,
    onExpandBeforeLeave,
  };
}
