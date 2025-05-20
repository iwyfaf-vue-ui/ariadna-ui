<template>
  <Textarea v-model="textareaValue" label="Custom cssClass" css-class="custom-textarea" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Textarea from '@iwyfaf-vue-ui/ariadna-ui/Textarea';

const textareaValue = ref(null);
</script>
