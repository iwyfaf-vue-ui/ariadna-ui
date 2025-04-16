import type { TUseSpinnerReturn } from '../useSpinner/useSpinner.types';
import type { TSpinnerProps } from '../../Spinner';
import { computed } from 'vue';

export default function useSpinner(props: TSpinnerProps): TUseSpinnerReturn {
  const componentClasses = computed(() => {
    const base = props.cssClass;

    const theme = `${base}--theme`;
    const size = props.size ? `${base}--${props.size}` : undefined;
    const modifier = props.modifier ? `${base}--${props.modifier}` : undefined;

    return [base, theme, size, modifier].filter(Boolean).join(' ');
  });

  return {
    componentClasses,
  };
}
