<template>
  <Checkbox v-model="checkboxValue">Реализация vModel</Checkbox>

  v-model value = {{ checkboxValue }}
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Checkbox from '@iwyfaf-vue-ui/ariadna-ui/Checkbox';

const checkboxValue = ref(false);
</script>
