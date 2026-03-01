<template>
  <div :class="[componentClasses, collapseClasses]" v-on="listeners">
    <div
      v-if="!!slots.header || !!props.header || props.toggleable"
      :class="`${props.cssClass}__header`"
    >
      <slot name="header" :isCollapsed="isInnerCollapsed">
        {{ props.header }}
      </slot>

      <div v-if="!!slots.icons" :class="`${props.cssClass}__icons`">
        <slot name="icons"></slot>
      </div>

      <div v-if="props.toggleable" :class="`${props.cssClass}__expander`">
        <slot
          name="toggleButton"
          :isCollapsed="isInnerCollapsed"
          :toggleCollapsed="collapseHandler"
        >
          <Button
            size="small"
            @click="collapseHandler"
            :modifier="props.modifier"
            :aria-label="isInnerCollapsed ? 'Expand' : 'Collapse'"
          >
            <template #icon>
              <slot name="toggleIcon" :isCollapsed="isInnerCollapsed">
                {{ isInnerCollapsed ? '+' : '-' }}
              </slot>
            </template>
          </Button>
        </slot>
      </div>
    </div>

    <Transition
      :name="`${cssClass}__inner--collapse`"
      @enter="onCollapseEnter"
      @after-enter="onCollapseAfterEnter"
      @before-leave="onCollapseBeforeLeave"
    >
      <div v-show="!isInnerCollapsed" :class="`${props.cssClass}__inner`">
        <div :class="`${props.cssClass}__content`">
          <slot name="default"></slot>
        </div>

        <div v-if="!!slots.footer" :class="`${props.cssClass}__footer`">
          <slot name="footer"></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
// Types
import type { TPanelEmits, TPanelProps, TPanelSlots } from './Panel';
import { EPanelPropsDefault } from './types/Panel.enums';

// Composables
import usePanel from './composables/usePanel/usePanel';
import usePanelCollapse from './composables/usePanelCollapse/usePanelCollapse';

// Components
import Button from '@/lib/components/buttons/Button/Button.vue';

const props = withDefaults(defineProps<TPanelProps>(), {
  cssClass: EPanelPropsDefault.CSS_CLASS,
});
const slots = defineSlots<TPanelSlots>();
const emits = defineEmits<TPanelEmits>();

const { listeners, componentClasses } = usePanel(props);
const {
  isInnerCollapsed,
  collapseHandler,
  onCollapseEnter,
  onCollapseAfterEnter,
  onCollapseBeforeLeave,
  collapseClasses,
} = usePanelCollapse(props, emits);

defineExpose({
  toggle: collapseHandler,
});
</script>
