<template>
  <InputPassword
    v-model="inputPasswordValue"
    label="The password text will be displayed"
    show-password-toggle
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputPassword from '@iwyfaf-vue-ui/ariadna-ui/InputPassword';

const inputPasswordValue = ref(null);
</script>
