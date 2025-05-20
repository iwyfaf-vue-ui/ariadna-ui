<template>
  <Textarea v-model="textareaValue" label="Disabled is true" disabled />
  <Textarea v-model="textareaValue" label="Disabled is false" :disabled="false" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Textarea from '@iwyfaf-vue-ui/ariadna-ui/Textarea';

const textareaValue = ref(null);
</script>
