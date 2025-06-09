<template>
  <div>
    <div
      ref="box"
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
      Изменяйте размер этого блока мышью, чтобы увидеть обновление размеров.
    </div>

    <ul>
      <li>Ширина (offsetWidth): {{ width }}</li>
      <li>Высота (offsetHeight): {{ height }}</li>
      <li>Прокручиваемая ширина (scrollWidth): {{ scrollWidth }}</li>
      <li>Прокручиваемая высота (scrollHeight): {{ scrollHeight }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// Vue
import { useTemplateRef } from 'vue';

// Composables
import useElementSize from '@iwyfaf-vue-ui/ariadna-ui/useElementSize';

const boxRef = useTemplateRef('box');

const { width, height, scrollWidth, scrollHeight } = useElementSize(boxRef, 200, (sizes) => {
  console.log('Размеры изменились:', {
    width: sizes.width.value,
    height: sizes.height.value,
    scrollWidth: sizes.scrollWidth.value,
    scrollHeight: sizes.scrollHeight.value,
  });
});
</script>
