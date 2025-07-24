<template>
  <Slider v-model="sliderValue" :tracks="tracks" label="Реализация Invalid" invalid />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Slider from '@iwyfaf-vue-ui/ariadna-ui/Slider';
import type { TSliderTrack } from '@iwyfaf-vue-ui/ariadna-ui/Slider';

const sliderValue = ref<Array<[number, number] | number>>([0]);
const tracks = ref<Array<TSliderTrack>>([{ key: 'track', thumb: true, label: true, zIndex: 1 }]);
</script>
