<template>
  <InputPassword v-model="inputPasswordValue" label="Focus emit" @focus="onFocus" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputPassword from '@iwyfaf-vue-ui/ariadna-ui/InputPassword';

const inputPasswordValue = ref(null);

function onFocus(event: Event) {
  console.log(event);
}
</script>
