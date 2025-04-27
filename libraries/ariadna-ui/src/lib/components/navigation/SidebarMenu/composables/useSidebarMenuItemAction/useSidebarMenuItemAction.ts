import type { TUseSidebarMenuItemActionReturn } from './useSidebarMenuItemAction.types';
import { computed } from 'vue';
import injectStrict from '@/shared/validators/vue/inject-strict.vue.validator';
import { SidebarMenuProviderKey } from '../../providers/SidebarMenu.provider';
import type { TSidebarMenuItemActionProps } from '../../components/SidebarMenuItemAction/SidebarMenuItemAction';

export default function useSidebarMenuItemAction(
  props: TSidebarMenuItemActionProps,
): TUseSidebarMenuItemActionReturn {
  const { cssClass } = injectStrict(SidebarMenuProviderKey);

  const isActionString = computed(() => typeof props.actionIcon === 'string');

  const componentClasses = computed(() => {
    const base = cssClass;

    const action = `${base}__action`;

    return [action].filter(Boolean).join(' ');
  });

  return {
    isActionString,
    componentClasses,
  };
}
