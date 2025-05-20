<template>
  <Textarea v-model="textareaValue" label="Autocomplete is on" autocomplete />
  <Textarea v-model="textareaValue" label="Autocomplete is off" :autocomplete="false" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Textarea from '@iwyfaf-vue-ui/ariadna-ui/Textarea';

const textareaValue = ref(null);
</script>
