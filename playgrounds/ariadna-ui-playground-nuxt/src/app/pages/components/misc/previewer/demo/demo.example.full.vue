<template>
  <Previewer :component="_previewerExample" :component-source="_previewerExampleSource">
    <template #header> Заголовок примера. </template>

    <template #description> Описание примера. </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler">
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

// Examples
import _previewerExample from './example.vue';
import _previewerExampleSource from './example.vue?raw';
</script>
