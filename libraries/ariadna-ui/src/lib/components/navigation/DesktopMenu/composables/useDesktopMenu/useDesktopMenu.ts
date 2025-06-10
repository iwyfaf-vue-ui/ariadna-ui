import { computed, onMounted, ref, watch } from 'vue';
import type { Ref } from 'vue';
import type { TDesktopMenuEmits, TDesktopMenuProps } from '../../DesktopMenu';
import type { TDesktopMenuReturn } from './useDesktopMenu.types';
import type { TSharedMenu } from '@/types/component';

export default function useDesktopMenu(
  props: TDesktopMenuProps,
  emits: TDesktopMenuEmits,
): TDesktopMenuReturn {
  const mapShowMoreState: Ref<Map<TSharedMenu[] | undefined, boolean>> = ref<
    Map<TSharedMenu[] | undefined, boolean>
  >(new Map());
  const activeMenu: Ref<TSharedMenu | null> = ref<TSharedMenu | null>(null);

  const isDataExist = computed(() => {
    return Boolean(props.data.length);
  });

  const componentClasses = computed(() => {
    const base = props.cssClass;

    const theme = `${base}--theme`;
    const loading = !isDataExist.value ? `${base}--loading` : undefined;
    const invalid = props.invalid ? `${base}--invalid` : undefined;

    return [base, theme, loading, invalid].filter(Boolean).join(' ');
  });

  const isMenuElementHidden = computed(() => (idx: number, children: TSharedMenu[]) => {
    if (!props.visibleItems) return false;
    if (mapShowMoreState.value.get(children)) return false;

    return idx + 1 > props.visibleItems;
  });

  const eventType = computed(() => {
    return props.expandMode === 'hover' ? 'mouseover' : 'click';
  });

  function secondLevelVisibleHandler(data?: TSharedMenu) {
    if (!data) return;
    if (!data.children.length) return;

    activeMenu.value = data;
  }

  function showMoreHandler(uniqKey: TSharedMenu['children']) {
    !mapShowMoreState.value.get(uniqKey)
      ? mapShowMoreState.value.set(uniqKey, true)
      : mapShowMoreState.value.set(uniqKey, false);
  }

  function onOverlayClick() {
    emits('click:overlay');
  }

  watch(isDataExist, () => {
    secondLevelVisibleHandler(props.data[0]);
  });

  onMounted(() => {
    secondLevelVisibleHandler(props.data[0]);
    emits('mounted');
  });

  return {
    mapShowMoreState,
    activeMenu,
    isDataExist,
    componentClasses,
    isMenuElementHidden,
    eventType,
    secondLevelVisibleHandler,
    showMoreHandler,
    onOverlayClick,
  };
}
