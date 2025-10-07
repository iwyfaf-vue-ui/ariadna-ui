<template>
  <InputPassword v-model="inputPasswordValue" label="Invalid is on" invalid />
  <InputPassword v-model="inputPasswordValue" label="Invalid is off" :invalid="false" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputPassword from '@iwyfaf-vue-ui/ariadna-ui/InputPassword';

const inputPasswordValue = ref(null);
</script>
