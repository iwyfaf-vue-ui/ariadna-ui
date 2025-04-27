import type { TUseSidebarMenuItemBadgeReturn } from './useSidebarMenuItemBadge.types';
import type { TSidebarMenuItemBadgeProps } from '../../components/SidebarMenuItemBadge/SidebarMenuItemBadge';
import { computed } from 'vue';
import injectStrict from '@/shared/validators/vue/inject-strict.vue.validator';
import { SidebarMenuProviderKey } from '../../providers/SidebarMenu.provider';

export default function useSidebarMenuItemBadge(
  props: TSidebarMenuItemBadgeProps,
): TUseSidebarMenuItemBadgeReturn {
  const { cssClass } = injectStrict(SidebarMenuProviderKey);

  const isBadgeNotComponent = computed(
    () =>
      (typeof props.badge === 'string' || typeof props.badge === 'number') &&
      typeof props.badge !== 'object' &&
      typeof props.badge !== 'function',
  );

  const componentClasses = computed(() => {
    const base = cssClass;

    const icon = `${base}__badge`;

    return [icon].filter(Boolean).join(' ');
  });

  return {
    isBadgeNotComponent,
    componentClasses,
  };
}
