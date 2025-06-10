<template>
  <Button @click="loadData" :loading="!data.length && menuDesktopState">
    <template #loading>
      <Spinner size="small" />
    </template>
    {{ !data.length && !menuDesktopState ? 'Загрузить меню' : 'Закрыть меню' }}
  </Button>

  <component
    v-if="menuDesktopState"
    :is="asyncDesktopMenu"
    :data="data"
    :visible-items="3"
    @mounted="onMenuMounted"
    @click:overlay="onClickOverlay"
  >
  </component>
</template>

<script setup lang="ts">
// Vue
import { defineAsyncComponent } from 'vue';

// Components
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
import Spinner from '@iwyfaf-vue-ui/ariadna-ui/Spinner';

// Composables
import useDesktopMenu from './useDesktopMenu';

const asyncDesktopMenu = defineAsyncComponent(
  async () => await import('@iwyfaf-vue-ui/ariadna-ui/DesktopMenu'),
);

const { data, menuDesktopState, loadData, onMenuMounted, onClickOverlay } = useDesktopMenu();
</script>
