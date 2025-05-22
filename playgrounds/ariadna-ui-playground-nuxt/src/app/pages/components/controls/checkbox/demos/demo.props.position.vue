<template>
  <Checkbox v-model="checkboxValue" position="left">Checkbox position left</Checkbox>
  <Checkbox v-model="checkboxValue" position="right">Checkbox position right</Checkbox>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Checkbox from '@iwyfaf-vue-ui/ariadna-ui/Checkbox';

const checkboxValue = ref(false);
</script>
