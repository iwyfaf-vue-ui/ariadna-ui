import { nextTick, watch, type ModelRef, type Ref } from 'vue';
import type { TSelectSingleProps } from '../../SelectSingle';
import type { TVirtualScrollerExposes } from '@/lib/components/data/VirtualScroller/VirtualScroller';

export default function useSelectSingleScroll(
  props: TSelectSingleProps,
  vModel: ModelRef<any, string, any, any> | Ref<any>,
  opened: Ref<boolean>,
  filterOptions: Ref<any[][], any[][]>,
  isSelected: (option: Record<string, any>) => boolean,
  optionsInList: Ref<(HTMLElement | null)[]>,
  optionsListRef: Ref<HTMLElement | null>,
  filterElementRef: Ref<HTMLElement | null>,
  virtualScrollerRef: Ref<TVirtualScrollerExposes | null>,
): void {
  watch(opened, async (isOpen) => {
    if (!isOpen || !vModel.value) return;

    await nextTick();

    const selectedIndex = filterOptions.value.findIndex((option) => isSelected(option));
    if (selectedIndex === -1) return;

    if (props.virtualScroller) {
      virtualScrollerRef.value?.scrollTo?.(selectedIndex);
      return;
    }

    const el = optionsInList.value[selectedIndex];
    if (!el || !optionsListRef.value) return;

    const filterHeight = filterElementRef.value?.clientHeight || 0;
    optionsListRef.value.scrollTo({
      top: el.offsetTop - filterHeight,
    });
  });
}
