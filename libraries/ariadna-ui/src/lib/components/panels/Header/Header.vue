<template>
  <component :is="props.tag" :class="[componentClasses, scrollClasses]" v-on="listeners">
    <div
      v-if="!!slots.logo || !!slots.title || !!slots.subtitle"
      :class="`${props.cssClass}__head`"
    >
      <div v-if="!!slots.logo" :class="`${props.cssClass}__head-logo`">
        <slot name="logo"></slot>
      </div>

      <div v-if="!!slots.title" :class="`${props.cssClass}__head-title`">
        <slot name="title"></slot>
      </div>

      <div v-if="!!slots.subtitle" :class="`${props.cssClass}__head-subtitle`">
        <slot name="subtitle"></slot>
      </div>
    </div>

    <div v-if="!!slots.default" :class="`${props.cssClass}__content`">
      <slot name="default"></slot>
    </div>

    <div v-if="!!slots.right" :class="`${props.cssClass}__right`">
      <slot name="right"></slot>
    </div>
  </component>
</template>

<script setup lang="ts">
// Types
import type { THeaderEmits, THeaderProps, THeaderSlots } from './Header';
import { EHeaderPropsDefault } from './types/Header.enums';

// Composables
import useHeader from './composables/useHeader/useHeader';
import useHeaderScroll from './composables/useHeaderScroll/useHeaderScroll';

const props = withDefaults(defineProps<THeaderProps>(), {
  tag: EHeaderPropsDefault.TAG,
  cssClass: EHeaderPropsDefault.CSS_CLASS,
});
const slots = defineSlots<THeaderSlots>();
const emits = defineEmits<THeaderEmits>();

const { listeners, componentClasses } = useHeader(props);
const { scrollClasses } = useHeaderScroll(props, emits);
</script>
