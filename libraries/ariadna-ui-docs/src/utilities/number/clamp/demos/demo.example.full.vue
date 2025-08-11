<template>
  <div>
    <label>
      Значение (от 0 до 100):
      <input v-model.number="rawValue" type="range" min="-50" max="150" />
    </label>

    <p>Исходное значение: {{ rawValue }}</p>
    <p>Ограниченное значение (clamp): {{ clampedValue }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Utilities
import clamp from '@iwyfaf-vue-ui/ariadna-ui/Clamp';

const rawValue = ref(50);

const clampedValue = computed(() => clamp(0, rawValue.value, 100));
</script>
