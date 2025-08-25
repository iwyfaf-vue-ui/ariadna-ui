import { onMounted, onUnmounted, reactive } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import type { TUseViewerZoomReturn } from './useViewerZoom.types';
import type { TViewerMediaItem } from '../../types/Viewer.types';
import { ViewerZoomCore } from '../../core/zoom/viewer.zoom.core';
import { EViewerMedia } from '../../types/Viewer.enums';
import useGesturePinchExpand from '@/lib/composables/sensors/useGesturePinchExpand/useGesturePinchExpand';
import { EUseGesturePinchExpandType } from '@/lib/composables/sensors/useGesturePinchExpand/types/useGesturePinchExpand.enums';

export default function useViewerZoom(
  container: Ref<HTMLElement | null>,
  zoomDisabled: ComputedRef<boolean>,
  max = 100,
  step = 10,
): TUseViewerZoomReturn {
  const zoomCore = reactive(new ViewerZoomCore({ maxScale: max }));

  function getLocalCenterPoint(clientX: number, clientY: number) {
    if (!container.value) {
      return [0, 0];
    }

    const rect = container.value.getBoundingClientRect();
    const centerOfContainerX = rect.width / 2;
    const centerOfContainerY = rect.height / 2;

    return [clientX - rect.left - centerOfContainerX, clientY - rect.top - centerOfContainerY];
  }

  function onClickMaxZoom(event: TouchEvent | MouseEvent, mediaItem: TViewerMediaItem) {
    const clientX =
      window.TouchEvent && event instanceof TouchEvent
        ? event.touches.item(0)?.clientX || 0
        : (event as MouseEvent).clientX;
    const clientY =
      window.TouchEvent && event instanceof TouchEvent
        ? event.touches.item(0)?.clientY || 0
        : (event as MouseEvent).clientY;
    const [localX, localY] = getLocalCenterPoint(clientX, clientY);

    if (mediaItem.type === EViewerMedia.VIDEO) {
      return;
    }

    if (zoomCore.scale === 0) {
      return zoomCore.setScale(max, localX, localY);
    }

    zoomCore.setScale(0);
  }

  function onZoomPlus(centerX: number, centerY: number) {
    const [localX, localY] = getLocalCenterPoint(centerX, centerY);
    zoomCore.zoomAt(step, localX, localY);
  }

  function onZoomMinus(centerX: number, centerY: number) {
    const [localX, localY] = getLocalCenterPoint(centerX, centerY);
    zoomCore.zoomAt(-step, localX, localY);
  }

  function onWheel(event: WheelEvent) {
    if (zoomDisabled.value) {
      return;
    }

    if (event.deltaY < 0) {
      return onZoomPlus(event.clientX, event.clientY);
    }

    onZoomMinus(event.clientX, event.clientY);
  }

  onMounted(() => {
    if (!container.value) {
      return;
    }

    container.value.addEventListener('wheel', onWheel);
  });

  onUnmounted(() => {
    if (!container.value) {
      return;
    }

    container.value.removeEventListener('wheel', onWheel);
  });

  useGesturePinchExpand((event) => {
    if (zoomDisabled.value) {
      return;
    }

    if (event.type === EUseGesturePinchExpandType.PINCHING) {
      return onZoomMinus(event.centerX, event.centerY);
    }

    if (event.type === EUseGesturePinchExpandType.EXPAND) {
      return onZoomPlus(event.centerX, event.centerY);
    }
  }, container);

  return {
    zoomCore,
    onClickMaxZoom,
  };
}
