import type { TUseSidebarMenuItemIconReturn } from './useSidebarMenuItemIcon.types';
import type { TSidebarMenuItemIconProps } from '../../components/SidebarMenuItemIcon/SidebarMenuItemIcon';
import { computed } from 'vue';
import injectStrict from '@/shared/validators/vue/inject-strict.vue.validator';
import { SidebarMenuProviderKey } from '../../providers/SidebarMenu.provider';

export default function useSidebarMenuItemIcon(
  props: TSidebarMenuItemIconProps,
): TUseSidebarMenuItemIconReturn {
  const { cssClass } = injectStrict(SidebarMenuProviderKey);

  const isIconString = computed(() => typeof props.icon === 'string');

  const componentClasses = computed(() => {
    const base = cssClass;

    const icon_custom = isIconString.value ? props.icon : undefined;
    const icon = `${base}__icon`;

    return [icon_custom, icon].filter(Boolean).join(' ');
  });

  return {
    isIconString,
    componentClasses,
  };
}
