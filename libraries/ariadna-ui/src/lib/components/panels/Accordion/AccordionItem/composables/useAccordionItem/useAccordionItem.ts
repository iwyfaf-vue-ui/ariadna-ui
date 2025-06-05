import { computed, onMounted, ref, useId } from 'vue';
import type { ShallowRef } from 'vue';
import type { TAccordionItemEmits, TAccordionItemProps } from '../../AccordionItem';
import type { TUseAccordionItemReturn } from './useAccordionItem.types';
import type { TAccordionItems } from '../../types/AccordionItem.types';

export default function useAccordionItem(
  props: TAccordionItemProps,
  emits: TAccordionItemEmits,
  accordionRef: Readonly<ShallowRef<HTMLDivElement | null>>,
  accordions: TAccordionItems,
  updateAccordion: (id: string, value: boolean) => void,
  opened: boolean | undefined,
  disabled: boolean | undefined,
  cssClass: string | undefined,
  modifier: string | undefined,
): TUseAccordionItemReturn {
  const id = useId();

  const hovered = ref(false);
  const focused = ref(false);

  const openedState = ref(opened! || props.opened!);
  const disabledState = computed(() => disabled || props.disabled);

  const componentClasses = computed(() => {
    const base = cssClass + '-item';

    const theme = `${base}--theme`;
    const active = openedState.value ? `${base}--active` : undefined;
    const focus = focused.value ? `${base}--focused` : undefined;
    const hover = hovered.value && !focused.value ? `${base}--hovered` : undefined;
    const disabled = disabledState.value ? `${base}--disabled` : undefined;
    const modify = modifier ? `${base}--${modifier}` : undefined;

    return [base, theme, active, focus, hover, disabled, modify].filter(Boolean).join(' ');
  });

  function updateAccordionWrapper(id: string, value: boolean) {
    if (disabledState.value) {
      return;
    }

    updateAccordion(id, value);
  }

  function toggle() {
    if (disabledState.value) {
      return;
    }

    updateAccordionWrapper(id, !openedState.value);
  }

  function open() {
    updateAccordionWrapper(id, true);
  }

  function close() {
    updateAccordionWrapper(id, false);
  }

  function focus() {
    if (!accordionRef.value) {
      return;
    }

    accordionRef.value.focus();
  }

  function onMouseOver() {
    hovered.value = true;
  }

  function onMouseLeave() {
    hovered.value = false;
  }

  function onKeyDownEcsHandler() {
    if (!openedState.value) {
      return;
    }

    updateAccordionWrapper(id, false);
  }

  function onKeyUpOrDownHandler(event: KeyboardEvent) {
    const isUp = event.key === 'ArrowUp';

    let currentIndex = accordions.value.findIndex((accordion) => accordion.id === id);

    if (currentIndex === -1) {
      return;
    }

    if (isUp) {
      if (currentIndex === 0) {
        accordions.value[accordions.value.length - 1].focus();
      } else {
        accordions.value[currentIndex - 1].focus();
      }
      return;
    }

    if (currentIndex === accordions.value.length - 1) {
      accordions.value[0].focus();
      return;
    }

    accordions.value[currentIndex + 1].focus();
  }

  function onBlur(event: Event) {
    focused.value = false;

    emits('blur', event);
  }

  function onFocus(event: Event) {
    focused.value = true;

    emits('focus', event);
  }

  function getElementFullHeight(el: HTMLElement): number {
    const styles = window.getComputedStyle(el);
    const marginTop = parseFloat(styles.marginTop) || 0;
    const marginBottom = parseFloat(styles.marginBottom) || 0;

    return el.offsetHeight + marginTop + marginBottom;
  }

  function getContentFullHeight(el: HTMLElement): number {
    let height = 0;

    Array.from(el.children).forEach((child) => {
      height += getElementFullHeight(child as HTMLElement);
    });

    const styles = window.getComputedStyle(el);
    const paddingTop = parseFloat(styles.paddingTop) || 0;
    const paddingBottom = parseFloat(styles.paddingBottom) || 0;

    return height + paddingTop + paddingBottom;
  }

  function onExpandEnter(el: Element) {
    const htmlElement = el as HTMLElement;

    htmlElement.style.height = getContentFullHeight(htmlElement) + 'px';
  }

  function onExpandAfterEnter(el: Element) {
    const htmlElement = el as HTMLElement;

    htmlElement.style.height = 'auto';
  }

  function onExpandBeforeLeave(el: Element) {
    const htmlElement = el as HTMLElement;

    htmlElement.style.height = getContentFullHeight(htmlElement) + 'px';
  }

  function _internalToggle() {
    if (disabledState.value) return;

    openedState.value = !openedState.value;

    emits('change', openedState.value);
  }

  function _internalOpen() {
    openedState.value = true;

    emits('change', true);
  }

  function _internalClose() {
    openedState.value = false;

    emits('change', false);
  }

  onMounted(() => {
    accordions.value.push({
      id: id,
      opened: openedState.value,
      toggle: _internalToggle,
      open: _internalOpen,
      close: _internalClose,
      focus,
    });
  });

  return {
    id,
    componentClasses,
    openedState,
    disabledState,
    updateAccordionWrapper,
    toggle,
    open,
    close,
    onMouseOver,
    onMouseLeave,
    onKeyDownEcsHandler,
    onKeyUpOrDownHandler,
    onBlur,
    onFocus,
    onExpandEnter,
    onExpandAfterEnter,
    onExpandBeforeLeave,
  };
}
