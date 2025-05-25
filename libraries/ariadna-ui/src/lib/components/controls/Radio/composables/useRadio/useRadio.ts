import { computed, type ModelRef, ref, useId } from 'vue';
import type { TRadioEmits, TRadioProps } from '../../Radio';
import type { TUseRadioReturn } from './useRadio.types';

export default function useRadio(
  props: TRadioProps,
  emits: TRadioEmits,
  vModel: ModelRef<any, string, any, any>,
): TUseRadioReturn {
  const id = useId();
  const focused = ref(false);
  const hovered = ref(false);

  const uniqueID = computed(() => props.id || id);

  function updateModel() {
    vModel.value = props.value;

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
    const checked = props.value === vModel.value ? `${base}--checked` : undefined;
    const disable = props.disabled ? `${base}--disabled` : undefined;
    const valid = props.valid ? `${base}--valid` : undefined;
    const invalid = props.invalid ? `${base}--invalid` : undefined;
    const modifier = props.modifier ? `${base}--${props.modifier}` : undefined;

    return [base, theme, size, position, focus, hover, checked, valid, invalid, disable, modifier]
      .filter(Boolean)
      .join(' ');
  });

  return {
    uniqueID,
    componentClasses,
    updateModel,
    onFocus,
    onBlur,
    onChange,
    onMouseOver,
    onMouseLeave,
  };
}
