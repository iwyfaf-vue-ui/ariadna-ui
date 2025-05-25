<template>
  <Radio v-model="radioValue" value="Vue">Vue</Radio>
  <Radio v-model="radioValue" value="React">React</Radio>
  <Radio v-model="radioValue" value="Angular">Angular</Radio>

  v-model value = {{ radioValue }}
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Radio from '@iwyfaf-vue-ui/ariadna-ui/Radio';

const radioValue = ref(null);
</script>
