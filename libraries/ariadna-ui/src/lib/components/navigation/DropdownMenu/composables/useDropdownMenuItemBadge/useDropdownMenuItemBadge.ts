import { computed } from 'vue';
import type { TDropdownMenuItemBadgeProps } from '../../components/DropdownMenuItemBadge/DropdownMenuItemBadge';
import type { TUseDropdownMenuItemBadgeReturn } from './useDropdownMenuItemBadge.types';
import injectStrict from '@/shared/validators/vue/inject-strict.vue.validator';
import { DropdownMenuProviderKey } from '../../providers/DropdownMenu.provider';

/**
 * Composable for `DropdownMenuItemBadge`.
 * Derives whether the badge is a primitive value or a Vue component and computes BEM CSS classes.
 */
export default function useDropdownMenuItemBadge(
  props: TDropdownMenuItemBadgeProps,
): TUseDropdownMenuItemBadgeReturn {
  const { cssClass } = injectStrict(DropdownMenuProviderKey);

  const isBadgeNotComponent = computed(
    () => typeof props.badge === 'string' || typeof props.badge === 'number',
  );

  const componentClasses = computed(() => `${cssClass}__badge`);

  return {
    isBadgeNotComponent,
    componentClasses,
  };
}
