<template>
  <Previewer :component="DemoExampleDefault" :component-source="DemoExampleDefaultSource">
    <template #header> Функционал по умолчанию </template>

    <template #description>
      Сработает сразу debounce, спустя 500 мс будет вызвана функция.
    </template>

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

  <Previewer :component="DemoExampleLeading" :component-source="DemoExampleLeadingSource">
    <template #header> С параметром leading </template>

    <template #description>
      С параметром leading, сработает сразу на первый ввод, потом будет debounce.
    </template>

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
import DemoExampleDefault from './demos/demo.example.default.vue';
import DemoExampleDefaultSource from './demos/demo.example.default.vue?raw';
import DemoExampleLeading from './demos/demo.example.leading.vue';
import DemoExampleLeadingSource from './demos/demo.example.leading.vue?raw';

definePageMeta({
  title: 'Debounce',
  layout: 'default',
});

useHead({
  title: 'Throttle',
});
</script>
