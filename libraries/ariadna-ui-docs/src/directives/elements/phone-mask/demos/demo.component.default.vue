<template>
  <InputText
    v-model="inputTextNull"
    v-phone-mask
    type="tel"
    label="Мобильный телефон"
    placeholder="+7 (000) 000-00-00"
    css-class="ar-input-phone"
  />

  <InputText
    v-model="inputTextFilled"
    v-phone-mask
    type="tel"
    label="Мобильный телефон"
    placeholder="+7 (000) 000-00-00"
    css-class="ar-input-phone"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputText from '@iwyfaf-vue-ui/ariadna-ui/InputText';

// Directives
import vPhoneMask from '@iwyfaf-vue-ui/ariadna-ui/PhoneMask';

const inputTextNull = ref(null);
const inputTextFilled = ref('9123456789');
</script>
