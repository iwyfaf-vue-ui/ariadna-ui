<template>
  <div :class="componentClasses">
    <div v-if="!!slots.header" :class="`${props.cssClass}__header`">
      <slot name="header" />
    </div>

    <div v-if="!!slots.description" :class="`${props.cssClass}__description`">
      <slot name="description" />
    </div>

    <div :class="`${props.cssClass}__component`">
      <component v-if="props.component" :is="props.component" />
      <template v-else>No component provided.</template>
    </div>

    <div v-if="props.showCodeToggle && props.componentSource" :class="`${props.cssClass}__action`">
      <div :class="`${props.cssClass}__action-toggle`">
        <slot name="showCodeToggle" :toggle="toggleCode" :is-shown="showCode">
          <button type="button" :aria-pressed="showCode" @click="toggleCode">
            {{ showCode ? 'Hide code' : 'Show code' }}
          </button>
        </slot>
      </div>

      <div v-if="showCode" :class="`${props.cssClass}__action-copy`">
        <slot name="copy" :handler="handleCopy" :isCopied="isCopied">
          <button type="button" :aria-live="isCopied ? 'polite' : undefined" @click="handleCopy">
            {{ isCopied ? 'Copied!' : 'Copy code to clipboard' }}
          </button>
        </slot>
      </div>
    </div>

    <Transition
      :name="`${cssClass}__code-expand`"
      @enter="onExpandEnter"
      @after-enter="onExpandAfterEnter"
      @before-leave="onExpandBeforeLeave"
    >
      <div v-if="showCode" :class="`${props.cssClass}__code`" tabindex="0">
        <slot name="source" :source="props.componentSource!">
          <pre><code>{{ props.componentSource }}</code></pre>
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
// Types
import type { TPreviewerProps, TPreviewerSlots } from './Previewer';
import { EPreviewerPropsDefault } from './types/Previewer.enums';

// Composables
import usePreviewer from './composables/usePreviewer/usePreviewer';

const props = withDefaults(defineProps<TPreviewerProps>(), {
  cssClass: EPreviewerPropsDefault.CSS_CLASS,
  showCodeToggle: true,
});
const slots = defineSlots<TPreviewerSlots>();

const {
  showCode,
  isCopied,
  componentClasses,
  toggleCode,
  handleCopy,
  onExpandEnter,
  onExpandAfterEnter,
  onExpandBeforeLeave,
} = usePreviewer(props);
</script>
