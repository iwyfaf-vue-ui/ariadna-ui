<template>
  <Timeline :events="events" key-property="status">
    <template #event="{ event }: { event: TTimelineExample }">
      {{ event.status }}
    </template>
  </Timeline>
</template>

<script setup lang="ts">
// Vue
import { reactive } from 'vue';

// Components
import Timeline from '@iwyfaf-vue-ui/ariadna-ui/Timeline';

// Types
import type { TTimelineEvent } from '@iwyfaf-vue-ui/ariadna-ui/Timeline';

type TTimelineExample = TTimelineEvent & {
  status: 'Ordered' | 'Processing' | 'Shipped' | 'Delivered';
};

const events = reactive<Array<TTimelineExample>>([
  {
    position: 'left',
    status: 'Ordered',
  },
  {
    position: 'right',
    status: 'Processing',
  },
  {
    position: 'left',
    status: 'Shipped',
  },
  {
    position: 'right',
    status: 'Delivered',
  },
]);
</script>
