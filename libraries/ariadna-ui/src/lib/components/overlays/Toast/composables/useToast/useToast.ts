import { computed, ref } from 'vue';
import type { TUseToastReturn } from './useToast.types';
import type { TToastProps } from '../../Toast';

export default function useToast(props: TToastProps): TUseToastReturn {
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
    const positionY = `${base}--y-${props.positionY}`;
    const positionX = `${base}--x-${props.positionX}`;

    return [base, theme, hover, positionY, positionX].filter(Boolean).join(' ');
  });

  return {
    hovered,
    listeners,
    componentClasses,
  };
}
