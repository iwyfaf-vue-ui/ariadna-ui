import type { TUseButtonReturn } from './useButton.types';
import type { TButtonEmits, TButtonProps, TButtonSlots } from '../../Button';
import { computed } from 'vue';

export default function useButton(
  props: TButtonProps,
  emits: TButtonEmits,
  slots: TButtonSlots,
): TUseButtonReturn {
  const isDisabled = computed(() => props.disabled || props.loading);

  const componentClasses = computed(() => {
    const base = props.cssClass;

    const theme = `${base}--theme`;
    const size = props.size ? `${base}--${props.size}` : undefined;
    const iconPosition = props.iconPosition ? `${base}--icon-${props.iconPosition}` : undefined;
    const rounded = props.rounded ? `${base}--rounded` : undefined;
    const textual = props.textual ? `${base}--textual` : undefined;
    const outlined = props.outlined ? `${base}--outlined` : undefined;
    const selected = props.selected ? `${base}--selected` : undefined;
    const disabled = isDisabled.value ? `${base}--disabled` : undefined;
    const loading = props.loading ? `${base}--loading` : undefined;
    const modifier = props.modifier ? `${base}--${props.modifier}` : undefined;
    const iconOnly = slots?.icon && !slots?.default ? `${base}--icon-only` : undefined;

    return [
      base,
      theme,
      size,
      iconPosition,
      rounded,
      textual,
      outlined,
      selected,
      disabled,
      loading,
      modifier,
      iconOnly,
    ]
      .filter(Boolean)
      .join(' ');
  });

  const clickHandler = (event: MouseEvent) => {
    if (!isDisabled.value) {
      emits('click', event);
    }
  };

  return {
    isDisabled,
    componentClasses,
    clickHandler,
  };
}
