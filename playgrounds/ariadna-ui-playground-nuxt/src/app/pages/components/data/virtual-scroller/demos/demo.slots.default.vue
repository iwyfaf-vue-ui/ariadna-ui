<template>
  <VirtualScroller :items="data" :item-height="60" :height="500">
    <template #default="{ item }"> {{ item.index }} - {{ item.data }} </template>
  </VirtualScroller>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import VirtualScroller from '@iwyfaf-vue-ui/ariadna-ui/VirtualScroller';

const data = ref<Array<string>>(Array.from({ length: 100000 }, (_, index) => `Item ${index + 1}`));
</script>
