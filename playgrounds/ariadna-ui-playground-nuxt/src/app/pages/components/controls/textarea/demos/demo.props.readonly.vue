<template>
  <Textarea v-model="textareaValue" label="Readonly is true" readonly />
  <Textarea v-model="textareaValue" label="Readonly is false" :readonly="false" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Textarea from '@iwyfaf-vue-ui/ariadna-ui/Textarea';

const textareaValue = ref(null);
</script>
