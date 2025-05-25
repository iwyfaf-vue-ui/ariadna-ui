<template>
  <Radio v-model="radioValue" value="Vue" custom> Vue </Radio>

  <Radio v-model="radioValue" value="React" custom>
    Кастомная имплементация Radio в содержимым.
    <template #custom> <i>💩</i> </template>
  </Radio>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Radio from '@iwyfaf-vue-ui/ariadna-ui/Radio';

const radioValue = ref(null);
</script>
