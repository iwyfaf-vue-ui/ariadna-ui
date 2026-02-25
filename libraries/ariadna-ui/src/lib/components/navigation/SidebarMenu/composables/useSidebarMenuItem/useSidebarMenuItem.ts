import type { TUseSidebarMenuItemReturn } from './useSidebarMenuItem.types';
import type { TSidebarMenuItemProps } from '../../components/SidebarMenuItem/SidebarMenuItem';
import { computed, getCurrentInstance, ref, watch } from 'vue';
import injectStrict from '@/shared/validators/vue/inject-strict.vue.validator';
import { SidebarMenuProviderKey } from '../../providers/SidebarMenu.provider';
import type { TSidebarMenuItem } from '../../types/SidebarMenu.item';
import isMenuItemActive from '@/lib/components/navigation/SidebarMenu/core/item/item.core';

export default function useSidebarMenuItem(
  props: TSidebarMenuItemProps,
): TUseSidebarMenuItemReturn {
  // SSR-safe access to route
  const instance = getCurrentInstance();
  const route = computed(() => instance?.appContext.config.globalProperties.$route);
  const { cssClass, collapsed, rememberExpanded } = injectStrict(SidebarMenuProviderKey);

  const isOpen = ref(false);
  const isHover = ref(false);

  const isHidden = computed(() => !!props.item.hidden);

  const isMenuItemActiveComputed = computed(() => (item: TSidebarMenuItem) => {
    return isMenuItemActive(item, route.value);
  });

  const hasChildren = computed(
    () => Array.isArray(props.item.children) && props.item.children.length > 0,
  );

  const children = computed<TSidebarMenuItem[]>(() =>
    hasChildren.value ? props.item.children! : [],
  );

  const componentClasses = computed(() => {
    const base = cssClass;

    const item = `${base}__item`;
    const subItem = props.level && props.level > 1 ? `${base}__item-sub` : undefined;
    const itemHover = isHover.value ? `${item}--hover` : undefined;
    const itemActive = isOpen.value || props.active ? `${item}--open` : undefined;
    const itemDisabled = props.item.disabled ? `${item}--disabled` : undefined;
    const itemLevel = `${item}--level-${props.level}`;

    return [item, subItem, itemHover, itemActive, itemDisabled, itemLevel]
      .filter(Boolean)
      .join(' ');
  });

  function onMouseEnter(event: MouseEvent) {
    if (props.item.disabled) return;

    event.stopPropagation();
    isHover.value = true;
  }

  function onMouseLeave(event: MouseEvent) {
    event.stopPropagation();

    isHover.value = false;
  }

  function onToggle(event: MouseEvent) {
    if (!props.item.children || props.item.disabled) {
      return;
    }

    if (!props.item.href) {
      event.preventDefault();
    }

    console.log('onToggle');
    isOpen.value = !isOpen.value;

    if (rememberExpanded) {
      props.item.expand = isOpen.value;
    }
  }

  function onExpandEnter(el: Element) {
    const htmlElement = el as HTMLElement;
    htmlElement.style.height = el.scrollHeight + 'px';
  }

  function onExpandAfterEnter(el: Element) {
    const htmlElement = el as HTMLElement;
    htmlElement.style.height = 'auto';
  }

  function onExpandBeforeLeave(el: Element) {
    const htmlElement = el as HTMLElement;

    if (collapsed.value) {
      htmlElement.style.display = 'none';
      return;
    }

    htmlElement.style.height = htmlElement.scrollHeight + 'px';
  }

  watch(
    () => props.active,
    (value) => {
      if (typeof value !== 'undefined') {
        isOpen.value = value;

        if (rememberExpanded) {
          props.item.expand = isOpen.value;
        }
      }
    },
    {
      immediate: true,
    },
  );

  watch(
    () => props.item.expand,
    (expand) => {
      if (expand) {
        isOpen.value = true;
      }
    },
    {
      immediate: true,
    },
  );

  return {
    cssClass,
    isOpen,
    isHover,
    isHidden,
    isMenuItemActiveComputed,
    hasChildren,
    children,
    componentClasses,
    onMouseEnter,
    onMouseLeave,
    onToggle,
    onExpandEnter,
    onExpandAfterEnter,
    onExpandBeforeLeave,
  };
}
