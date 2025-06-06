import { computed, watchEffect } from 'vue';
import type { TTimelineEvent, TTimelineProps } from '../../Timeline';
import type { TUseTimelineReturn } from './useTimeline.types';
import { ELibraryConfig } from '@/types/internal';
import { ETimelineConfig, ETimelineErrors } from '../../types/Timeline.enums';

export default function useTimeline<Data extends TTimelineEvent>(
  props: TTimelineProps<Data>,
): TUseTimelineReturn {
  const componentClasses = computed(() => {
    const base = props.cssClass;

    const theme = `${base}--theme`;
    const modifier = props.modifier ? `${base}--${props.modifier}` : undefined;

    return [base, theme, modifier].filter(Boolean).join(' ');
  });

  watchEffect(() => {
    props.events.forEach((event) => {
      if (!event.hasOwnProperty(props.keyProperty as keyof TTimelineEvent)) {
        throw new Error(
          `${ELibraryConfig.NAME}(${ETimelineConfig.NAME}): ${ETimelineErrors.KEY_PROPERTY_ERROR} (${props.keyProperty})`,
        );
      }
    });
  });

  return {
    componentClasses,
  };
}
