<template>
  <InputText
    v-model="inputTextValue"
    label="Placeholder from prop will be ignored"
    placeholder="Placeholder from props"
  >
    <template #placeholder> Placeholder from slot. </template>
  </InputText>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputText from '@iwyfaf-vue-ui/ariadna-ui/InputText';

const inputTextValue = ref(null);
</script>
