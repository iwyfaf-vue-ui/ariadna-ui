<template>
  <Textarea
    v-model="textareaValue"
    label="Placeholder from prop will be ignored"
    placeholder="Placeholder from props"
  >
    <template #placeholder> Placeholder from slot. </template>
  </Textarea>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Textarea from '@iwyfaf-vue-ui/ariadna-ui/Textarea';

const textareaValue = ref(null);
</script>
