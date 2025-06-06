<template>
  <div :class="componentClasses">
    <div
      :class="{
        [`${props.cssClass}__event`]: true,
        [`${props.cssClass}__event--first`]: index === 0,
        [`${props.cssClass}__event--last`]: index === props.events.length - 1,
      }"
      v-for="(event, index) in props.events"
      :key="event[props.keyProperty as keyof Data] as string"
    >
      <template v-if="event.position === 'right'">
        <div
          v-if="!!slots.opposite"
          :class="`${props.cssClass}__event-opposite ${props.cssClass}__event-opposite--${event.position}`"
        >
          <slot name="opposite" :event="event" :index="index" />
        </div>

        <div v-else :class="`${props.cssClass}__event-spacer`"></div>
      </template>

      <div
        v-if="event.position === 'left'"
        :class="`${props.cssClass}__event-content ${props.cssClass}__event-content--${event.position}`"
      >
        <slot name="event" :event="event" :index="index">
          {{ event[props.keyProperty as keyof TTimelineEvent] }}
        </slot>
      </div>

      <div :class="`${props.cssClass}__event-separator`">
        <slot v-if="!!slots.separator" name="separator" :event="event" :index="index"></slot>
      </div>

      <template v-if="event.position === 'left'">
        <div
          v-if="!!slots.opposite"
          :class="`${props.cssClass}__event-opposite ${props.cssClass}__event-opposite--${event.position}`"
        >
          <slot name="opposite" :event="event" :index="index" />
        </div>

        <div v-else :class="`${props.cssClass}__event-spacer`"></div>
      </template>

      <div
        v-if="event.position === 'right'"
        :class="`${props.cssClass}__event-content ${props.cssClass}__event-content--${event.position}`"
      >
        <slot name="event" :event="event" :index="index">
          {{ event[props.keyProperty as keyof TTimelineEvent] }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="Data extends TTimelineEvent">
// Types
import type { TTimelineProps, TTimelineSlots } from '../Timeline/Timeline';
import type { TTimelineEvent } from './types/Timeline.types';
import { ETimelinePropsDefault } from '../Timeline/types/Timeline.enums';

// Composables
import useTimeline from './composables/useTimeline/useTimeline';

const props = withDefaults(defineProps<TTimelineProps<Data>>(), {
  events: () => [] as Array<Data>,
  keyProperty: ETimelinePropsDefault.KEY_PROPERTY,
  cssClass: ETimelinePropsDefault.CSS_CLASS,
});
const slots = defineSlots<TTimelineSlots<Data>>();

const { componentClasses } = useTimeline<Data>(props);
</script>
