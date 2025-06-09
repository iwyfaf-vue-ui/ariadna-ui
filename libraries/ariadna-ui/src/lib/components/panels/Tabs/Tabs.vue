<template>
  <div :class="componentClasses">
    <div ref="headerContainer" :class="`${props.cssClass}__header`" role="tablist">
      <div
        :class="`${props.cssClass}__header-box`"
        :style="props.slide ? `transform: translateX(${slideCore.offset * -1}px);` : undefined"
      >
        <div
          v-for="(tab, index) in tabs"
          :key="keysCore.keys[index]"
          :id="keysCore.keys[index]"
          :class="{
            [`${props.cssClass}__tab`]: true,
            [`${props.cssClass}__tab-${index}`]: true,
            [`${props.cssClass}__tab--active`]: keysCore.keys[index] === activeTabKey,
          }"
          :aria-selected="keysCore.keys[index] === activeTabKey"
          :aria-controls="`panel-${keysCore.keys[index]}`"
          :tabindex="keysCore.keys[index] !== activeTabKey ? 0 : -1"
          role="tab"
          @mouseup="switchTab(keysCore.keys[index])"
          @touchend="switchTab(keysCore.keys[index])"
          @keydown.prevent.enter="switchTab(keysCore.keys[index])"
          @keydown.prevent.space="switchTab(keysCore.keys[index])"
          @keydown.prevent.right="nextTab"
          @keydown.prevent.left="prevTab"
        >
          <slot
            :name="`label-${index}`"
            :item="tab"
            :selected="keysCore.keys[index] === activeTabKey"
          >
            {{ tab[props.titleKey] }}
          </slot>
        </div>
      </div>
    </div>

    <div
      v-for="(tab, index) in props.tabs"
      :class="{
        [`${props.cssClass}__content`]: true,
        [`${props.cssClass}__content-${index}`]: true,
        [`${props.cssClass}__content--active`]: keysCore.keys[index] === activeTabKey,
      }"
      :id="`panel-${keysCore.keys[index]}`"
      :aria-labelledby="keysCore.keys[index]"
      role="tabpanel"
    >
      <slot :name="`default-${index}`" :item="tab">
        {{ tab[props.titleKey] }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue
import { useTemplateRef, ref } from 'vue';

// Types
import type { TTabsEmits, TTabsProps, TTabsSlots } from '../Tabs/Tabs';
import { ETabsPropsDefault } from '../Tabs/types/Tabs.enums';

// Core
import type { TKeysCore } from '@/lib/components/panels/Tabs/core/keys/keys.core.types';
import KeysCore from '@/lib/components/panels/Tabs/core/keys/keys.core';

// Composables
import useTabs from './composables/useTabs/useTabs';
import useSlide from './composables/useSlide/useSlide';

const props = withDefaults(defineProps<TTabsProps>(), {
  tabs: () => [],
  openedByDefault: 0,
  titleKey: ETabsPropsDefault.TITLE_KEY,
  cssClass: ETabsPropsDefault.CSS_CLASS,
});
const slots = defineSlots<TTabsSlots>();
const emits = defineEmits<TTabsEmits>();

const headerContainerRef = useTemplateRef('headerContainer');

const keysCore = ref<TKeysCore>(new KeysCore(props.tabs, props.titleKey));
const slideCore = useSlide(headerContainerRef, props.slide);

const { componentClasses, activeTabKey, switchTab, nextTab, prevTab } = useTabs(
  props,
  emits,
  keysCore,
  slideCore,
);
</script>
