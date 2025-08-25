<template>
  <div style="display: flex; flex-direction: column">
    <div style="display: flex; flex-direction: column; gap: 24px">
      <div
        v-for="(style, idx) in boxStyles"
        :key="idx"
        :ref="setElRef(idx) as VNodeRef"
        contenteditable="true"
        style="
          resize: both;
          overflow: auto;
          border: 2px solid #42b983;
          padding: 16px;
          width: 300px;
          height: 150px;
          margin-bottom: 16px;
        "
      >
        <div>
          Box {{ idx + 1 }}
          <p>Изменяйте размер этого блока мышью, чтобы увидеть обновление размеров.</p>
        </div>
      </div>
    </div>

    <div>
      <h4>Sizes:</h4>
      <pre>{{ JSON.stringify(sizes, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue
import type { VNodeRef } from 'vue';
import { ref, onMounted } from 'vue';

// Composables
import useElementsSizes from '@iwyfaf-vue-ui/ariadna-ui/useElementsSizes';

const boxStyles = ref([
  { width: 120, height: 80, scrollWidth: 160, scrollHeight: 120 },
  { width: 180, height: 100, scrollWidth: 200, scrollHeight: 140 },
]);

const elRefs = ref<(HTMLElement | undefined)[]>([]);

function setElRef(idx: number) {
  return (el: HTMLElement | null) => {
    if (el) {
      return (elRefs.value[idx] = el);
    }
  };
}

const { sizes } = useElementsSizes(elRefs as Ref<HTMLElement[]>, (sizes) => {
  sizes.forEach((size) => {
    console.log('Размеры изменились:', {
      width: size.width,
      height: size.height,
      scrollWidth: size.scrollWidth,
      scrollHeight: size.scrollHeight,
    });
  });
});

onMounted(() => {
  elRefs.value = Array(boxStyles.value.length);
});
</script>
