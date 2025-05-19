<template>
  <div
    style="
      display: flex;
      width: 400px;
      height: 100px;
      padding: 1rem;
      border-radius: 5px;
      background-color: purple;
    "
    :style="styles1"
    @mousemove="throttled"
  >
    Наведи на меня курсор и я изменюсь 1 раз за 1 секунду.
  </div>

  <div
    style="
      display: flex;
      width: 400px;
      height: 100px;
      padding: 1rem;
      border-radius: 5px;
      background-color: coral;
    "
    :style="styles2"
    @mousemove="throttled2"
  >
    А я изменюсь 1 раз за 100 миллисекунд.
  </div>
</template>

<script setup lang="ts">
// Vue
import { ref, computed } from 'vue';
import type { Ref } from 'vue';

// Utilities
import throttle from '@iwyfaf-vue-ui/ariadna-ui/Throttle';

const state1 = ref(false);
const state2 = ref(false);

const styles1 = computed(() => {
  return state1.value
    ? {
        backgroundColor: 'forestgreen',
      }
    : null;
});

const styles2 = computed(() => {
  return state2.value
    ? {
        backgroundColor: 'forestgreen',
      }
    : null;
});

function toggleState(state: Ref<boolean>) {
  state.value = !state.value;
}

const throttled = throttle(() => toggleState(state1), 1000);
const throttled2 = throttle(() => toggleState(state2), 100);
</script>
