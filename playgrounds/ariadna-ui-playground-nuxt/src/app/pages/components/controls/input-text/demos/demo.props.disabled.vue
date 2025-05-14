<template>
  <InputText v-model="inputTextValue" label="Disabled is on" disabled />
  <InputText v-model="inputTextValue" label="Disabled is off" :disabled="false" />
</template>

<script setup lang="ts">
// Components
import InputText from '@iwyfaf-vue-ui/ariadna-ui/InputText';

const inputTextValue = ref(null);
</script>
