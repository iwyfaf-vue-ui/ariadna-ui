<template>
  <Chips v-model="chipsValue" label="Invalid is on" writable clearable invalid />
  <Chips v-model="chipsValue" label="Invalid is off" writable clearable :invalid="false" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Chips from '@iwyfaf-vue-ui/ariadna-ui/Chips';

const chipsValue = ref(['Vue', 'React', 'Angular']);
</script>
