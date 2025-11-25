import type { Ref } from 'vue';
import type { TUseSelectSingleControlsReturn } from './useSelectsControls.types';
import type { TVirtualScrollerExposes } from '@/lib/components/data/VirtualScroller/VirtualScroller';

/**
 * Provides keyboard navigation and selection controls for Selects components, supporting both standard and virtualized
 * lists.
 *
 * @param {Record<string, any>} props - The properties object for the select component, including configuration flags
 * such as `disabled` and `virtualScroller`.
 * @param {Ref<boolean>} opened - A ref indicating whether the select dropdown is currently open.
 * @param {(option: any) => void} selectOptionHandler - A callback function invoked when an option is selected.
 * @param {Ref<HTMLDivElement | null>} optionsListRef - A ref to the HTMLDivElement representing the container of the
 * options list.
 * @param {Ref<Array<HTMLElement>>} optionsInList - A ref to an array of HTMLElements, each representing an option in
 * the list.
 * @param {Ref<HTMLDivElement | null>} filterElementRef - A ref to the HTMLDivElement representing the container of the
 * filter element.
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
  optionsListRef: Ref<HTMLDivElement | null>,
  optionsInList: Ref<Array<HTMLElement>>,
  filterElementRef: Ref<HTMLDivElement | null>,
  virtualScrollerRef: Ref<TVirtualScrollerExposes | null>,
  focusedOptionIndex: Ref<number>,
  filterOptions: Ref<Array<Record<string, any>>>,
): TUseSelectSingleControlsReturn {
  function getFilterHeight(): number {
    return filterElementRef.value?.clientHeight || 0;
  }

  function scrollTo(index: number): void {
    if (!optionsListRef.value) {
      return;
    }
    const filterHeight = getFilterHeight();
    optionsListRef.value.scrollTo({
      top: optionsInList.value[index].offsetTop - filterHeight,
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

      if (props.virtualScroller) {
        virtualScrollerRef.value?.scrollTo?.(
          filterOptions.value.length -
            Math.abs((visibleIndexes?.end || 0) - (visibleIndexes?.start || 0)),
        );

        return;
      }

      const filterHeight = getFilterHeight();
      optionsListRef.value?.scrollTo({
        top: (optionsListRef.value?.scrollHeight || 0) - filterHeight,
      });

      return;
    }

    if (isUp && focusedOptionIndex.value === 0) {
      focusedOptionIndex.value = filterOptions.value.length - 1;

      if (props.virtualScroller) {
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

      if (props.virtualScroller) {
        virtualScrollerRef.value?.scrollTo?.(0);
        return;
      }

      scrollTo(0);
      return;
    }

    focusedOptionIndex.value = focusedOptionIndex.value + (isUp ? -1 : 1);
    const item = optionsInList.value[focusedOptionIndex.value];

    const isOutsideVisibleZoneVirtualScroller =
      focusedOptionIndex.value > (visibleIndexes?.end || 0) - 1 ||
      focusedOptionIndex.value < (visibleIndexes?.start || 0);

    if (props.virtualScroller && isUp && isOutsideVisibleZoneVirtualScroller) {
      virtualScrollerRef.value?.scrollTo?.((visibleIndexes?.start || 0) - 1);
      focusedOptionIndex.value = (visibleIndexes?.start || 0) - 1;
    }

    if (props.virtualScroller && !isUp && isOutsideVisibleZoneVirtualScroller) {
      virtualScrollerRef.value?.scrollTo?.((visibleIndexes?.start || 0) + 1);
      focusedOptionIndex.value = visibleIndexes?.end || 0;
    }

    if (!optionsListRef.value) {
      return;
    }

    const filterHeight = getFilterHeight();

    if (
      !props.virtualScroller &&
      isUp &&
      item.offsetTop < optionsListRef.value.scrollTop + filterHeight
    ) {
      scrollTo(focusedOptionIndex.value);
    }

    if (
      !props.virtualScroller &&
      !isUp &&
      item &&
      item.offsetTop + item.clientHeight >
        optionsListRef.value.scrollTop + optionsListRef.value.clientHeight + filterHeight
    ) {
      optionsListRef.value?.scrollTo({
        top: item.offsetTop + item.clientHeight - optionsListRef.value.clientHeight - filterHeight,
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
