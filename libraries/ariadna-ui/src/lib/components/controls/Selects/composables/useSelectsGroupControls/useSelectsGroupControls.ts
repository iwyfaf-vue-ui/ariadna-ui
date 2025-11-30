import type { Ref } from 'vue';
import type { TUseSelectsGroupControlsReturn } from './useSelectsGroupControls.types';

/**
 * A composable function that manages keyboard navigation and interaction controls for Group Selects options.
 *
 * @param {Record<string, any>} props - - Component properties object
 * @param {Ref<boolean>} opened - Reactive reference indicating if the select dropdown is open
 * @param {(option: any) => void} selectGroupOptionHandler - Callback function to handle option selection
 * @param {Ref<HTMLDivElement | null>} optionsListRef - Reference to the options list container DOM element
 * @param {Ref<HTMLDivElement | null>} filterElementRef - Reference to the filter input DOM element
 * @param {Ref<Array<Record<string, any>>>} filterOptions - Reactive array of filtered option groups
 * @param {Ref<Array<HTMLElement>>} groupsInList - Reactive array of group DOM elements
 * @param {Ref<number>} optionsInGroup - Reactive number of options in the currently focused group
 * @param {Ref<number>} focusedGroupIndex - Reactive index of the currently focused group
 * @param {Ref<number>} focusedGroupOptionIndex - Reactive index of the currently focused option within a group
 * @returns {TUseSelectsGroupControlsReturn}
 */
