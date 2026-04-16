import { computed, nextTick, provide, ref } from 'vue';
import type { Ref } from 'vue';
import type { TUseDropdownMenuReturn } from './useDropdownMenu.types';
import type {
  TDropdownMenuEmits,
  TDropdownMenuProps,
  TDropdownMenuSlots,
} from '../../DropdownMenu';
import { DropdownMenuProviderKey } from '../../providers/DropdownMenu.provider';
import usePosition, {
  usePositionDefaultOptions,
} from '@/lib/composables/elements/usePosition/usePosition';
import { EUsePosition } from '@/lib/composables/elements/usePosition/types/usePosition.enums';

/**
 * Composable for the root `DropdownMenu` component.
 * Manages open/close state, vertical flip detection, CSS classes and keyboard/outside-click handlers.
 * Sets up the provider for all descendant components.
 */
export default function useDropdownMenu(
  props: TDropdownMenuProps,
  emits: TDropdownMenuEmits,
  slots: TDropdownMenuSlots,
  activatorRef: Ref<HTMLElement | null>,
  listRef: Ref<HTMLElement | null>,
): TUseDropdownMenuReturn {
  const isOpen = ref(false);

  const { calculate, cssClass, secondaryCssClass } = usePosition(activatorRef, listRef, {
    ...usePositionDefaultOptions,
    positionOrder: [EUsePosition.BOTTOM, EUsePosition.TOP],
  });

  async function open() {
    if (props.disabled || isOpen.value) {
      return;
    }

    isOpen.value = true;
    emits('show');

    await nextTick();
    calculate();
  }

  function close() {
    if (!isOpen.value) {
      return;
    }

    isOpen.value = false;
    emits('hide');
  }

  function toggle() {
    isOpen.value ? close() : open();
  }

  function closeOnClickOutside() {
    if (!props.closeOnClickOutside) {
      return;
    }
    close();
  }

  function closeOnEscKey(event: KeyboardEvent) {
    if (props.closeOnEscape && (event.key === 'Escape' || event.key === 'Esc')) {
      close();
    }
  }

  const componentClasses = computed(() => {
    const base = props.cssClass!;

    const theme = `${base}--theme`;
    const openMod = isOpen.value ? `${base}--open` : undefined;
    const disabled = props.disabled ? `${base}--disabled` : undefined;

    return [base, theme, openMod, disabled].filter(Boolean).join(' ');
  });

  const direction = computed(() =>
    cssClass.value === 'top' || cssClass.value === 'bottom' ? 'vertical' : 'horizontal',
  );

  const horizontalPosition = computed((): 'right' | 'left' => {
    void secondaryCssClass.value;

    if (!activatorRef.value || !listRef.value) {
      return 'right';
    }

    const { left } = activatorRef.value.getBoundingClientRect();
    const listWidth = listRef.value.offsetWidth;
    const viewportWidth = document.documentElement.clientWidth;

    return left + listWidth > viewportWidth ? 'left' : 'right';
  });

  const listClasses = computed(() => {
    const base = `${props.cssClass}__list`;
    const vertical = cssClass.value
      ? `${base}--${direction.value}-${cssClass.value}-${horizontalPosition.value}`
      : `${base}--vertical-bottom-right`;

    return [base, vertical].join(' ');
  });

  provide(DropdownMenuProviderKey, {
    cssClass: props.cssClass!,
    expandMode: props.expandMode ?? 'click',
    close,
    emitItemClick: (item) => emits('item-click', item),
    itemSlot: slots.item,
  });

  return {
    isOpen,
    open,
    close,
    toggle,
    componentClasses,
    listClasses,
    closeOnClickOutside,
    closeOnEscKey,
  };
}
