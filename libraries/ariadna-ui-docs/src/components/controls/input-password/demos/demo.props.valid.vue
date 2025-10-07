<template>
  <InputPassword v-model="inputPasswordValue" label="Valid is on" valid />
  <InputPassword v-model="inputPasswordValue" label="Valid is off" :valid="false" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputPassword from '@iwyfaf-vue-ui/ariadna-ui/InputPassword';

const inputPasswordValue = ref(null);
</script>
