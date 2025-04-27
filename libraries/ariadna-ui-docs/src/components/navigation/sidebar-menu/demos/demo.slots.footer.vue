<template>
  <div style="display: flex; height: 50vh">
    <SidebarMenu :data="data">
      <template #footer> Footer slot content </template>
    </SidebarMenu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import SidebarMenu from '@iwyfaf-vue-ui/ariadna-ui/SidebarMenu';
import type { TSidebarMenuItem } from '@iwyfaf-vue-ui/ariadna-ui/SidebarMenu';

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
</script>
