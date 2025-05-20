<template>
  <Textarea
    v-model="textareaValue"
    label="Placeholder from props"
    placeholder="Placeholder from props"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Textarea from '@iwyfaf-vue-ui/ariadna-ui/Textarea';

const textareaValue = ref(null);
</script>
