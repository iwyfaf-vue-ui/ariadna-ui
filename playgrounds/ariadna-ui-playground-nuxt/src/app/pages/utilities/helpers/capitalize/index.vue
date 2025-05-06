<template>
  <Previewer :component="DemoExampleFull" :component-source="DemoExampleFullSource">
    <template #header> Пример всего функционала </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>
</template>

<script setup lang="ts">
// Components
import Previewer from '@iwyfaf-vue-ui/ariadna-ui/Previewer';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

// Demos
import DemoExampleFull from './demos/demo.example.full.vue';
import DemoExampleFullSource from './demos/demo.example.full.vue?raw';

definePageMeta({
  title: 'Capitalize',
  layout: 'default',
});

useHead({
  title: 'Capitalize',
});
</script>
