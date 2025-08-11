import { computed, useId } from 'vue';
import type { TVideoProps } from '../../Video';
import type { TUseVideoReturn } from './useVideo.types';

export default function useVideo(props: TVideoProps): TUseVideoReturn {
  const uniqueID = computed(() => useId());

  const componentClasses = computed(() => {
    const base = props.cssClass;

    const theme = `${base}--theme`;

    return [base, theme].filter(Boolean).join(' ');
  });

  return {
    uniqueID,
    componentClasses,
  };
}
