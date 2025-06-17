<template>
  <Previewer :component="DemoFull" :component-source="DemoFullSource">
    <template #header> Пример полного функционала </template>

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
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
import Previewer from '@iwyfaf-vue-ui/ariadna-ui/Previewer';

// Demos
import DemoFull from './demos/demo.full.vue';
import DemoFullSource from './demos/demo.full.vue?raw';

definePageMeta({
  title: 'MobileMenu',
  layout: 'default',
});

useHead({
  title: 'MobileMenu',
});
</script>
