<template>
  <InputPassword v-model="inputPasswordValue" label="Change emit" @change="onChange" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputPassword from '@iwyfaf-vue-ui/ariadna-ui/InputPassword';

const inputPasswordValue = ref(null);

function onChange(event: Event) {
  console.log(event);
}
</script>
