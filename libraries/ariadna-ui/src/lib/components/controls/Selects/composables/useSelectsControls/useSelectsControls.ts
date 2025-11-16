import type { Ref } from 'vue';
import type { TUseSelectSingleControlsReturn } from './useSelectsControls.types';
import type { TVirtualScrollerExposes } from '@/lib/components/data/VirtualScroller/VirtualScroller';

/**
 * Provides keyboard navigation and selection controls for Selects components, supporting both standard and virtualized
 * lists.
 *
 * @param {Record<string, any>} props - The properties object for the select component, including configuration flags
 * such as `disabled` and `virtualList`.
 * @param {Ref<boolean>} opened - A ref indicating whether the select dropdown is currently open.
 * @param {(option: any) => void} selectOptionHandler - A callback function invoked when an option is selected.
 * @param {Ref<HTMLDivElement | null>} optionsBodyRef - A ref to the HTMLDivElement representing the container of the
 * options list.
 * @param {Ref<Array<HTMLElement>>} optionsInList - A ref to an array of HTMLElements, each representing an option in
 * the list.
 * @param {Ref<TVirtualScrollerExposes | null>} virtualScrollerRef - A ref to the VirtualScroller instance, if virtual
 * scrolling is enabled.
 * @param {Ref<number>} focusedOptionIndex - A ref holding the index of the currently focused option.
 * @param {Ref<Array<Record<string, any>>>} filterOptions - A ref to the filtered array of option objects currently
 * displayed.
 *
 * @returns {TUseSelectSingleControlsReturn} - An object containing handlers for keyboard navigation and selection.
 */
export default function useSelectsControls(
  props: Record<string, any>,
  opened: Ref<boolean>,
  selectOptionHandler: (option: any) => void,
  optionsBodyRef: Ref<HTMLDivElement | null>,
  optionsInList: Ref<Array<HTMLElement>>,
  virtualScrollerRef: Ref<TVirtualScrollerExposes | null>,
  focusedOptionIndex: Ref<number>,
  filterOptions: Ref<Array<Record<string, any>>>,
): TUseSelectSingleControlsReturn {
  function scrollTo(index: number): void {
    if (!optionsBodyRef.value) {
      return;
    }

    optionsBodyRef.value.scrollTo({
      top: optionsInList.value[index]?.offsetTop,
    });
  }

  function onKeyDownOrUpHandler(event: KeyboardEvent) {
    if (props.disabled || !opened.value) {
      return;
    }

    const isUp = event.key === 'ArrowUp';

    const visibleIndexes = virtualScrollerRef.value?.getVisibleIndexes?.();

    if (focusedOptionIndex.value === undefined) {
      focusedOptionIndex.value = isUp ? filterOptions.value.length - 1 : 0;

      if (!isUp) {
        return;
      }

      if (props.virtualList) {
        virtualScrollerRef.value?.scrollTo?.(
          filterOptions.value.length -
            Math.abs((visibleIndexes?.end || 0) - (visibleIndexes?.start || 0)),
        );
        return;
      }

      optionsBodyRef.value?.scrollTo({
        top: optionsBodyRef.value?.scrollHeight,
      });

      return;
    }

    if (isUp && focusedOptionIndex.value === 0) {
      focusedOptionIndex.value = filterOptions.value.length - 1;

      if (props.virtualList) {
        virtualScrollerRef.value?.scrollTo?.(
          filterOptions.value.length -
            Math.abs((visibleIndexes?.end || 0) - (visibleIndexes?.start || 0)),
        );

        return;
      }

      scrollTo(focusedOptionIndex.value);
      return;
    }

    if (!isUp && focusedOptionIndex.value === filterOptions.value.length - 1) {
      focusedOptionIndex.value = 0;

      if (props.virtualList) {
        virtualScrollerRef.value?.scrollTo?.(0);
        return;
      }

      scrollTo(0);
      return;
    }

    focusedOptionIndex.value = focusedOptionIndex.value + (isUp ? -1 : 1);
    const item = optionsInList.value[focusedOptionIndex.value];

    const isOutsideVisibleZoneVirtualList =
      focusedOptionIndex.value > (visibleIndexes?.end || 0) - 1 ||
      focusedOptionIndex.value < (visibleIndexes?.start || 0);

    if (props.virtualList && isUp && isOutsideVisibleZoneVirtualList) {
      virtualScrollerRef.value?.scrollTo?.((visibleIndexes?.start || 0) - 1);
      focusedOptionIndex.value = (visibleIndexes?.start || 0) - 1;
    }

    if (props.virtualList && !isUp && isOutsideVisibleZoneVirtualList) {
      virtualScrollerRef.value?.scrollTo?.((visibleIndexes?.start || 0) + 1);
      focusedOptionIndex.value = visibleIndexes?.end || 0;
    }

    if (!optionsBodyRef.value) {
      return;
    }

    if (!props.virtualList && isUp && item.offsetTop < optionsBodyRef.value.scrollTop) {
      scrollTo(focusedOptionIndex.value);
    }

    if (
      !props.virtualList &&
      !isUp &&
      item &&
      item.offsetTop + item.clientHeight >
        optionsBodyRef.value.scrollTop + optionsBodyRef.value.clientHeight
    ) {
      optionsBodyRef.value?.scrollTo({
        top: item.offsetTop + item.clientHeight - optionsBodyRef.value.clientHeight,
      });
    }
  }

  function onKeySpaceOrEnterHandler() {
    if (props.disabled) {
      return;
    }

    if (!opened.value) {
      opened.value = true;
      return;
    }

    selectOptionHandler(filterOptions.value[focusedOptionIndex.value]);
  }

  return {
    onKeyDownOrUpHandler,
    onKeySpaceOrEnterHandler,
  };
}
