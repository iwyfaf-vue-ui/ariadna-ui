<template>
  <Previewer :component="_example" :component-source="_exampleRaw"></Previewer>
</template>

<script setup lang="ts">
// Components
import Previewer from '@iwyfaf-vue-ui/ariadna-ui/Previewer';

// Examples
import _example from './_example.vue';
import _exampleRaw from './_example.vue?raw';
</script>
