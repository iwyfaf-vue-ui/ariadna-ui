<template>
  <label for="textarea-1">Нативный textarea</label>
  <textarea v-model="textareaValue" v-textarea-auto-height id="textarea-1" />

  <Textarea v-model="textareaValue" v-textarea-auto-height label="Компонент Textarea" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Textarea from '@iwyfaf-vue-ui/ariadna-ui/Textarea';

// Directives
import vTextareaAutoHeight from '@iwyfaf-vue-ui/ariadna-ui/TextareaAutoHeight';

const textareaValue = ref(null);
</script>
