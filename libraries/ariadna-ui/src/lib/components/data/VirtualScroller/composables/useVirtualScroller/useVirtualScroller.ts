import { computed, ref } from 'vue';
import type { StyleValue } from 'vue';
import type { Ref, ComputedRef, ShallowRef } from 'vue';
import type { TUseVirtualScrollerReturn } from './useVirtualScroller.types';
import type { TVirtualScrollerProps } from '../../VirtualScroller';
import type {
  TVirtualScrollerIndexes,
  TVirtualScrollerItem,
} from '../../types/VirtualScroller.types';

export default function useVirtualScroller<Data>(
  props: TVirtualScrollerProps<Data>,
  virtualScrollerRef: Readonly<ShallowRef<HTMLDivElement | null>>,
  source: ShallowRef<Array<Data>, Array<Data>>,
  state: Ref<TVirtualScrollerIndexes, TVirtualScrollerIndexes>,
  visibleItemsIndexes: Ref<TVirtualScrollerIndexes, TVirtualScrollerIndexes>,
): TUseVirtualScrollerReturn<Data> {
  const overscan = ref<number>(props.overscan!);

  const dataList: ComputedRef<Array<TVirtualScrollerItem<Data>>> = computed(() =>
    source.value.slice(state.value.start, state.value.end).map((item, index) => ({
      data: item,
      index: index + state.value.start,
    })),
  );

  function getViewCapacity(containerSize: number): number {
    return Math.ceil(containerSize / props.itemHeight);
  }

  function getOffset(scrollDirection: number): number {
    return Math.floor(scrollDirection / props.itemHeight) + 1;
  }

  function getDistanceTop(index: number): number {
    return index * props.itemHeight;
  }

  function calculateRange() {
    const element = virtualScrollerRef.value;

    if (!element) {
      return;
    }

    const offset = getOffset(element.scrollTop);
    const viewCapacity = getViewCapacity(element.clientHeight);

    const from = offset - overscan.value;
    const to = offset + viewCapacity + overscan.value;

    visibleItemsIndexes.value = {
      start: Math.max(0, offset - 1),
      end: Math.min(source.value.length, offset + viewCapacity - 1),
    };

    state.value = {
      start: Math.max(0, from),
      end: Math.min(source.value.length, to),
    };
  }

  function scrollTo(index: number) {
    if (!virtualScrollerRef.value) {
      return;
    }

    virtualScrollerRef.value['scrollTop'] = getDistanceTop(index);
    calculateRange();
  }

  const offsetTop: ComputedRef<number> = computed(() => {
    return getDistanceTop(state.value.start);
  });

  const totalHeight: ComputedRef<number> = computed(() => {
    return source.value.length * props.itemHeight;
  });

  const rootStyle: ComputedRef<StyleValue> = computed(() => {
    return {
      overflowY: 'auto',
      position: 'relative',
      height: `${props.height}px`,

      '--ar-virtual-scroller-item-height': `${props.itemHeight}px`,
    };
  });

  const contentStyle: ComputedRef<StyleValue> = computed(() => {
    return {
      height: `${totalHeight.value - offsetTop.value}px`,
      transform: `translateY(${offsetTop.value}px)`,
    };
  });

  const componentClasses = computed(() => {
    const base = props.cssClass;

    const theme = `${base}--theme`;

    return [base, theme].filter(Boolean).join(' ');
  });

  return {
    dataList,
    getViewCapacity,
    calculateRange,
    scrollTo,
    rootStyle,
    contentStyle,
    componentClasses,
  };
}
