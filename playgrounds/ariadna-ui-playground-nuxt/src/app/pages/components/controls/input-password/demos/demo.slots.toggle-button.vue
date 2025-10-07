<template>
  <InputPassword
    v-model="inputPasswordValue"
    label="Custom password show toggle button"
    show-password-toggle
  >
    <template #toggleButton="{ visible }">
      <i :class="visible ? 'icon-line-eye' : 'icon-line-eye-off'"></i>
    </template>
  </InputPassword>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputPassword from '@iwyfaf-vue-ui/ariadna-ui/InputPassword';

const inputPasswordValue = ref(null);
</script>
