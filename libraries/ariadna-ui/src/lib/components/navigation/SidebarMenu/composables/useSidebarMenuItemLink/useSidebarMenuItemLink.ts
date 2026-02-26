import type { TUseSidebarMenuItemLinkReturn } from './useSidebarMenuItemLink.types';
import type { TSidebarMenuItemLinkProps } from '../../components/SidebarMenuItemLink/SidebarMenuItemLink';
import { computed, getCurrentInstance } from 'vue';
import injectStrict from '@/shared/validators/vue/inject-strict.vue.validator';
import { SidebarMenuProviderKey } from '../../providers/SidebarMenu.provider';

export default function useSidebarMenuItemLink(
  props: TSidebarMenuItemLinkProps,
): TUseSidebarMenuItemLinkReturn {
  const { cssClass } = injectStrict(SidebarMenuProviderKey);

  // SSR-safe router detection
  const instance = getCurrentInstance();
  const hasRouter = computed(() => !!instance?.appContext.config.globalProperties.$route);
  const route = computed(() => instance?.appContext.config.globalProperties.$route);

  const isExternal = (href: string) => /^https?:\/\//.test(href);

  const renderType = computed(() => {
    if (props.item.href) {
      if (props.item.native) return 'native';
      if (isExternal(props.item.href) || !hasRouter.value) return 'external';
      return 'internal';
    }
    return 'text';
  });

  const isLinkActive = computed(() => {
    if (
      (renderType.value === 'internal' || renderType.value === 'native') &&
      hasRouter.value &&
      route &&
      typeof props.item.href === 'string'
    ) {
      return route.value.path === props.item.href;
    }
    return false;
  });

  const componentClasses = computed(() => {
    const base = cssClass;

    const link = `${base}__link`;
    const textual = !props.item.href ? `${link}-textual` : undefined;
    const weblink = props.item.href ? `${link}-weblink` : undefined;
    const weblinkActive = isLinkActive.value ? `${link}--active` : undefined;
    const category =
      props.item.children && props.item.children.length ? `${link}-category` : undefined;

    return [link, textual, weblink, category, weblinkActive].filter(Boolean).join(' ');
  });

  return {
    renderType,
    isLinkActive,
    componentClasses,
  };
}
