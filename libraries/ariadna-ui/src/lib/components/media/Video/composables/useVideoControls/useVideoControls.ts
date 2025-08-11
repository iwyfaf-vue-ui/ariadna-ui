import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import type { TVideoProps } from '../../Video';
import useDelayedValue from '@/lib/composables/reactivity/useDelayedValue/useDelayedValue';
import type { TUseVideoControlsReturn } from './useVideoControls.types';

export default function useVideoControls(
  props: TVideoProps,
  playedState: Ref<boolean, boolean>,
): TUseVideoControlsReturn {
  const mouseLeaved = ref<boolean>(false);
  const controls = ref<boolean>(props.controls!);
  const timeToHideControlsMs = ref<number>(props.timeToHideControlsMs!);
  const timeToHideControlsOnOutsideMs = ref<number>(props.timeToHideControlsOnOutsideMs!);

  const controlsHover = ref<boolean>(false);

  const { delayedValue: controlsVisibleWithDelay, immediateValue: controlsVisibleWithoutDelay } =
    useDelayedValue<boolean>(controls.value, timeToHideControlsMs.value);

  const {
    delayedValue: controlsVisibleOnOutsideWithDelay,
    immediateValue: controlsVisibleOnOutsideWithoutDelay,
  } = useDelayedValue<boolean>(controls.value, timeToHideControlsOnOutsideMs.value);

  function onControlsMouseEnter() {
    controlsHover.value = true;
  }

  function onControlsMouseLeave() {
    controlsHover.value = false;
  }

  function showControls(always: boolean = false) {
    if (!props.controls || props.showControlsAlways) {
      return;
    }

    mouseLeaved.value = false;

    controlsVisibleWithoutDelay.value = true;
    if (!always) {
      controlsVisibleWithDelay.value = false;
    }
  }

  function onMouseLeave() {
    if (!props.controls || props.showControlsAlways) {
      return;
    }

    mouseLeaved.value = true;

    controlsVisibleOnOutsideWithoutDelay.value = true;
    controlsVisibleOnOutsideWithDelay.value = false;
  }

  const controlsClasses = computed(() => ({
    [`${props.cssClass}__controls`]: true,
    [`${props.cssClass}__controls--visible`]:
      ((mouseLeaved.value && controlsVisibleOnOutsideWithoutDelay.value) ||
        (!mouseLeaved.value && controlsVisibleWithoutDelay.value) ||
        !playedState.value ||
        controlsHover.value ||
        props.showControlsAlways) &&
      props.controls,
  }));

  return {
    onControlsMouseEnter,
    onControlsMouseLeave,
    showControls,
    onMouseLeave,
    controlsClasses,
  };
}
