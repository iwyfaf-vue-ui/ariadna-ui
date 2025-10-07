<template>
  <InputPassword v-model="inputPasswordValue" label="Autocomplete is on" autocomplete />
  <InputPassword v-model="inputPasswordValue" label="Autocomplete is off" :autocomplete="false" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputPassword from '@iwyfaf-vue-ui/ariadna-ui/InputPassword';

const inputPasswordValue = ref(null);
</script>
