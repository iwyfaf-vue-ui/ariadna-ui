<template>
  <Previewer :component="DemoExampleDefault" :component-source="DemoExampleDefaultSource">
    <template #header> Пример функционала </template>

    <template #description>
      Цвет плашек будет меняться каждый раз при перемещении курсора по ним, но с разной
      периодичностью.
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

definePageMeta({
  title: 'Throttle',
  layout: 'default',
});

useHead({
  title: 'Throttle',
});
</script>
