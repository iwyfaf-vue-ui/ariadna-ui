<template>
  <div
    ref="virtualScroller"
    :class="componentClasses"
    :style="rootStyle"
    @scroll.passive="calculateRange"
  >
    <div :class="`${props.cssClass}__content`" :style="contentStyle">
      <div :class="`${props.cssClass}__item`" v-for="item in dataList">
        <slot :item="item">
          {{ item.data }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup generic="Data">
// Vue
import type { Ref } from 'vue';
import { onMounted, reactive, ref, shallowRef, useTemplateRef, watch } from 'vue';

// Types
import type {
  TVirtualScrollerExposes,
  TVirtualScrollerProps,
  TVirtualScrollerSlots,
} from './VirtualScroller';
import { EVirtualScrollerPropsDefault } from './types/VirtualScroller.enums';
import type { TVirtualScrollerIndexes } from './types/VirtualScroller.types';

// Composables
import useVirtualScroller from './composables/useVirtualScroller/useVirtualScroller';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<TVirtualScrollerProps<Data>>(), {
  items: () => [],
  height: EVirtualScrollerPropsDefault.HEIGHT,
  overscan: EVirtualScrollerPropsDefault.OVERSCAN,
  cssClass: EVirtualScrollerPropsDefault.CSS_CLASS,
});
const slots = defineSlots<TVirtualScrollerSlots<Data>>();

const virtualScrollerRef = useTemplateRef('virtualScroller');
const size = reactive({ width: 0, height: 0 });
const source = shallowRef(props.items);
const state: Ref<TVirtualScrollerIndexes> = ref({ start: 0, end: 10 });
const visibleItemsIndexes: Ref<TVirtualScrollerIndexes> = ref({ start: 0, end: 10 });

const {
  dataList,
  getViewCapacity,
  calculateRange,
  scrollTo,
  rootStyle,
  contentStyle,
  componentClasses,
} = useVirtualScroller<Data>(props, virtualScrollerRef, source, state, visibleItemsIndexes);

onMounted(() => {
  if (!virtualScrollerRef.value) {
    return;
  }

  size.height = virtualScrollerRef.value.clientHeight;
  size.width = virtualScrollerRef.value.clientWidth;
});

defineExpose<TVirtualScrollerExposes>({
  scrollTo,
  getVisibleIndexes: () => visibleItemsIndexes.value,
});

watch(
  () => props.items,
  (newItems) => {
    source.value = newItems;
    if (state.value.start > newItems.length - 1)
      scrollTo(newItems.length - getViewCapacity(virtualScrollerRef.value?.clientHeight || 0));
  },
  { deep: true },
);

watch([size, source], calculateRange, { deep: true });
</script>
