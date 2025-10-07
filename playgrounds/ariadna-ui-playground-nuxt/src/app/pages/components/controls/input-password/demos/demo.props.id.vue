<template>
  <InputPassword v-model="inputPasswordValue" label="Default id" />
  <InputPassword v-model="inputPasswordValue" label="Custom id" id="custom-id" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputPassword from '@iwyfaf-vue-ui/ariadna-ui/InputPassword';

const inputPasswordValue = ref(null);
</script>
