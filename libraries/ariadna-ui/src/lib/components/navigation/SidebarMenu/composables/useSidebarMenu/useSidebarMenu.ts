import type { TUseSidebarMenuReturn } from './useSidebarMenu.types';
import type { TSidebarMenuEmits, TSidebarMenuProps } from '../../SidebarMenu';
import { SidebarMenuProviderKey } from '../../providers/SidebarMenu.provider';
import { computed, provide, getCurrentInstance, watch } from 'vue';
import type { Ref } from 'vue';
import isMenuItemActive from '../../core/item/item.core';
import type { TSidebarMenuItem } from '../../types/SidebarMenu.item';

export default function useSidebarMenu(
  props: TSidebarMenuProps,
  collapsed: Ref<TSidebarMenuProps['collapsed']>,
  emits: TSidebarMenuEmits,
): TUseSidebarMenuReturn {
  // SSR-safe access to route
  const instance = getCurrentInstance();
  const route = computed(() => instance?.appContext.config.globalProperties.$route);

  const isMenuItemActiveComputed = computed(() => (item: TSidebarMenuItem) => {
    return isMenuItemActive(item, route.value);
  });

  const componentClasses = computed(() => {
    const base = props.cssClass;

    const theme = `${base}--theme`;

    const collapsedModifier = collapsed.value ? `${base}--collapsed` : undefined;

    return [base, collapsedModifier, theme].filter(Boolean).join(' ');
  });

  provide(SidebarMenuProviderKey, {
    cssClass: props.cssClass,
    collapsed: collapsed,
    rememberExpanded: props.rememberExpanded,
  });

  watch(collapsed, (newValue) => {
    if (typeof newValue === 'undefined') return;

    emits('update:collapsed', newValue);
  });

  return {
    isMenuItemActiveComputed,
    componentClasses,
  };
}
