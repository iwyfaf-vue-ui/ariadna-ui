<template>
  <Checkbox v-model="checkboxValue" invalid>Invalid is on</Checkbox>
  <Checkbox v-model="checkboxValue" :invalid="false">Invalid is off</Checkbox>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Checkbox from '@iwyfaf-vue-ui/ariadna-ui/Checkbox';

const checkboxValue = ref(false);
</script>
