<template>
  <InputPassword v-model="inputPasswordValue" label="Disabled is on" disabled />
  <InputPassword v-model="inputPasswordValue" label="Disabled is off" :disabled="false" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputPassword from '@iwyfaf-vue-ui/ariadna-ui/InputPassword';

const inputPasswordValue = ref(null);
</script>
