<template>
  <input
    type="tel"
    v-model="inputTextValue"
    v-phone-mask="{
      clone: true,
      separator: '-',
    }"
    placeholder="+7 (___) ___-__-__"
  />

  <InputText
    v-model="inputTextValue"
    v-phone-mask="{
      clone: true,
      separator: '-',
    }"
    type="tel"
    label="Мобильный телефон"
    placeholder="+7 (___) ___-__-__"
    css-class="ar-input-phone"
  />

  <InputText
    v-model="inputTextValue2"
    v-phone-mask="{ clone: true }"
    type="tel"
    label="Мобильный телефон"
    placeholder="+7 (000) 000-00-00"
    css-class="ar-input-phone"
  />

  <InputText
    v-model="inputTextValue3"
    v-phone-mask="{
      clone: true,
      separator: '—',
    }"
    type="tel"
    label="Мобильный телефон"
    placeholder="+7 (000) 000—00—00"
    css-class="ar-input-phone"
  />
</template>

<script setup lang="ts">
// Components
import InputText from '@iwyfaf-vue-ui/ariadna-ui/InputText';

// Directives
import vPhoneMask from '@iwyfaf-vue-ui/ariadna-ui/PhoneMask';

const inputTextValue = ref('9123456789');
const inputTextValue2 = ref(null);
const inputTextValue3 = ref(null);
</script>
