<template>
  <VirtualScroller ref="virtualScroller" :items="data" :item-height="42" :height="500" />

  <Button @click="scrollToRandomData">Scroll to random data</Button>

  <div>
    <p>Start visible index {{ visibleIndexes.start }}</p>
    <p>End visible index {{ visibleIndexes.end }}</p>
  </div>
</template>

<script setup lang="ts">
// Vue
import { ref, useTemplateRef, onMounted } from 'vue';

// Components
import VirtualScroller from '@iwyfaf-vue-ui/ariadna-ui/VirtualScroller';
import type { TVirtualScrollerIndexes } from '@iwyfaf-vue-ui/ariadna-ui/VirtualScroller';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

const virtualScrollerRef = useTemplateRef('virtualScroller');

const data = ref<Array<string>>(Array.from({ length: 100000 }, (_, index) => `Item ${index + 1}`));
const visibleIndexes: Ref<TVirtualScrollerIndexes> = ref({
  start: 0,
  end: 0,
});

function scrollToRandomData() {
  if (!virtualScrollerRef.value) {
    return;
  }

  virtualScrollerRef.value.scrollTo(Math.floor(Math.random() * data.value.length));
  visibleIndexes.value = virtualScrollerRef.value.getVisibleIndexes();
}

onMounted(() => {
  if (!virtualScrollerRef.value) {
    return;
  }

  visibleIndexes.value = virtualScrollerRef.value.getVisibleIndexes();
});
</script>
