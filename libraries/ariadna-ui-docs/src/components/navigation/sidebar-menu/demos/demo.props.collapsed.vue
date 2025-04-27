<template>
  <button @click="toggleCollapse">Collapse</button>

  <div style="display: flex; height: 50vh">
    <SidebarMenu v-model:collapsed="collapsedState" :data="data" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import SidebarMenu from '@iwyfaf-vue-ui/ariadna-ui/SidebarMenu';
import type { TSidebarMenuItem } from '@iwyfaf-vue-ui/ariadna-ui/SidebarMenu';

const collapsedState = ref(false);
const data = ref<Array<TSidebarMenuItem>>([
  {
    title: 'Item 1',
    href: '#',
  },
  {
    title: 'Item 2',
    href: '#',
    children: [
      {
        title: 'Item 1',
        href: '#',
      },
      {
        title: 'Item 2',
        href: '#',
      },
    ],
  },
]);

function toggleCollapse() {
  collapsedState.value = !collapsedState.value;
}
</script>
