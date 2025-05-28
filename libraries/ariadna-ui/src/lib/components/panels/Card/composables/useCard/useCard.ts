import { computed, ref, nextTick } from 'vue';
import type { TCardProps } from '../../Card';
import type { TUseCardReturn } from './useCard.types';

export default function useCard(props: TCardProps): TUseCardReturn {
  let _contentTextCollapsedHeight: number;

  const isContentCollapsed = ref<boolean>(false);

  const componentClasses = computed(() => {
    const base = props.cssClass;

    const theme = `${base}--theme`;
    const modifier = props.modifier ? `${base}--${props.modifier}` : undefined;

    return [base, theme, modifier].filter(Boolean).join(' ');
  });

  function toggleCollapsed(): void {
    isContentCollapsed.value = !isContentCollapsed.value;
  }

  function toggleCollapsedDefault() {
    if (!props.symbols) return;

    if (props.symbols.all > props.symbols.visible) {
      isContentCollapsed.value = true;
    }
  }

  function onCollapseEnter(el: Element) {
    const htmlElement = el as HTMLElement;
    _contentTextCollapsedHeight = htmlElement.offsetHeight;

    htmlElement.style.height = el.scrollHeight + 'px';
  }

  function onCollapseAfterEnter(el: Element) {
    const htmlElement = el as HTMLElement;

    htmlElement.style.height = '';
  }

  async function onCollapseBeforeLeave(el: Element) {
    const htmlElement = el as HTMLElement;
    htmlElement.style.height = htmlElement.scrollHeight + 'px';

    // Для плавной анимации к определенному значению высоту, в следующем tick нужно ее установить.
    await nextTick(() => {
      htmlElement.style.height = `${_contentTextCollapsedHeight}px`;
    });
  }

  return {
    componentClasses,
    isContentCollapsed,
    toggleCollapsedDefault,
    toggleCollapsed,
    onCollapseEnter,
    onCollapseAfterEnter,
    onCollapseBeforeLeave,
  };
}
