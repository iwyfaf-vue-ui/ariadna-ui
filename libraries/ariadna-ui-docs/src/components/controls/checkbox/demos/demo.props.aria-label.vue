<template>
  <Checkbox v-model="checkboxValue" aria-label="Checkbox без текста внутри" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Checkbox from '@iwyfaf-vue-ui/ariadna-ui/Checkbox';

const checkboxValue = ref(false);
</script>
