<template>
  <div class="target__container">
    <div ref="buttonRef">
      <Button @click="toggleDropdown">Click</Button>
    </div>

    <div
      v-if="showDropdown"
      ref="dropboxRef"
      class="target__dropdown"
      :style="{
        top: `${top}px`,
        left: `${left}px`,
      }"
    >
      <ul>
        <li>top: {{ `${top}px` }}</li>
        <li>left: {{ `${left}px` }}</li>
        <li>cssClass: {{ cssClass }}</li>
        <li>secondaryCssClass: {{ secondaryCssClass }}</li>
      </ul>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur enim eveniet maiores
        nihil. A aspernatur corporis ex id libero reprehenderit! Deleniti deserunt dicta distinctio
        itaque maxime, neque perferendis quam quia?
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue
import { ref, nextTick } from 'vue';

// Components
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

// Composables
import usePosition, { usePositionDefaultOptions } from '@iwyfaf-vue-ui/ariadna-ui/usePosition';

const buttonRef = ref<HTMLElement | null>(null);
const dropboxRef = ref<HTMLElement | null>(null);
const showDropdown = ref(false);

const { top, left, cssClass, secondaryCssClass, calculate } = usePosition(buttonRef, dropboxRef, {
  ...usePositionDefaultOptions,
  positionOrder: ['TOP'],
});

const toggleDropdown = async () => {
  showDropdown.value = !showDropdown.value;

  if (showDropdown.value) {
    await nextTick();
    calculate();
  }
};
</script>
