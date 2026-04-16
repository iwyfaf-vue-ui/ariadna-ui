<template>
  <hr :class="separatorClass" role="separator" aria-orientation="horizontal" />
</template>

<script setup lang="ts">
// Vue
import { computed } from 'vue';

// Shared
import injectStrict from '@/shared/validators/vue/inject-strict.vue.validator';

// Providers
import { DropdownMenuProviderKey } from '../../providers/DropdownMenu.provider';

const { cssClass } = injectStrict(DropdownMenuProviderKey);

const separatorClass = computed(() => `${cssClass}__separator`);
</script>
