import { computed, ref } from 'vue';
import type { TUsePanelCollapseReturn } from './usePanelCollapse.types';
import type { TPanelEmits, TPanelProps } from '../../Panel';
import type { TPanelToggleEvent } from '../../types/Panel.types';

export default function usePanelCollapse(
  props: TPanelProps,
  emits: TPanelEmits,
): TUsePanelCollapseReturn {
  const isInnerCollapsed = ref<boolean>(false);

  function collapseHandler(event: TPanelToggleEvent['originalEvent']): void {
    isInnerCollapsed.value = !isInnerCollapsed.value;

    emits('toggle', {
      originalEvent: event,
      value: isInnerCollapsed.value,
    });
  }

  function collapsedByDefault() {
    if (!props.collapsed) {
      return;
    }

    isInnerCollapsed.value = true;
  }

  function onCollapseEnter(el: Element) {
    const htmlElement = el as HTMLElement;

    htmlElement.style.height = el.scrollHeight + 'px';
  }

  function onCollapseAfterEnter(el: Element) {
    const htmlElement = el as HTMLElement;

    htmlElement.style.height = '';
  }

  function onCollapseBeforeLeave(el: Element) {
    const htmlElement = el as HTMLElement;
    htmlElement.style.height = htmlElement.scrollHeight + 'px';
  }

  const collapseClasses = computed(() => {
    const base = props.cssClass;

    const collapsed = isInnerCollapsed.value ? `${base}--collapsed` : undefined;

    return [collapsed].filter(Boolean).join(' ');
  });

  collapsedByDefault();

  return {
    isInnerCollapsed,
    collapseHandler,
    onCollapseEnter,
    onCollapseAfterEnter,
    onCollapseBeforeLeave,
    collapseClasses,
  };
}
