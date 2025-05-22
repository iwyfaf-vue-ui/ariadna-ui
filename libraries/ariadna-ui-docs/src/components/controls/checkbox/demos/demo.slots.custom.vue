<template>
  <Checkbox v-model="checkboxValue" custom>
    Кастомная имплементация Checkbox в содержимым.
    <template #custom> <i>💩</i> </template>
  </Checkbox>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Checkbox from '@iwyfaf-vue-ui/ariadna-ui/Checkbox';

const checkboxValue = ref(true);
</script>
