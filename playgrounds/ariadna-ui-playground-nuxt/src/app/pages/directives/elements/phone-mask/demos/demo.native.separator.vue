<template>
  <div>
    <input
      type="tel"
      v-model="inputTextNull"
      v-phone-mask="{
        clone: true,
        separator: '—',
      }"
      placeholder="+7 (___) ___—__—__"
    />
  </div>

  <div>
    <input
      type="tel"
      v-model="inputTextFilled"
      v-phone-mask="{
        clone: true,
        separator: '—',
      }"
      placeholder="+7 (___) ___—__—__"
    />
  </div>
</template>

<script setup lang="ts">
// Directives
import vPhoneMask from '@iwyfaf-vue-ui/ariadna-ui/PhoneMask';

const inputTextNull = ref(null);
const inputTextFilled = ref('9123456789');
</script>
