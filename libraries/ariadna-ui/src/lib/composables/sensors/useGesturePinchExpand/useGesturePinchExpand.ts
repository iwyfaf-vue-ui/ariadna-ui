import type { Ref } from 'vue';
import type {
  TUseGesturePinchExpandEvent,
  TUseGesturePinchExpandOptions,
} from './types/useGesturePinchExpand.types';
import { ref, onMounted, onUnmounted } from 'vue';
import { EUseGesturePinchExpandType } from './types/useGesturePinchExpand.enums';

export const useGesturePinchExpandDefaultOptions: TUseGesturePinchExpandOptions = {
  threshold: 4,
};

export default function useGesturePinchExpand(
  handler: (pinchExpandEvent: TUseGesturePinchExpandEvent, event: TouchEvent) => void,
  container: Ref<HTMLElement | null>,
  options?: TUseGesturePinchExpandOptions,
) {
  const mergedOptions = {
    ...useGesturePinchExpandDefaultOptions,
    ...options,
  };

  const isScaling = ref(false);
  const oldDistance = ref(0);

  function getContainer(): HTMLElement | Window {
    return container?.value || window;
  }

  function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x1 - x2;
    const dy = y1 - y2;

    return Math.sqrt(dx * dx + dy * dy);
  }

  function onTouchStart(event: TouchEvent) {
    if (event.touches.length !== 2) {
      return;
    }

    const [touch1, touch2] = event.touches;
    oldDistance.value = calculateDistance(
      touch1.clientX,
      touch1.clientY,
      touch2.clientX,
      touch2.clientY,
    );

    isScaling.value = true;
  }

  function onTouchMove(event: TouchEvent) {
    if (!isScaling.value) {
      return;
    }

    event.preventDefault();

    const touches = event.touches;
    if (touches.length < 2) {
      return;
    }

    const newDistance = calculateDistance(
      touches[0].clientX,
      touches[0].clientY,
      touches[1].clientX,
      touches[1].clientY,
    );

    const distanceChange = newDistance - oldDistance.value;

    const centerX = (touches[0].clientX + touches[1].clientX) / 2;
    const centerY = (touches[0].clientY + touches[1].clientY) / 2;

    if (Math.abs(distanceChange) >= mergedOptions.threshold) {
      if (distanceChange > 0) {
        handler({ type: EUseGesturePinchExpandType.EXPAND, centerX, centerY }, event);
      } else {
        handler({ type: EUseGesturePinchExpandType.PINCHING, centerX, centerY }, event);
      }
    }

    oldDistance.value = newDistance;
  }

  function onTouchEnd() {
    isScaling.value = false;
  }

  onMounted(() => {
    const mainContainer = getContainer();

    mainContainer.addEventListener('touchstart', onTouchStart as EventListener);
    mainContainer.addEventListener('touchmove', onTouchMove as EventListener);
    mainContainer.addEventListener('touchend', onTouchEnd);
  });

  onUnmounted(() => {
    const mainContainer = getContainer();

    mainContainer.removeEventListener('touchstart', onTouchStart as EventListener);
    mainContainer.removeEventListener('touchmove', onTouchMove as EventListener);
    mainContainer.removeEventListener('touchend', onTouchEnd);
  });
}
