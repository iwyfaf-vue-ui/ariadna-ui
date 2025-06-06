<template>
  <Timeline :events="events" key-property="status">
    <template #event="{ event }: { event: TTimelineExample }">
      {{ event.status }}
    </template>

    <template #opposite="{ event }: { event: TTimelineExample }">
      {{ event.date }}
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
  date: string;
  img: string;
};

const events = reactive<Array<TTimelineExample>>([
  {
    position: 'left',
    status: 'Ordered',
    date: '15/10/2020 10:30',
    img: 'https://dummyimage.com/200x200/000/fff.jpg',
  },
  {
    position: 'left',
    status: 'Processing',
    date: '15/10/2020 10:30',
    img: 'https://dummyimage.com/200x200/000/fff.jpg',
  },
  {
    position: 'left',
    status: 'Shipped',
    date: '15/10/2020 10:30',
    img: 'https://dummyimage.com/200x200/000/fff.jpg',
  },
  {
    position: 'left',
    status: 'Delivered',
    date: '15/10/2020 10:30',
    img: 'https://dummyimage.com/200x200/000/fff.jpg',
  },
]);
</script>
