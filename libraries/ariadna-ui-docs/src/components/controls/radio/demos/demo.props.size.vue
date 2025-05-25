<template>
  <Radio v-model="radioValue" value="Vue" size="small">Size is small</Radio>
  <Radio v-model="radioValue" value="React" size="medium">Size is medium</Radio>
  <Radio v-model="radioValue" value="Angular" size="large">Size is large</Radio>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Radio from '@iwyfaf-vue-ui/ariadna-ui/Radio';

const radioValue = ref(false);
</script>
