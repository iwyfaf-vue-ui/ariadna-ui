import { computed } from 'vue';
import type { TDropdownMenuItemIconProps } from '../../components/DropdownMenuItemIcon/DropdownMenuItemIcon';
import type { TUseDropdownMenuItemIconReturn } from './useDropdownMenuItemIcon.types';
import injectStrict from '@/shared/validators/vue/inject-strict.vue.validator';
import { DropdownMenuProviderKey } from '../../providers/DropdownMenu.provider';

/**
 * Composable for `DropdownMenuItemIcon`.
 * Derives whether the icon is a string or a Vue component and computes BEM CSS classes.
 */
export default function useDropdownMenuItemIcon(
  props: TDropdownMenuItemIconProps,
): TUseDropdownMenuItemIconReturn {
  const { cssClass } = injectStrict(DropdownMenuProviderKey);

  const isIconString = computed(() => typeof props.icon === 'string');

  const componentClasses = computed(() => `${cssClass}__icon`);

  return {
    isIconString,
    componentClasses,
  };
}
