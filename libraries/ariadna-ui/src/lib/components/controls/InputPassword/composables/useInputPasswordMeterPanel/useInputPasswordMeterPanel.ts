import { computed, ref } from 'vue';
import type { ShallowRef } from 'vue';
import type { TUseInputPasswordMeterPanelReturn } from './useInputPasswordMeterPanel.types';
import type { TInputPasswordProps } from '../../InputPassword';
import usePosition, {
  usePositionDefaultOptions,
} from '@/lib/composables/elements/usePosition/usePosition';
import { EUsePosition } from '@/lib/composables/elements/usePosition/types/usePosition.enums';

export default function useInputPasswordMeterPanel(
  props: TInputPasswordProps,
  inputPasswordRef: Readonly<ShallowRef<HTMLDivElement | null>>,
  meterPanelRef: Readonly<ShallowRef<HTMLDivElement | null>>,
): TUseInputPasswordMeterPanelReturn {
  const showMeterPanel = ref<boolean>(false);

  const { calculate, cssClass } = usePosition(inputPasswordRef, meterPanelRef, {
    ...usePositionDefaultOptions,
    positionOrder: [EUsePosition.BOTTOM, EUsePosition.TOP],
  });

  function openMeterPanel() {
    if (!(props.modelValue && props.modelValue.length > 0)) {
      return;
    }

    showMeterPanel.value = true;
    calculate();
    window.addEventListener('keydown', handleKeydown);
  }

  function closeMeterPanel() {
    showMeterPanel.value = false;
    window.removeEventListener('keydown', handleKeydown);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closeMeterPanel();
    }
  }

  const meterPanelClasses = computed(() => ({
    [`${props.cssClass}__meter-panel`]: true,
    [`${props.cssClass}__meter-panel--${cssClass.value}`]: true,
    [`${props.cssClass}__meter-panel--visible`]: showMeterPanel.value,
  }));

  return {
    openMeterPanel,
    closeMeterPanel,
    meterPanelClasses,
  };
}
