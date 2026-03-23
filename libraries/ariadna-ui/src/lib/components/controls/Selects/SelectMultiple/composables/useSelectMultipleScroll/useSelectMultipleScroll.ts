import { nextTick, watch, type ComputedRef, type Ref } from 'vue';
import type { TSelectMultipleProps } from '../../SelectMultiple';
import type { TVirtualScrollerExposes } from '@/lib/components/data/VirtualScroller/VirtualScroller';

export default function useSelectMultipleScroll(
  props: TSelectMultipleProps,
  vModel: Ref<any[]>,
  opened: Ref<boolean>,
  filterOptions:
    | ComputedRef<TSelectMultipleProps['options']>
    | Ref<TSelectMultipleProps['options']>,
  isSelected: ComputedRef<(option: Record<string, any>) => boolean>,
  optionsInList: Ref<(HTMLElement | null)[]>,
  optionsListRef: Ref<HTMLElement | null>,
  filterElementRef: Ref<HTMLElement | null>,
  virtualScrollerRef: Ref<TVirtualScrollerExposes | null>,
): void {
  watch(opened, async (isOpen) => {
    if (!isOpen || !vModel.value.length) {
      return;
    }

    await nextTick();

    const selectedIndex = filterOptions.value.findIndex((option) => isSelected.value(option));
    if (selectedIndex === -1) {
      return;
    }

    if (props.virtualScroller) {
      virtualScrollerRef.value?.scrollTo?.(selectedIndex);
      return;
    }

    const el = optionsInList.value[selectedIndex];
    if (!el || !optionsListRef.value) {
      return;
    }

    const filterHeight = filterElementRef.value?.clientHeight || 0;
    optionsListRef.value.scrollTo({
      top: el.offsetTop - filterHeight,
    });
  });
}
