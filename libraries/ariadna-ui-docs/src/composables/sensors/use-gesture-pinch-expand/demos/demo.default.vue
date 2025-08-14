<template>
  <div>
    <div ref="container" class="pinch-zoom-area">
      <div v-if="eventType">
        Gesture: {{ eventType }}

        <ul>
          <li>centerX: ({{ centerX }})</li>
          <li>centerY: ({{ centerY }})</li>
        </ul>
      </div>

      <div v-else>
        Попробуйте использовать жесты сведение пальцев (pinch) или разведение пальцев (expand) в
        этой области. Использовать нужно два касания.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue
import { useTemplateRef, ref } from 'vue';

// Composables
import useGesturePinchExpand from '@iwyfaf-vue-ui/ariadna-ui/useGesturePinchExpand';

// Types
import type { TUseGesturePinchExpandEvent } from '@iwyfaf-vue-ui/ariadna-ui/useGesturePinchExpand';

const containerRef = useTemplateRef('container');

const eventType = ref<string | null>(null);
const centerX = ref<number | null>(null);
const centerY = ref<number | null>(null);

useGesturePinchExpand(
  (pinchExpandEvent: TUseGesturePinchExpandEvent) => {
    eventType.value = pinchExpandEvent.type;
    centerX.value = Math.round(pinchExpandEvent.centerX);
    centerY.value = Math.round(pinchExpandEvent.centerY);
  },
  containerRef,
  { threshold: 5 },
);
</script>

<style scoped>
.pinch-zoom-area {
  width: auto;
  height: 320px;
  border: 2px dashed var(--color-border-default);
  border-radius: var(--radius-default-xlarge);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: var(--indent-margin-large);
  padding: var(--indent-padding-large);
  touch-action: none;
  user-select: none;
  text-align: center;
}
</style>
