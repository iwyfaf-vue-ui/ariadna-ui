<template>
  <Slider
    v-model="sliderValue"
    :tracks="tracks"
    :label="`Errors is ${invalidState ? 'on' : 'off'}`"
    :invalid="invalidState"
    :errors="errorsMessages"
  />

  <Button @click="toggle">Send textarea to invalid state</Button>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Slider from '@iwyfaf-vue-ui/ariadna-ui/Slider';
import type { TSliderTrack } from '@iwyfaf-vue-ui/ariadna-ui/Slider';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
import Textarea from '@iwyfaf-vue-ui/ariadna-ui/Textarea';

const sliderValue = ref<Array<[number, number] | number>>([0]);
const tracks = ref<Array<TSliderTrack>>([{ key: 'track', thumb: true, label: true, zIndex: 1 }]);

const invalidState = ref(false);
const errorsMessages = ref<Array<string>>([]);

function toggle() {
  invalidState.value = !invalidState.value;

  if (!errorsMessages.value.length) {
    errorsMessages.value = ['First error', 'Second error'];
  } else {
    errorsMessages.value = [];
  }
}
</script>
