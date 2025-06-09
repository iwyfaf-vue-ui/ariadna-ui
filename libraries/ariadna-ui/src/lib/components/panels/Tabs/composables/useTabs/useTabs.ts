import { computed, type Ref, ref, watch } from 'vue';
import type { TTabsProps, TTabsEmits } from '../../Tabs';
import type { TUseTabsReturn } from './useTabs.types';
import type { TKeysCore } from '../../core/keys/keys.core.types';
import type { TTabItem } from '@/lib/components/panels/Tabs/types/Tabs.types';
import type { TContainerSize } from '../../core/slide/slide.core.types';

export default function useDropbox(
  props: TTabsProps,
  emits: TTabsEmits,
  keysCore: Ref<
    { keys: Array<string>; updateTabs: (tabs: Array<TTabItem>) => void },
    TKeysCore | { keys: Array<string>; updateTabs: (tabs: Array<TTabItem>) => void }
  >,
  slideCore: {
    offset: number;
    isSliding: boolean;
    updateContainerSize: (newContainerSize: TContainerSize) => void;
    updatePaddings: (newPaddings: [number, number]) => void;
    slideStart: (clientX: number) => void;
    slideMove: (clientX: number) => void;
    slideEnd: () => void;
  },
): TUseTabsReturn {
  const _openedByDefault = ref<number>(props.openedByDefault || 0);
  const activeTabKey = ref<string>(
    props.activeKeyByDefault || keysCore.value.keys[_openedByDefault.value] || '',
  );

  const componentClasses = computed(() => {
    const base = props.cssClass;

    const theme = `${base}--theme`;
    const slide = props.slide ? `${base}--slide` : undefined;
    const sliding = slideCore.isSliding ? `${base}--sliding` : undefined;
    const modifier = props.modifier ? `${base}--${props.modifier}` : undefined;

    return [base, theme, slide, sliding, modifier].filter(Boolean).join(' ');
  });

  const switchTab = (key: string) => {
    activeTabKey.value = key;

    emits('change', {
      key,
      tab: props.tabs[keysCore.value.keys.findIndex((tabKey) => tabKey === activeTabKey.value)],
    });
  };

  const nextTab = () => {
    const currentIndex = keysCore.value.keys.findIndex((tabKey) => tabKey === activeTabKey.value);
    if (currentIndex + 1 < keysCore.value.keys.length) {
      activeTabKey.value = keysCore.value.keys[currentIndex + 1];
      return;
    }

    activeTabKey.value = keysCore.value.keys[0];
  };

  const prevTab = () => {
    const currentIndex = keysCore.value.keys.findIndex((tabKey) => tabKey === activeTabKey.value);
    if (currentIndex - 1 >= 0) {
      activeTabKey.value = keysCore.value.keys[currentIndex - 1];
      return;
    }

    activeTabKey.value = keysCore.value.keys[keysCore.value.keys.length - 1];
  };

  watch(
    () => props.tabs,
    (newTabs) => keysCore.value.updateTabs(newTabs),
  );

  return {
    componentClasses,
    activeTabKey,
    switchTab,
    nextTab,
    prevTab,
  };
}
