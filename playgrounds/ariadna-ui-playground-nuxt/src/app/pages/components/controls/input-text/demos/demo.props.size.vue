<template>
  <InputText v-model="inputTextValue" label="Size is small" size="small" />
  <InputText v-model="inputTextValue" label="Size is medium" size="medium" />
  <InputText v-model="inputTextValue" label="Size is large" size="large" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputText from '@iwyfaf-vue-ui/ariadna-ui/InputText';

const inputTextValue = ref(null);
</script>
