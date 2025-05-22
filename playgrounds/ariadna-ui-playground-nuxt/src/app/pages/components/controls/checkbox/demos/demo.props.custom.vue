<template>
  <Checkbox v-model="checkboxValue" custom> Кастомная имплементация Checkbox </Checkbox>

  <Checkbox v-model="checkboxValue" custom disabled>
    Кастомная имплементация Checkbox disabled
  </Checkbox>

  <Checkbox v-model="checkboxValue" custom valid> Кастомная имплементация Checkbox valid </Checkbox>

  <Checkbox v-model="checkboxValue" custom invalid>
    Кастомная имплементация Checkbox invalid
  </Checkbox>

  <Checkbox v-model="checkboxValue" custom modifier="primary">
    Кастомная имплементация Checkbox modifier
  </Checkbox>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Checkbox from '@iwyfaf-vue-ui/ariadna-ui/Checkbox';

const checkboxValue = ref(false);
</script>
