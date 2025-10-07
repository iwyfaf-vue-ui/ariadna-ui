<template>
  <InputPassword
    v-model="inputPasswordValue"
    label="Placeholder from props"
    placeholder="Placeholder from props"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputPassword from '@iwyfaf-vue-ui/ariadna-ui/InputPassword';

const inputPasswordValue = ref(null);
</script>
