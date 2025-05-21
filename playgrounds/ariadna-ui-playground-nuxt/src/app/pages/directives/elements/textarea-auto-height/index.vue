<template>
  <Previewer :component="DemoDefaultTextarea" :component-source="DemoDefaultTextareaSource">
    <template #header> Дефолтное применение </template>

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

  <Previewer :component="DemoThrottleTextarea" :component-source="DemoThrottleTextareaSource">
    <template #header> Применение с различным троттлингом </template>

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
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
import Previewer from '@iwyfaf-vue-ui/ariadna-ui/Previewer';

// Demos
import DemoDefaultTextarea from './demos/demo.default.textarea.vue';
import DemoDefaultTextareaSource from './demos/demo.default.textarea.vue?raw';
import DemoThrottleTextarea from './demos/demo.throttle.textarea.vue';
import DemoThrottleTextareaSource from './demos/demo.throttle.textarea.vue?raw';

definePageMeta({
  title: 'TextareaAutoHeight',
  layout: 'default',
});

useHead({
  title: 'TextareaAutoHeight',
});
</script>
