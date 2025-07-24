<template>
  <Slider v-model="sliderValue" :tracks="tracks" label="Реализация Min" :min="50" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Slider from '@iwyfaf-vue-ui/ariadna-ui/Slider';
import type { TSliderTrack } from '@iwyfaf-vue-ui/ariadna-ui/Slider';

const sliderValue = ref<Array<[number, number] | number>>([50]);
const tracks = ref<Array<TSliderTrack>>([{ key: 'track', thumb: true, label: true, zIndex: 1 }]);
</script>
