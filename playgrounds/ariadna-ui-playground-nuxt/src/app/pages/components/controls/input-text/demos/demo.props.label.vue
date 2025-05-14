<template>
  <InputText v-model="inputTextValue" label="Associated label" />
</template>

<script setup lang="ts">
// Components
import InputText from '@iwyfaf-vue-ui/ariadna-ui/InputText';

const inputTextValue = ref(null);
</script>
