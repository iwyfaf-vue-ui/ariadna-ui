import { nextTick, watch, type ComputedRef, type ModelRef, type Ref } from 'vue';
import type { TSelectSingleGroupProps } from '../../SelectSingleGroup';

export default function useSelectSingleGroupScroll(
  props: TSelectSingleGroupProps,
  vModel: ModelRef<any, string, any, any> | Ref<any>,
  opened: Ref<boolean>,
  filterOptions:
    | ComputedRef<TSelectSingleGroupProps['options']>
    | Ref<TSelectSingleGroupProps['options']>,
  isSelected: (option: Record<string, any>) => boolean,
  groupsInList: Ref<(HTMLElement | null)[]>,
  optionsListRef: Ref<HTMLElement | null>,
  filterElementRef: Ref<HTMLElement | null>,
): void {
  watch(opened, async (isOpen) => {
    if (!isOpen || !vModel.value) {
      return;
    }

    await nextTick();

    let foundGroupIndex = -1;
    let foundItemIndex = -1;

    for (let g = 0; g < filterOptions.value.length; g++) {
      const items = filterOptions.value[g][props.optionGroupChildren!];
      for (let i = 0; i < items.length; i++) {
        if (isSelected(items[i])) {
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
