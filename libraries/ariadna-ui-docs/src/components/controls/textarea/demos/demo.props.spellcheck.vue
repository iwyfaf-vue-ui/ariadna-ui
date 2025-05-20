<template>
  <Textarea v-model="textareaValue" label="Spellcheck is true" spellcheck />
  <Textarea v-model="textareaValue" label="Spellcheck is false" :spellcheck="false" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Textarea from '@iwyfaf-vue-ui/ariadna-ui/Textarea';

const textareaValue = ref(null);
</script>
