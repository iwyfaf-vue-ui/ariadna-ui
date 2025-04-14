import type { TBadgeProps } from '../../Badge';
import type { TUseBadgeReturn } from './useBadge.types';
import { computed } from 'vue';

export default function useBadge(props: TBadgeProps): TUseBadgeReturn {
  const componentClasses = computed(() => {
    const base = props.cssClass;

    const theme = `${base}--theme`;
    const size = props.size ? `${base}--${props.size}` : undefined;
    const rounded = props.rounded ? `${base}--rounded` : undefined;
    const floating = props.floating ? `${base}--floating` : undefined;
    const modifier = props.modifier ? `${base}--${props.modifier}` : undefined;

    return [base, theme, size, rounded, floating, modifier].filter(Boolean).join(' ');
  });

  return {
    componentClasses,
  };
}
