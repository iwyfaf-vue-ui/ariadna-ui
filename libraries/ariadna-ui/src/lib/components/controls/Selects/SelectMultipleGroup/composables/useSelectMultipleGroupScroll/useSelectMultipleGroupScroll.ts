import { nextTick, watch, type ComputedRef, type Ref } from 'vue';
import type { TSelectMultipleGroupProps } from '../../SelectMultipleGroup';

export default function useSelectMultipleGroupScroll(
  props: TSelectMultipleGroupProps,
  vModel: Ref<any[]>,
  opened: Ref<boolean>,
  filterOptions:
    | ComputedRef<TSelectMultipleGroupProps['options']>
    | Ref<TSelectMultipleGroupProps['options']>,
  selectedOptionsMap: ComputedRef<Map<any, boolean>>,
  groupsInList: Ref<(HTMLElement | null)[]>,
  optionsListRef: Ref<HTMLElement | null>,
  filterElementRef: Ref<HTMLElement | null>,
): void {
  watch(opened, async (isOpen) => {
    if (!isOpen || !vModel.value.length) {
      return;
    }

    await nextTick();

    let foundGroupIndex = -1;
    let foundItemIndex = -1;

    for (let g = 0; g < filterOptions.value.length; g++) {
      const items =
        filterOptions.value[g][props.optionGroupChildren as keyof (typeof filterOptions.value)[0]];
      for (let i = 0; i < items.length; i++) {
        if (selectedOptionsMap.value.get(items[i])) {
          foundGroupIndex = g;
          foundItemIndex = i;
          break;
        }
      }
      if (foundGroupIndex !== -1) {
        break;
      }
    }

    if (foundGroupIndex === -1) {
      return;
    }

    const groupEl = groupsInList.value[foundGroupIndex];
    if (!groupEl || !optionsListRef.value) {
      return;
    }

    // children[0] = group header, children[1+] = опции
    const el = groupEl.children[foundItemIndex + 1] as HTMLElement;
    if (!el) {
      return;
    }

    const filterHeight = filterElementRef.value?.clientHeight || 0;
    optionsListRef.value.scrollTo({
      top: el.offsetTop - filterHeight,
    });
  });
}
