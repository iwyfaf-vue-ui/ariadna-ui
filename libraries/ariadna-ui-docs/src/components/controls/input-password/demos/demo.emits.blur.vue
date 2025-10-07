<template>
  <InputPassword v-model="inputPasswordValue" label="Blur emit" @blur="onBlur" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputPassword from '@iwyfaf-vue-ui/ariadna-ui/InputPassword';

const inputPasswordValue = ref(null);

function onBlur(event: Event) {
  console.log(event);
}
</script>
