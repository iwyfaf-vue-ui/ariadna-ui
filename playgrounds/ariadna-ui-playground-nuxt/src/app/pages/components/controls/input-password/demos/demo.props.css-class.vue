<template>
  <InputPassword
    v-model="inputPasswordValue"
    label="Custom cssClass"
    css-class="custom-input-password"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputPassword from '@iwyfaf-vue-ui/ariadna-ui/InputPassword';

const inputPasswordValue = ref(null);
</script>
