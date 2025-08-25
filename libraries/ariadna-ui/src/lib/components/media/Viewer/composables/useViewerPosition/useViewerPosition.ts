import { reactive } from 'vue';
import type { Ref } from 'vue';
import type { TUseViewerPositionReturn } from './useViewerPosition.types';
import useElementSize from '@/lib/composables/elements/useElementSize/useElementSize';
import { ViewerPositionCore } from '../../core/position/viewer.position.core';
import useElementsSizes from '@/lib/composables/elements/useElementsSizes/useElementsSizes';

export default function useViewerPosition(
  items: Ref<Array<HTMLElement>>,
  container: Ref<HTMLDivElement | null>,
): TUseViewerPositionReturn {
  const positionCore = reactive(new ViewerPositionCore());

  useElementSize(container, 50, (sizes) => {
    positionCore.updateContainerSize({ width: sizes.width.value, height: sizes.height.value });
  });

  useElementsSizes(items, (sizes) => {
    positionCore.updateMoveItemsSize(
      sizes.map((size) => ({ width: size.width, height: size.height })),
    );
  });

  return {
    positionCore,
  };
}
