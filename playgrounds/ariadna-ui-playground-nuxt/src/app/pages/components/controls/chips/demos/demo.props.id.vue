<template>
  <Chips v-model="chipsValue" label="Default id" />
  <Chips v-model="chipsValue" label="Custom id" id="custom-id" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Chips from '@iwyfaf-vue-ui/ariadna-ui/Chips';

const chipsValue = ref(['Vue', 'React', 'Angular']);
</script>
