<template>
  <Radio v-model="radioValue" value="Vue 1" custom> Кастомная имплементация Checkbox </Radio>
  <Radio v-model="radioValue" value="Vue 2" custom disabled>
    Кастомная имплементация Checkbox disabled
  </Radio>
  <Radio v-model="radioValue" value="Vue 3" custom valid>
    Кастомная имплементация Checkbox valid
  </Radio>
  <Radio v-model="radioValue" value="React" custom invalid>
    Кастомная имплементация Checkbox invalid
  </Radio>
  <Radio v-model="radioValue" value="Angular" custom modifier="primary">
    Кастомная имплементация Checkbox modifier
  </Radio>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Radio from '@iwyfaf-vue-ui/ariadna-ui/Radio';

const radioValue = ref(null);
</script>
