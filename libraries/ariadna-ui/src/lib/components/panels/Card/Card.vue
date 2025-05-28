<template>
  <component :is="props.tag" :class="componentClasses">
    <div :class="`${props.cssClass}__body`">
      <div v-if="!!slots.picture" :class="`${props.cssClass}__picture`">
        <slot name="picture"></slot>
      </div>

      <div
        v-if="!!slots.contentHeader || !!slots.content || !!slots.contentFooter"
        :class="`${props.cssClass}__content`"
      >
        <div v-if="!!slots.contentHeader" :class="`${props.cssClass}__content-header`">
          <slot name="contentHeader"></slot>
        </div>

        <Transition
          :name="`${cssClass}__content-text--collapse`"
          @enter="onCollapseEnter"
          @after-enter="onCollapseAfterEnter"
          @before-leave="onCollapseBeforeLeave"
        >
          <div
            v-show="!isContentCollapsed"
            v-if="!!slots.content"
            :class="{
              [`${props.cssClass}__content-text`]: true,
              [`${props.cssClass}__content-text--collapsed`]: isContentCollapsed,
            }"
          >
            <slot
              name="content"
              :isCollapsed="isContentCollapsed"
              :toggleCollapsed="toggleCollapsed"
            ></slot>
          </div>
        </Transition>

        <div v-if="!!slots.contentFooter" :class="`${props.cssClass}__content-footer`">
          <slot
            name="contentFooter"
            :isCollapsed="isContentCollapsed"
            :toggleCollapsed="toggleCollapsed"
          ></slot>
        </div>
      </div>
    </div>

    <div v-if="!!slots.footer" :class="`${props.cssClass}__footer`">
      <slot name="footer"></slot>
    </div>
  </component>
</template>

<script setup lang="ts">
// Types
import type { TCardProps, TCardSlots } from './Card';
import { ECardPropsDefault } from './types/Card.enums';

// Composables
import useCard from './composables/useCard/useCard';

const props = withDefaults(defineProps<TCardProps>(), {
  tag: ECardPropsDefault.TAG,
  cssClass: ECardPropsDefault.CSS_CLASS,
});
const slots = defineSlots<TCardSlots>();

const {
  componentClasses,
  isContentCollapsed,
  toggleCollapsed,
  toggleCollapsedDefault,
  onCollapseEnter,
  onCollapseAfterEnter,
  onCollapseBeforeLeave,
} = useCard(props);

toggleCollapsedDefault();
</script>
