<template>
  <VirtualScroller ref="virtualScroller" :items="data" :item-height="42" :height="500" />

  <Button @click="scrollToRandomData">Scroll to random data</Button>
</template>

<script setup lang="ts">
// Vue
import { ref, useTemplateRef } from 'vue';

// Components
import VirtualScroller from '@iwyfaf-vue-ui/ariadna-ui/VirtualScroller';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

const virtualScrollerRef = useTemplateRef('virtualScroller');

const data = ref<Array<string>>(Array.from({ length: 100000 }, (_, index) => `Item ${index + 1}`));

function scrollToRandomData() {
  if (!virtualScrollerRef.value) {
    return;
  }

  virtualScrollerRef.value.scrollTo(Math.floor(Math.random() * data.value.length));
}
</script>
