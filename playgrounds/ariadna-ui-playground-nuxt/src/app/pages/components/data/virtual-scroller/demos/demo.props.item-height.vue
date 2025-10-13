<template>
  <VirtualScroller :items="data" :item-height="60" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import VirtualScroller from '@iwyfaf-vue-ui/ariadna-ui/VirtualScroller';

const data = ref<Array<string>>(Array.from({ length: 100000 }, (_, index) => `Item ${index + 1}`));
</script>

<style lang="scss" scoped>
$virtual-scroller: '.ar-virtual-scroller';

// .ar-virtual-scroller__item
:deep(#{$virtual-scroller}__item) {
  height: var(--ar-virtual-scroller-item-height);
  background-color: #1a2843;
  border-bottom: 2px solid #1d3733;
}
</style>
