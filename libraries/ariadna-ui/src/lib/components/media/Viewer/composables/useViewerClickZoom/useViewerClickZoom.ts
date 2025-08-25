import { onMounted, onUnmounted, ref } from 'vue';

export default function useViewerClickZoom(): void {
  const moveActive = ref(false);
  const startX = ref(0);
  const startY = ref(0);

  const threshold = 5;

  function onPointerDown(event: PointerEvent) {
    moveActive.value = false;
    startX.value = event.clientX;
    startY.value = event.clientY;
  }

  function onPointerMove(event: PointerEvent) {
    const diffX = event.clientX - startX.value;
    const diffY = event.clientY - startY.value;

    if (Math.abs(diffX) > threshold || Math.abs(diffY) > threshold) {
      moveActive.value = true;
    }
  }

  function onPointerUp(event: PointerEvent) {
    if (!moveActive.value) {
      return;
    }

    event.stopPropagation();
  }

  onMounted(() => {
    window.addEventListener('pointerdown', onPointerDown, true);
    window.addEventListener('pointermove', onPointerMove, true);
    window.addEventListener('pointerup', onPointerUp, true);
  });

  onUnmounted(() => {
    window.removeEventListener('pointerdown', onPointerDown, true);
    window.removeEventListener('pointermove', onPointerMove, true);
    window.removeEventListener('pointerup', onPointerUp, true);
  });
}
