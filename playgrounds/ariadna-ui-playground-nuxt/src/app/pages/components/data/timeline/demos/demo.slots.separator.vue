<template>
  <Timeline :events="events">
    <template #separator> 💩 </template>
  </Timeline>
</template>

<script setup lang="ts">
// Vue
import { reactive } from 'vue';

// Components
import Timeline from '@iwyfaf-vue-ui/ariadna-ui/Timeline';

// Types
import type { TTimelineEvent } from '@iwyfaf-vue-ui/ariadna-ui/Timeline';

const events = reactive<Array<TTimelineEvent>>([
  {
    position: 'left',
    name: 'Событие 1',
  },
  {
    position: 'right',
    name: 'Событие 2',
  },
  {
    position: 'left',
    name: 'Событие 3',
  },
  {
    position: 'right',
    name: 'Событие 4',
  },
  {
    position: 'left',
    name: 'Событие 5',
  },
  {
    position: 'right',
    name: 'Событие 6',
  },
]);
</script>
