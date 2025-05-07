<template>
  <label v-render-attribute-once="{ for: randomId }"></label>
  <input type="text" v-render-attribute-once="{ id: randomId }" />
</template>

<script setup lang="ts">
// Directives
import vRenderAttributeOnce from '@iwyfaf-vue-ui/ariadna-ui/RenderAttributeOnce';

const randomId = (Math.random() + 1).toString(36).substring(7);
</script>
