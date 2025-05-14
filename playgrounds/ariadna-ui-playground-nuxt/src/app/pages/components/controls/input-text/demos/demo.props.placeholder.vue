<template>
  <InputText
    v-model="inputTextValue"
    label="Placeholder from props"
    placeholder="Placeholder from props"
  />
</template>

<script setup lang="ts">
// Components
import InputText from '@iwyfaf-vue-ui/ariadna-ui/InputText';

const inputTextValue = ref(null);
</script>
