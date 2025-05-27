<template>
  <div
    :class="componentClasses"
    :tabindex="props.readonly || props.disabled ? -1 : 0"
    @focus="onFocus"
    @blur="onBlur"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave"
    @keydown.prevent.esc="onReset"
  >
    <label v-if="props.label" :for="uniqueID" :class="`${props.cssClass}__label`">
      {{ props.label }}
    </label>

    <div :class="`${props.cssClass}__group`" :style="ratingStyles">
      <div ref="rating" :id="uniqueID" :class="`${cssClass}__rating`" :title="readableRating">
        <div :class="`${cssClass}__rating-mask`" :style="ratingStarMaskStyles">
          <div :class="`${cssClass}__rating-mask--active`">
            <span v-for="item in starsCount" :key="`on-${item}`">
              <slot name="active">
                <svg viewBox="0 0 24 24">
                  <path
                    d="m23.363 8.584-7.378-1.127-3.307-7.044c-.247-.526-1.11-.526-1.357
                  0l-3.306 7.044-7.378 1.127c-.606.093-.848.83-.423 1.265l5.36
                  5.494-1.267 7.767c-.101.617.558 1.08
                  1.103.777l6.59-3.642 6.59 3.643c.54.3 1.205-.154
                  1.103-.777l-1.267-7.767 5.36-5.494c.425-.436.182-1.173-.423-1.266z"
                  />
                </svg>
              </slot>
            </span>
          </div>
        </div>

        <div :class="`${cssClass}__rating-mask--inactive`">
          <span v-for="item in starsCount" :key="`on-${item}`">
            <slot name="inactive">
              <svg viewBox="0 0 24 24">
                <path
                  d="m23.363 8.584-7.378-1.127-3.307-7.044c-.247-.526-1.11-.526-1.357
                  0l-3.306 7.044-7.378 1.127c-.606.093-.848.83-.423 1.265l5.36
                  5.494-1.267 7.767c-.101.617.558 1.08
                  1.103.777l6.59-3.642 6.59 3.643c.54.3 1.205-.154
                  1.103-.777l-1.267-7.767 5.36-5.494c.425-.436.182-1.173-.423-1.266z"
                />
              </svg>
            </slot>
          </span>
        </div>
      </div>

      <div v-if="props.showValue" :class="`${cssClass}__value`">
        <slot name="value" :value="readableRating" :starCount="props.starCount as number">
          <span :class="`${cssClass}__value-content`">
            {{ readableRating }}/{{ props.starCount }}
          </span>
        </slot>
      </div>
    </div>

    <div v-if="props.reset" :class="`${props.cssClass}__reset`">
      <slot name="reset" :reset="onReset">
        <button type="button" @click="onReset">Reset</button>
      </slot>
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
import { ref, useTemplateRef } from 'vue';

// Types
import type { TRatingEmits, TRatingProps, TRatingSlots } from '../Rating/Rating';
import { ERatingPropsDefault } from '../Rating/types/Rating.enums';

// Composables
import useRating from './composables/useRating/useRating';
import useRatingEvents from './composables/useRatingEvents/useRatingEvents';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<TRatingProps>(), {
  modelValue: 0,
  starCount: ERatingPropsDefault.STAR_COUNT,
  fillStep: ERatingPropsDefault.FILL_STEP,
  size: ERatingPropsDefault.SIZE,
  valuePosition: ERatingPropsDefault.VALUE_POSITION,
  errors: () => [],
  cssClass: ERatingPropsDefault.CSS_CLASS,
});
const slots = defineSlots<TRatingSlots>();
const emits = defineEmits<TRatingEmits>();

const ratingRef = useTemplateRef<HTMLDivElement>('rating');

const value = ref(props.modelValue);
const hoverValue = ref(0);

const {
  uniqueID,
  componentClasses,
  ratingStyles,
  readableRating,
  ratingStarMaskStyles,
  starsCount,
  onFocus,
  onBlur,
  onMouseOver,
  onMouseLeave,
  onReset,
  onExpandEnter,
  onExpandAfterEnter,
  onExpandBeforeLeave,
} = useRating(props, emits, value, hoverValue);

useRatingEvents(props, emits, ratingRef, value, hoverValue);
</script>
