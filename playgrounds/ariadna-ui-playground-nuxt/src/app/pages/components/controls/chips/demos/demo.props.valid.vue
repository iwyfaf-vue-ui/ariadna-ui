<template>
  <Chips v-model="chipsValue" label="Valid is on" writable clearable valid />
  <Chips v-model="chipsValue" label="Valid is off" writable clearable :valid="false" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Chips from '@iwyfaf-vue-ui/ariadna-ui/Chips';

const chipsValue = ref(['Vue', 'React', 'Angular']);
</script>
