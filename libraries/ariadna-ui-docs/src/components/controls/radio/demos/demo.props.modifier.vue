<template>
  <Radio v-model="radioValue" value="Vue" modifier="primary">Vue</Radio>
  <Radio v-model="radioValue" value="React" modifier="primary">React</Radio>
  <Radio v-model="radioValue" value="Angular" modifier="primary">Angular</Radio>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Radio from '@iwyfaf-vue-ui/ariadna-ui/Radio';

const radioValue = ref(null);
</script>
