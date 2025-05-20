<template>
  <Textarea v-model="textareaValue" label="Valid is on" valid />
  <Textarea v-model="textareaValue" label="Valid is off" :valid="false" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Textarea from '@iwyfaf-vue-ui/ariadna-ui/Textarea';

const textareaValue = ref(null);
</script>
