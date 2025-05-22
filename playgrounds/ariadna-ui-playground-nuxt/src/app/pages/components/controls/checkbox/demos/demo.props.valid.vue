<template>
  <Checkbox v-model="checkboxValue" label="Valid is on" valid>Valid is on</Checkbox>
  <Checkbox v-model="checkboxValue" :valid="false">Valid is off</Checkbox>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Checkbox from '@iwyfaf-vue-ui/ariadna-ui/Checkbox';

const checkboxValue = ref(false);
</script>
