<template>
  <Slider
    v-model="sliderValue"
    :tracks="tracks"
    label="Реализация слота Errors"
    :invalid="invalidState"
    :errors="errorsMessages"
  >
    <template #errors="{ errors }">
      <ul>
        <li v-for="(error, idx) in errors" :key="`error-${idx + 1}`">
          {{ error }}
        </li>
      </ul>
    </template>
  </Slider>

  <Button @click="toggle">Send textarea to invalid state</Button>
</template>

<script setup lang="ts">
// Vue
import { ref, watch } from 'vue';

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

watch(sliderValue, (value) => {
  const numbers = value.flatMap((v) => (Array.isArray(v) ? v : [v]));

  if (invalidState.value) {
    return;
  }

  if (numbers.some((num) => num > 20)) {
    toggle();
  }
});
</script>
