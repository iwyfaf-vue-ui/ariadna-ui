<template>
  <Textarea v-model="textareaValue" label="Invalid is on" invalid />
  <Textarea v-model="textareaValue" label="Invalid is off" :invalid="false" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Textarea from '@iwyfaf-vue-ui/ariadna-ui/Textarea';

const textareaValue = ref(null);
</script>
