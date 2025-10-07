<template>
  <InputPassword
    v-model="inputPasswordValue"
    label="Placeholder from prop will be ignored"
    placeholder="Placeholder from props"
  >
    <template #placeholder> Placeholder from slot. </template>
  </InputPassword>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputPassword from '@iwyfaf-vue-ui/ariadna-ui/InputPassword';

const inputPasswordValue = ref(null);
</script>
