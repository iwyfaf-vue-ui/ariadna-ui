<template>
  <Previewer :component="_example" :component-source="_exampleRaw">
    <template #source="{ source }">
      <pre><code>{{ source }}</code></pre>
    </template>
  </Previewer>
</template>

<script setup lang="ts">
// Components
import Previewer from '@iwyfaf-vue-ui/ariadna-ui/Previewer';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

// Examples
import _example from './_example.vue';
import _exampleRaw from './_example.vue?raw';
</script>
