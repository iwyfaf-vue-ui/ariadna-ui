<template>
  <InputPassword v-model="inputPasswordValue" label="Size is small" controls size="small" />
  <InputPassword v-model="inputPasswordValue" label="Size is medium" controls size="medium" />
  <InputPassword v-model="inputPasswordValue" label="Size is large" controls size="large" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputPassword from '@iwyfaf-vue-ui/ariadna-ui/InputPassword';

const inputPasswordValue = ref(null);
</script>
