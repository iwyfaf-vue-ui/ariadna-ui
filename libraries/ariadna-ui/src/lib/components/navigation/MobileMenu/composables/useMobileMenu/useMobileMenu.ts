import { computed, ref } from 'vue';
import type { Ref, UnwrapRef } from 'vue';
import type { TMobileMenuEmits, TMobileMenuProps } from '../../MobileMenu';
import type { TUseMobileMenuReturn } from './useMobileMenu.types';
import type { TMobileMenuItem } from '../../types/MobileMenu.types';

export default function useMobileMenu(
  props: TMobileMenuProps,
  emits: TMobileMenuEmits,
  currentMenuItem: Ref<TMobileMenuItem | null>,
  menuResizeWithoutDelay: Ref<any, any> | Ref<UnwrapRef<boolean>, boolean | UnwrapRef<boolean>>,
  pageStackWithoutDelay:
    | Ref<any, any>
    | Ref<UnwrapRef<TMobileMenuItem>, TMobileMenuItem | UnwrapRef<TMobileMenuItem>>,
): TUseMobileMenuReturn {
  const opened = ref<boolean>(false);

  const componentClasses = computed(() => {
    const base = props.cssClass;

    const theme = `${base}--theme`;
    const isOpened = opened.value ? `${base}--opened` : undefined;

    return [base, theme, isOpened].filter(Boolean).join(' ');
  });

  const menuClasses = computed(() => ({
    [`${props.cssClass}__menu`]: true,
    [`${props.cssClass}__menu--resize`]: menuResizeWithoutDelay.value,
  }));

  const backClasses = computed(() => ({
    [`${props.cssClass}__header-back`]: true,
    [`${props.cssClass}__header-back--visible`]: pageStackWithoutDelay.value.length > 1,
  }));

  function open() {
    opened.value = true;

    emits('open');
  }

  const toggle = () => {
    if (opened.value) {
      currentMenuItem.value = null;
    }

    opened.value = !opened.value;

    if (!opened.value) {
      return emits('close');
    }

    emits('open');
  };

  function close() {
    opened.value = false;
    currentMenuItem.value = null;

    emits('close');
  }

  return {
    opened,
    componentClasses,
    menuClasses,
    backClasses,
    open,
    toggle,
    close,
  };
}
