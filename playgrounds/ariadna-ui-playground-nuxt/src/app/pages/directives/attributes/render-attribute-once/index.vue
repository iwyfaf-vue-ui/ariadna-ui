<template>
  <Previewer :component="DemoExampleNoDirective" :component-source="DemoExampleNoDirectiveSource">
    <template #header> Пример без директивы </template>

    <template #description> В консоли браузера будут ошибки гидратации. </template>

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

  <Previewer
    :component="DemoExampleWithDirective"
    :component-source="DemoExampleWithDirectiveSource"
  >
    <template #header> Пример работы директивы </template>

    <template #description>
      При применении директивы, ошибок гидратации в консоли браузера не будет.
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
import DemoExampleNoDirective from './demos/demo.example.no-directive.vue';
import DemoExampleNoDirectiveSource from './demos/demo.example.no-directive.vue?raw';
import DemoExampleWithDirective from './demos/demo.example.with-directive.vue';
import DemoExampleWithDirectiveSource from './demos/demo.example.with-directive.vue?raw';

definePageMeta({
  title: 'RenderAttributeOnce',
  layout: 'default',
});

useHead({
  title: 'RenderAttributeOnce',
});
</script>
