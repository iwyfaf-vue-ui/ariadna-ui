import type { CSSProperties, Ref } from 'vue';
import { computed, onBeforeUnmount, onMounted, onScopeDispose, ref, unref, watch } from 'vue';
import type {
  TUseDragViewportOptions,
  TUseDragViewportReturn,
} from './types/useDragViewport.types';

export default function useDragViewport(
  container: Ref<HTMLElement | SVGElement | null>,
  target: Ref<HTMLElement | SVGElement | null>,
  options?: TUseDragViewportOptions,
): TUseDragViewportReturn {
  const defaultOptions = {
    state: ref(false),
    disabled: ref(false),
    initialPosition: { x: 0, y: 0 },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    state: options?.state ?? ref(false),
    disabled: options?.disabled ?? ref(false),
    initialPosition: options?.initialPosition ?? { x: 0, y: 0 },
  };

  const isDragging = ref(false);
  const x = ref(mergedOptions.initialPosition.x);
  const y = ref(mergedOptions.initialPosition.y);
  const offset = { x: 0, y: 0 };

  const style = computed<CSSProperties>(() => ({
    position: !mergedOptions.disabled.value ? 'absolute' : undefined,
    left: !mergedOptions.disabled.value && x.value ? `${x.value}px` : undefined,
    top: !mergedOptions.disabled.value && y.value ? `${y.value}px` : undefined,
    touchAction: !mergedOptions.disabled.value ? `none` : undefined,
  }));

  function onStartDrag(e: PointerEvent) {
    if (e.button === 1 || e.button === 2) return;

    if (container.value && !mergedOptions.disabled.value) {
      const containerRect = container.value.getBoundingClientRect();

      offset.x = e.clientX - containerRect.left;
      offset.y = e.clientY - containerRect.top;

      isDragging.value = true;

      if (mergedOptions.onDragStart) {
        mergedOptions.onDragStart();
      }
    }
  }

  function onMoveDrag(e: PointerEvent) {
    if (!isDragging.value) return;
    if (e.button === 1 || e.button === 2) return;

    if (container.value && !mergedOptions.disabled.value) {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const containerRect = container.value.getBoundingClientRect();

      let newX = e.pageX - offset.x;
      let newY = e.pageY - offset.y;

      if (containerRect) {
        const scrollLeft = window.scrollX || window.pageXOffset;
        const scrollTop = window.scrollY || window.pageYOffset;

        if (newX < scrollLeft) {
          newX = x.value;
        }

        if (newX + containerRect.width > viewportWidth + scrollLeft) {
          newX = viewportWidth + scrollLeft - containerRect.width;
        }

        if (newY < scrollTop) {
          newY = y.value;
        }

        if (newY + containerRect.height > viewportHeight + scrollTop) {
          newY = viewportHeight + scrollTop - containerRect.height;
        }
      }

      x.value = newX;
      y.value = newY;
    }
  }

  function onEndDrag(e: PointerEvent) {
    if (e.button === 1 || e.button === 2) return;

    isDragging.value = false;

    if (mergedOptions.onDragEnd) {
      mergedOptions.onDragEnd();
    }
  }

  function manageListeners(add: boolean) {
    const el = unref(target);
    const method = add ? 'addEventListener' : 'removeEventListener';

    if (el) {
      el[method]('pointerdown', onStartDrag as EventListener);
      document[method]('pointermove', onMoveDrag as EventListener);
      document[method]('pointerup', onEndDrag as EventListener);
    }
  }

  onMounted(() => {
    manageListeners(true);
  });

  onBeforeUnmount(() => {
    manageListeners(false);
  });

  onScopeDispose(() => {
    manageListeners(false);
  });

  watch(target, (value) => {
    if (value) {
      manageListeners(true);
    }
  });

  watch(mergedOptions.state, (value) => {
    if (!target.value) return;

    if (!value) {
      manageListeners(false);
    }
  });

  watch(mergedOptions.disabled, (value) => {
    if (!target.value) return;

    if (value) {
      manageListeners(false);
    } else {
      manageListeners(true);
    }
  });

  return {
    x,
    y,
    style,
    isDragging,
  };
}
