import type { TTagProps } from '../../Tag';
import type { TUseTagReturn } from './useTag.types';
import { computed } from 'vue';

export default function useTag(props: TTagProps): TUseTagReturn {
  const componentClasses = computed(() => {
    const base = props.cssClass;

    const theme = `${base}--theme`;
    const size = props.size ? `${base}--${props.size}` : undefined;
    const rounded = props.rounded ? `${base}--rounded` : undefined;
    const modifier = props.modifier ? `${base}--${props.modifier}` : undefined;

    return [base, theme, size, rounded, modifier].filter(Boolean).join(' ');
  });

  return {
    componentClasses,
  };
}
