<template>
  <Checkbox v-model="checkboxValue">Default id</Checkbox>
  <Checkbox v-model="checkboxValue" id="custom-id">Custom id</Checkbox>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Checkbox from '@iwyfaf-vue-ui/ariadna-ui/Checkbox';

const checkboxValue = ref(false);
</script>
