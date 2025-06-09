<template>
  <Tabs
    :tabs="tabs"
    :active-key-by-default="route.query['tab'] as string"
    @change="onChangeTab"
  ></Tabs>
</template>

<script setup lang="ts">
// Vue
import { useRoute, useRouter } from 'vue-router';

// Components
import Tabs from '@iwyfaf-vue-ui/ariadna-ui/Tabs';

// Types
import type { TTabsEmitsChange } from '@iwyfaf-vue-ui/ariadna-ui/Tabs';

const route = useRoute();
const router = useRouter();

const tabs = [
  {
    title: 'Item I',
  },
  {
    title: 'Item II',
  },
  {
    title: 'Item III',
  },
];

const onChangeTab = async (payload: TTabsEmitsChange) => {
  await router.replace({
    hash: `#${payload.key}`,
    query: {
      ...route.query,
      tab: payload.key,
    },
  });
};
</script>
