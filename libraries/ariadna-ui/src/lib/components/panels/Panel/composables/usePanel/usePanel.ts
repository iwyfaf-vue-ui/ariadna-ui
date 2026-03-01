import { computed, ref } from 'vue';
import type { TUsePanelReturn } from './usePanel.types';
import type { TPanelProps } from '../../Panel';

export default function usePanel(props: TPanelProps): TUsePanelReturn {
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
