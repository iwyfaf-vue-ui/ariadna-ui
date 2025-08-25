<template>
  <Previewer :component="DemoDefault" :component-source="DemoDefaultSource">
    <template #header> Обычное применение </template>

    <template #description>
      Composable-функция принимает первым параметром массив реактивных ссылок (Ref или ComputedRef)
      на DOM-элемент. Вторым параметром необязательную callback-функцию, которая возвращает
      результат вычислений Composable-функции.
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
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
import Previewer from '@iwyfaf-vue-ui/ariadna-ui/Previewer';

// Demos
import DemoDefault from './demos/demo.default.vue';
import DemoDefaultSource from './demos/demo.default.vue?raw';

definePageMeta({
  title: 'useElementSize',
  layout: 'default',
});

useHead({
  title: 'useElementSize',
});
</script>
