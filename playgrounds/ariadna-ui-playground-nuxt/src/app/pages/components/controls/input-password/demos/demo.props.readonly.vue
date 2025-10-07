<template>
  <InputPassword v-model="inputPasswordValue" label="Readonly is on" readonly />
  <InputPassword v-model="inputPasswordValue" label="Readonly is off" :readonly="false" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputPassword from '@iwyfaf-vue-ui/ariadna-ui/InputPassword';

const inputPasswordValue = ref(null);
</script>
