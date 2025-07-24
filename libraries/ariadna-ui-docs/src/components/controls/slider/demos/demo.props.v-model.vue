<template>
  <Slider v-model="sliderValue" :tracks="tracks" label="Реализация vModel" />

  v-model value = {{ sliderValue }}
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Slider from '@iwyfaf-vue-ui/ariadna-ui/Slider';
import type { TSliderTrack } from '@iwyfaf-vue-ui/ariadna-ui/Slider';

const sliderValue = ref<Array<[number, number] | number>>([[50, 60], 90]);
const tracks = ref<Array<TSliderTrack>>([
  {
    key: 'double',
    thumb: true,
    label: true,
    zIndex: 2,
  },
  {
    key: 'track2',
    thumb: true,
    label: true,
    zIndex: 1,
  },
]);
</script>
