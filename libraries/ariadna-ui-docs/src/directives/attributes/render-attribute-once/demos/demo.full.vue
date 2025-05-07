<template>
  <p>Текущее значение атрибутов: {{ randomId }}</p>

  <div style="display: flex; flex-direction: column">
    <label :for="randomId">No directive</label>
    <textarea :id="randomId" />
  </div>

  <div style="display: flex; flex-direction: column">
    <label v-render-attribute-once="{ for: randomId }">With directive</label>
    <textarea v-render-attribute-once="{ id: randomId }" />
  </div>

  <Button @click="reRenderAttribute">Обновить значение атрибутов</Button>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Directives
import vRenderAttributeOnce from '@iwyfaf-vue-ui/ariadna-ui/RenderAttributeOnce';

const randomId = ref(randomize());

function randomize() {
  return (Math.random() + 1).toString(36).substring(7);
}

function reRenderAttribute() {
  randomId.value = randomize();
}
</script>
