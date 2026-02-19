import { computed, ref } from 'vue';
import type { TUseHeaderReturn } from './useHeader.types';
import type { THeaderProps } from '../../Header';

export default function useHeader(props: THeaderProps): TUseHeaderReturn {
  const hovered = ref(false);

  function onMouseOver() {
    hovered.value = true;
  }

  function onMouseLeave() {
    hovered.value = false;
  }

  const listeners = computed(() => {
    return {
      mouseover: onMouseOver,
      mouseleave: onMouseLeave,
    };
  });

  const componentClasses = computed(() => {
    const base = props.cssClass;

    const theme = `${base}--theme`;
    const hover = hovered.value ? `${base}--hovered` : undefined;
    const modifier = props.modifier ? `${base}--${props.modifier}` : undefined;

    return [base, theme, hover, modifier].filter(Boolean).join(' ');
  });

  return {
    listeners,
    componentClasses,
  };
}
