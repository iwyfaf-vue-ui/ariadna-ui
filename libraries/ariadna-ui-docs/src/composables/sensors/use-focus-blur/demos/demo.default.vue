<template>
  <div>
    <InputText v-model="inputText" placeholder="Focus me!" @focus="onFocus" @blur="onBlur" />

    <p>
      <strong>isFocused: </strong>
      <span :style="{ color: isFocused ? 'green' : 'red' }">
        {{ isFocused ? 'true' : 'false' }}
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputText from '@iwyfaf-vue-ui/ariadna-ui/InputText';

// Composables
import useVideoFocus from '@iwyfaf-vue-ui/ariadna-ui/useFocusBlur';

const { isFocused, onFocus, onBlur } = useVideoFocus();

const inputText = ref(null);
</script>
