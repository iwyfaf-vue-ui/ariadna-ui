<template>
  <Checkbox v-model="checkboxValue" size="small"> Size is small </Checkbox>
  <Checkbox v-model="checkboxValue" size="medium">Size is medium</Checkbox>
  <Checkbox v-model="checkboxValue" size="large">Size is large</Checkbox>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Checkbox from '@iwyfaf-vue-ui/ariadna-ui/Checkbox';

const checkboxValue = ref(false);
</script>