export default function useSelectsGroupControls(
  props: Record<string, any>,
  opened: Ref<boolean>,
  selectGroupOptionHandler: (option: any) => void,
  optionsListRef: Ref<HTMLDivElement | null>,
  filterElementRef: Ref<HTMLDivElement | null>,
  filterOptions: Ref<Array<Record<string, any>>>,
  groupsInList: Ref<Array<HTMLElement>>,
  optionsInGroup: Ref<number>,
  focusedGroupIndex: Ref<number>,
  focusedGroupOptionIndex: Ref<number>,
): TUseSelectsGroupControlsReturn {
  function getFilterHeight(): number {
    return filterElementRef.value?.clientHeight || 0;
  }

  function scrollTo(index: [number, number]): void {
    if (!optionsListRef.value) {
      return;
    }

    const item = groupsInList.value[index[0]].children[index[1]] as HTMLElement;

    const filterHeight = getFilterHeight();
    optionsListRef.value.scrollTo({
      top: item.offsetTop - filterHeight,
    });
  }

  function updateOptionsInGroup() {
    if (!focusedGroupIndex.value && focusedGroupIndex.value !== 0) {
      return;
    }

    optionsInGroup.value =
      filterOptions.value[focusedGroupIndex.value][props.optionGroupChildren].length;
  }

  function groupScrollTop() {
    const groupOptionIndex =
      focusedGroupOptionIndex.value === 0 ? 0 : focusedGroupOptionIndex.value + 1;

    const currentItem = groupsInList.value[focusedGroupIndex.value].children[
      groupOptionIndex
    ] as HTMLElement;
    if (!currentItem || !optionsListRef.value) {
      return;
    }

    if (
      focusedGroupOptionIndex.value === optionsInGroup.value - 1 &&
      focusedGroupIndex.value === groupsInList.value.length - 1
    ) {
      scrollTo([focusedGroupIndex.value, focusedGroupOptionIndex.value]);
      return;
    }

    const filterHeight = getFilterHeight();
    if (currentItem.offsetTop < optionsListRef.value.scrollTop + filterHeight) {
      scrollTo([focusedGroupIndex.value, groupOptionIndex]);
    }
  }

  const groupScrollDown = () => {
    const currentItem = groupsInList.value[focusedGroupIndex.value].children[
      focusedGroupOptionIndex.value === 0 ? 0 : focusedGroupOptionIndex.value + 1
    ] as HTMLElement;
    if (!currentItem || !optionsListRef.value) {
      return;
    }

    if (focusedGroupOptionIndex.value === 0 && focusedGroupIndex.value === 0) {
      scrollTo([0, 0]);
      return;
    }

    const clientHeight =
      focusedGroupOptionIndex.value - 1 === -1
        ? groupsInList.value[focusedGroupIndex.value].children[focusedGroupOptionIndex.value + 1]
            .clientHeight + currentItem.clientHeight
        : currentItem.clientHeight;

    const filterHeight = getFilterHeight();
    if (
      currentItem.offsetTop + currentItem.clientHeight >
      optionsListRef.value.scrollTop + optionsListRef.value.clientHeight + filterHeight
    ) {
      optionsListRef.value?.scrollTo({
        top:
          currentItem.offsetTop + clientHeight - optionsListRef.value.clientHeight - filterHeight,
      });
    }
  };

  const onKeyDownOrUpHandler = (event: KeyboardEvent) => {
    if (props.disabled || !opened.value) {
      return;
    }

    const isUp = event.key === 'ArrowUp';

    /**
     * Key Down: If no options in groups focused => (set focus to first option in first group,
     * update count of options in group)
     */
    /**
     * Key Up: If no options in groups focused => (set focus to last option in last group,
     * update count of options in group)
     */
    if (focusedGroupOptionIndex.value === undefined && focusedGroupIndex.value === undefined) {
      focusedGroupIndex.value = isUp ? groupsInList.value.length - 1 : 0;
      updateOptionsInGroup();
      focusedGroupOptionIndex.value = isUp ? optionsInGroup.value - 1 : 0;

      if (isUp) {
        scrollTo([focusedGroupIndex.value, focusedGroupOptionIndex.value]);
      }

      return;
    }

    if (isUp) {
      /**
       * Key Up: If first option in group focused and not first group  => (set focus to last option in
       * previous group, update count of options in group)
       */
      if (focusedGroupOptionIndex.value === 0 && focusedGroupIndex.value !== 0) {
        focusedGroupIndex.value--;
        updateOptionsInGroup();
        focusedGroupOptionIndex.value = optionsInGroup.value - 1;

        groupScrollTop();
        return;
      }

      /**
       * Key Up: If first option in group focused and first group  => (set focus to last option in
       * last group, update count of options in group)
       */
      if (focusedGroupOptionIndex.value === 0 && focusedGroupIndex.value === 0) {
        focusedGroupIndex.value = filterOptions.value.length - 1;
        updateOptionsInGroup();
        focusedGroupOptionIndex.value = optionsInGroup.value - 1;

        groupScrollTop();
        return;
      }

      /**
       * Key Up: If not first option in group focused => (set focus to previous option in group)
       */
      if (focusedGroupOptionIndex.value > 0) {
        focusedGroupOptionIndex.value--;
        groupScrollTop();
        return;
      }
    }

    /**
     * Key Down: If not last option in group focused => (set focus to next option in group)
     */
    if (focusedGroupOptionIndex.value < optionsInGroup.value - 1) {
      focusedGroupOptionIndex.value++;
      groupScrollDown();
      return;
    }

    /**
     * Key Down: If last option in last group focused => (set focus to first option in first group,
     * update count of options in group)
     */
    if (
      focusedGroupOptionIndex.value === optionsInGroup.value - 1 &&
      focusedGroupIndex.value === filterOptions.value.length - 1
    ) {
      focusedGroupIndex.value = 0;
      focusedGroupOptionIndex.value = 0;
      updateOptionsInGroup();
      groupScrollDown();
      return;
    }
    /**
     * Key Down: If last option in not last group focused => (set focus to first option in next group,
     * update count of options in group)
     */
    if (
      focusedGroupOptionIndex.value === optionsInGroup.value - 1 &&
      focusedGroupIndex.value < filterOptions.value.length - 1
    ) {
      focusedGroupOptionIndex.value = 0;
      focusedGroupIndex.value++;
      updateOptionsInGroup();
      groupScrollDown();
      return;
    }
  };

  const onKeySpaceOrEnterHandler = () => {
    if (props.disabled) return;

    if (!opened.value) {
      opened.value = true;
      return;
    }

    selectGroupOptionHandler(
      filterOptions.value[focusedGroupIndex.value][props.optionGroupChildren][
        focusedGroupOptionIndex.value
      ],
    );
  };

  return {
    onKeyDownOrUpHandler,
    onKeySpaceOrEnterHandler,
  };
}
