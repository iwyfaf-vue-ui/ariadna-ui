<template>
  <Radio v-model="radioValue" value="Vue" name="framework">Vue</Radio>
  <Radio v-model="radioValue" value="React" name="framework">React</Radio>
  <Radio v-model="radioValue" value="Angular" name="framework">Angular</Radio>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Radio from '@iwyfaf-vue-ui/ariadna-ui/Radio';

const radioValue = ref(null);
</script>
