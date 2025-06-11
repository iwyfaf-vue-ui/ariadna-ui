<template>
  <div style="display: flex; flex-direction: column; gap: 1rem">
    <div style="display: flex; align-items: center; gap: 1rem">
      <div style="width: 150px; height: 150px" :style="immediateBackground"></div>

      <Checkbox v-model="immediateValue">Поменять значение мнгновенно</Checkbox>
    </div>

    <div style="display: flex; align-items: center; gap: 1rem">
      <div style="width: 150px; height: 150px" :style="delayedBackground"></div>

      <Checkbox v-model="delayedValue">Поменять значение с задержкой в 1 секунду</Checkbox>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue
import { computed } from 'vue';

// Components
import Checkbox from '@iwyfaf-vue-ui/ariadna-ui/Checkbox';

// Composable
import useDelayedValue from '@iwyfaf-vue-ui/ariadna-ui/useDelayedValue';

const { delayedValue, immediateValue } = useDelayedValue<boolean>(false, 1000);

const immediateBackground = computed(() => {
  return immediateValue.value ? { backgroundColor: 'green' } : { backgroundColor: 'red' };
});

const delayedBackground = computed(() => {
  return delayedValue.value ? { backgroundColor: 'green' } : { backgroundColor: 'red' };
});
</script>
