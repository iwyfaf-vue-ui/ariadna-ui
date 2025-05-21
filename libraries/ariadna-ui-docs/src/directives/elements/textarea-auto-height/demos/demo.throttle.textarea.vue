<template>
  <label for="textarea-1">Throttle 1000ms</label>
  <textarea v-model="textareaValue1" v-textarea-auto-height="{ timeout: 1000 }" id="textarea-1" />

  <Textarea
    v-model="textareaValue2"
    v-textarea-auto-height="{ timeout: 1000 }"
    label="Throttle 1000ms"
  />

  <label for="textarea-2">Throttle 0ms</label>
  <textarea v-model="textareaValue3" v-textarea-auto-height="{ timeout: 0 }" id="textarea-2" />

  <Textarea v-model="textareaValue4" v-textarea-auto-height="{ timeout: 0 }" label="Throttle 0ms" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Textarea from '@iwyfaf-vue-ui/ariadna-ui/Textarea';

// Directives
import vTextareaAutoHeight from '@iwyfaf-vue-ui/ariadna-ui/TextareaAutoHeight';

const textareaValue1 = ref(null);
const textareaValue2 = ref(null);
const textareaValue3 = ref(null);
const textareaValue4 = ref(null);
</script>
