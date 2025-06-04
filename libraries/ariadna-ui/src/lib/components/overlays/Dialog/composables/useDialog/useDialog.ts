import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue';
import type { ModelRef, ShallowRef } from 'vue';
import type { TDialogEmits, TDialogProps } from '../../Dialog';
import type { TUseDialogReturn } from './useDialog.types';
import useDragViewport from '@/lib/composables/elements/useDragViewport/useDragViewport';

export default function useDropbox(
  props: TDialogProps,
  emits: TDialogEmits,
  vVisible: ModelRef<boolean, string, boolean, boolean>,
  dialogContainerRef: Readonly<ShallowRef<HTMLDivElement | null>>,
  draggableContainerRef: Readonly<ShallowRef<HTMLDivElement | null>>,
  draggableTargetRef: Readonly<ShallowRef<HTMLDivElement | null>>,
): TUseDialogReturn {
  const maximizedState = ref<boolean>(props.maximized!);
  const shakeState = ref<boolean>(false);
  const documentKeydownListener = ref<((event: KeyboardEvent) => void) | null>(null);

  const draggableDisabled = computed(() => !props.draggable || maximizedState.value);

  const { style: draggableStyles, isDragging } = useDragViewport(
    draggableContainerRef,
    draggableTargetRef,
    {
      state: vVisible,
      disabled: draggableDisabled,
      onDragStart: dragStartHandler,
      onDragEnd: dragEndHandler,
    },
  );

  const componentClasses = computed(() => {
    const base = props.cssClass;

    const theme = `${base}--theme`;
    const maximized = maximizedState.value ? `${base}--maximized` : undefined;
    const dragging = isDragging.value ? `${base}--dragging` : undefined;
    const contentScrollable = props.contentScrollable ? `${base}--content-scrollable` : undefined;
    const shake = shakeState.value ? `${base}--shake` : undefined;
    const modifier = props.modifier ? `${base}--${props.modifier}` : undefined;

    return [base, theme, dragging, maximized, contentScrollable, shake, modifier]
      .filter(Boolean)
      .join(' ');
  });

  function toggleMaximize(event: Event) {
    maximizedState.value = !maximizedState.value;

    maximizedState.value ? emits('maximized', event) : emits('unMaximized', event);
  }

  function requestCloseDialog(event: Event) {
    vVisible.value = false;

    emits('hide', event);
  }

  function triggerShakeEffect() {
    if (shakeState.value) {
      return true;
    }

    shakeState.value = true;

    setTimeout(() => {
      shakeState.value = false;
    }, 200);
  }

  function handleHideDialog(event: Event) {
    if (props.persistent || (props.noOverlayDismiss && props.noEscDismiss)) {
      props.shake && triggerShakeEffect();
    } else {
      requestCloseDialog(event);
    }
  }

  function handleKeyDown(event: KeyboardEvent): void {
    if (!props.noEscDismiss && (event.key === 'Escape' || event.key === 'Esc')) {
      handleHideDialog(event);
    }
  }

  function handleOverlayClick(event: Event) {
    const target = event.target as HTMLDivElement;

    if (target !== dialogContainerRef.value) {
      return;
    }

    if (!props.persistent && !props.noOverlayDismiss) {
      handleHideDialog(event);
    } else if (props.shake) {
      triggerShakeEffect();
    }
  }

  function onAfterLeave() {
    emits('after-hide');
  }

  function dragStartHandler() {
    emits('drag-start');
  }

  function dragEndHandler() {
    emits('drag-end');
  }

  onMounted(() => {
    emits('mounted');

    if (!documentKeydownListener.value) {
      documentKeydownListener.value = handleKeyDown;
      window.addEventListener('keydown', documentKeydownListener.value);
    }
  });

  onBeforeUnmount(() => {
    if (documentKeydownListener.value) {
      window.removeEventListener('keydown', documentKeydownListener.value);
      documentKeydownListener.value = null;
    }
  });

  watch(
    () => vVisible.value,
    (value) => {
      emits('update:visible', value);

      if (value) {
        emits('show');
      }
    },
  );

  return {
    componentClasses,
    draggableStyles,
    toggleMaximize,
    requestCloseDialog,
    handleOverlayClick,
    onAfterLeave,
  };
}
