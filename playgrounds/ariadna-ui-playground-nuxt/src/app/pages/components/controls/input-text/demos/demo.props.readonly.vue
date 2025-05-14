<template>
  <InputText v-model="inputTextValue" label="Readonly is on" readonly />
  <InputText v-model="inputTextValue" label="Readonly is off" :readonly="false" />
</template>

<script setup lang="ts">
// Components
import InputText from '@iwyfaf-vue-ui/ariadna-ui/InputText';

const inputTextValue = ref(null);
</script>
