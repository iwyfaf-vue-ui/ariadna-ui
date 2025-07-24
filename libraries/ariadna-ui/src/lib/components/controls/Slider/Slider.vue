<template>
  <div
    ref="slider"
    :class="componentClasses"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave"
    @mousedown="onSliderMouseDown"
    @touchstart="onSliderTouchStart"
  >
    <div :class="`${props.cssClass}__group`">
      <label v-if="props.label" :for="uniqueID" :class="`${props.cssClass}__label`">
        {{ props.label }}
      </label>

      <div :class="`${cssClass}__points`" v-if="commonPoints.length">
        <div
          v-for="(point, index) in commonPoints"
          :key="point"
          :class="{
            [`${cssClass}__point`]: true,
            [`${cssClass}__point-${point}`]: true,
            [`${cssClass}__point--first`]: index === 0,
            [`${cssClass}__point--last`]: index === commonPoints.length - 1,
          }"
          :style="{ left: `${getPercentageByValue(point)}%` }"
        >
          <div v-if="$slots.point" :class="`${cssClass}__point-value`">
            <slot name="point" :value="point" />
          </div>
        </div>
      </div>

      <div :class="`${cssClass}__track`" :id="uniqueID">
        <div
          v-for="(track, index) in props.tracks"
          :key="track.key"
          :class="getAdditionalTrackClasses(track.key)"
          :style="`z-index: ${
            thumbsDrag.get(`${EThumbPosition.LEFT}-${index}`) ||
            thumbsDrag.get(`${EThumbPosition.RIGHT}-${index}`)
              ? track.zIndex + 1
              : track.zIndex
          }; ${calculateStylesForTrackByValue(props.modelValue[index])}`"
        >
          <template v-if="track.label">
            <div
              v-if="Array.isArray(props.modelValue[index])"
              :class="{
                [`${props.cssClass}__track-additional-label`]: true,
                [`${props.cssClass}__track-additional-label--left`]: true,
                [`${props.cssClass}__track-additional-label--visible`]: thumbsDrag.get(
                  `${EThumbPosition.LEFT}-${index}`,
                ),
              }"
            >
              {{
                `${track.labelPrefix || ''}${(props.modelValue[index] as [number, number])[0]}${track.labelPostfix || ''}`
              }}
            </div>

            <div
              :class="{
                [`${props.cssClass}__track-additional-label`]: true,
                [`${props.cssClass}__track-additional-label--right`]: true,
                [`${props.cssClass}__track-additional-label--visible`]: thumbsDrag.get(
                  `${EThumbPosition.RIGHT}-${index}`,
                ),
              }"
            >
              {{
                `${track.labelPrefix || ''}${Array.isArray(props.modelValue[index]) ? (props.modelValue[index] as [number, number])[1] : props.modelValue[index]}${track.labelPostfix || ''}`
              }}
            </div>
          </template>

          <template v-if="track.thumb">
            <div
              v-if="Array.isArray(props.modelValue[index])"
              :class="
                getThumbClasses(
                  track.key,
                  thumbsDrag.get(`${EThumbPosition.LEFT}-${index}`) ?? false,
                  EThumbPosition.LEFT,
                )
              "
              :style="{ zIndex: track.zIndex + 1 }"
              @mousedown.stop="onThumbMouseDown($event, index, EThumbPosition.LEFT)"
              @touchstart.stop="onThumbTouchStart($event, index, EThumbPosition.LEFT)"
            />
            <div
              :class="
                getThumbClasses(
                  track.key,
                  thumbsDrag.get(`${EThumbPosition.RIGHT}-${index}`) ?? false,
                  EThumbPosition.RIGHT,
                )
              "
              :style="{ zIndex: track.zIndex + 1 }"
              @mousedown.stop="onThumbMouseDown($event, index, EThumbPosition.RIGHT)"
              @touchstart.stop="onThumbTouchStart($event, index, EThumbPosition.RIGHT)"
            />
          </template>
        </div>
      </div>
    </div>

    <Transition
      :name="`${cssClass}__errors-expand`"
      @enter="onExpandEnter"
      @after-enter="onExpandAfterEnter"
      @before-leave="onExpandBeforeLeave"
    >
      <div v-if="props.invalid && props.errors.length" :class="`${props.cssClass}__errors`">
        <slot name="errors" :errors="props.errors">
          <div
            v-for="(error, i) in props.errors"
            :key="`error-${i + 1}`"
            :class="`${props.cssClass}__errors-${i + 1}`"
          >
            {{ error }}
          </div>
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
// Vue
import type { Ref } from 'vue';
import { ref, useTemplateRef, onMounted, onUnmounted } from 'vue';

// Types
import type { TSliderEmits, TSliderProps, TSliderSlots } from './Slider';
import { ESliderPropsDefault, EThumbPosition } from './types/Slider.enums';
import type { TCurrentActivityType } from './types/Slider.types';

// Composables
import useSlider from './composables/useSlider/useSlider';
import useThumbEvents from './composables/useThumbEvents/useThumbEvents';
import useSliderEvents from './composables/useSliderEvents/useSliderEvents';
import useWindowEvents from './composables/useWindowEvents/useWindowEvents';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<TSliderProps>(), {
  min: ESliderPropsDefault.MIN,
  max: ESliderPropsDefault.MAX,
  step: null,
  points: null,
  errors: () => [],
  cssClass: ESliderPropsDefault.CSS_CLASS,
});
const slots = defineSlots<TSliderSlots>();
const emits = defineEmits<TSliderEmits>();

const sliderRef = useTemplateRef('slider');

const currentThumbIndex = ref<number>(-1);
const currentActivity: Ref<TCurrentActivityType | null> = ref(null);
const thumbsDrag: Ref<Map<string, boolean>> = ref<Map<string, boolean>>(new Map<string, boolean>());
const touchActive = ref<boolean>(false);
const lastTouchPosition = ref<number>(0);

const {
  uniqueID,
  componentClasses,
  commonPoints,
  clamp,
  roundByStep,
  getPercentageByValue,
  getAdditionalTrackClasses,
  getThumbClasses,
  calculateStylesForTrackByValue,
  calculateNewTrackValue,
  calculateFirstWithThumbIndex,
  getDirection,
  findClosestPoint,
  updateValue,
  onMouseOver,
  onMouseLeave,
  onExpandEnter,
  onExpandAfterEnter,
  onExpandBeforeLeave,
} = useSlider(props, emits, sliderRef, currentThumbIndex);

const { onThumbMouseDown, onThumbTouchStart, onThumbPointerMove, onThumbPointerUp } =
  useThumbEvents(
    props,
    emits,
    currentThumbIndex,
    currentActivity,
    thumbsDrag,
    touchActive,
    lastTouchPosition,
    calculateNewTrackValue,
    updateValue,
  );

const { onSliderMouseDown, onSliderTouchStart, onSliderPointerMove, onSliderPointerUp } =
  useSliderEvents(
    props,
    emits,
    currentThumbIndex,
    currentActivity,
    touchActive,
    lastTouchPosition,
    getDirection,
    calculateFirstWithThumbIndex,
    calculateNewTrackValue,
    updateValue,
  );

const { onWindowMouseMove, onWindowTouchMove, onWindowMouseUp, onWindowTouchEnd } = useWindowEvents(
  currentActivity,
  touchActive,
  lastTouchPosition,
  onSliderPointerMove,
  onThumbPointerMove,
  onSliderPointerUp,
  onThumbPointerUp,
);

onMounted(() => {
  window.addEventListener('mousemove', onWindowMouseMove);
  window.addEventListener('mouseup', onWindowMouseUp);
  window.addEventListener('touchmove', onWindowTouchMove);
  window.addEventListener('touchend', onWindowTouchEnd);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', onWindowMouseMove);
  window.removeEventListener('mouseup', onWindowMouseUp);
  window.removeEventListener('touchmove', onWindowTouchMove);
  window.removeEventListener('touchend', onWindowTouchEnd);
});

onMounted(() => {
  if (props.modelValue.length !== props.tracks.length) {
    props.tracks.forEach((_, index) => {
      if (props.modelValue[index]) {
        return;
      }

      updateValue(0, index);
    });
  }

  props.modelValue.forEach((value, index) => {
    if (Array.isArray(value)) {
      const newValue = [Math.min(...value), Math.max(...value)];

      updateValue(
        [
          findClosestPoint(roundByStep(clamp(props.min, newValue[0], props.max))),
          findClosestPoint(roundByStep(clamp(props.min, newValue[1], props.max))),
        ],
        index,
      );
      return;
    }

    updateValue(findClosestPoint(roundByStep(clamp(props.min, value, props.max))), index);
  });
});
</script>
