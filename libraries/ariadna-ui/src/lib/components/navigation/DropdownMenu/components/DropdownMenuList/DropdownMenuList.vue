<template>
  <ul ref="listEl" :class="componentClasses" role="menu" aria-orientation="vertical">
    <DropdownMenuItem
      v-for="(item, idx) in props.data"
      :key="idx"
      :item="item"
      :level="props.level"
    />
  </ul>
</template>

<script setup lang="ts">
// Vue
import { computed, useTemplateRef } from 'vue';

// Components
import DropdownMenuItem from '../DropdownMenuItem/DropdownMenuItem.vue';

// Types
import type { TDropdownMenuListProps } from './DropdownMenuList';

// Composables
import injectStrict from '@/shared/validators/vue/inject-strict.vue.validator';

// Providers
import { DropdownMenuProviderKey } from '../../providers/DropdownMenu.provider';

const props = withDefaults(defineProps<TDropdownMenuListProps>(), {
  level: 1,
});

const { cssClass } = injectStrict(DropdownMenuProviderKey);

const listEl = useTemplateRef<HTMLElement>('listEl');

const componentClasses = computed(() => {
  const base = `${cssClass}__list`;
  const sub = props.level > 1 ? `${base}--sub` : undefined;
  const level = `${base}--level-${props.level}`;

  return [base, sub, level].filter(Boolean).join(' ');
});
</script>
