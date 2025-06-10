<template>
  <Button @click="loadData" :loading="!data.length && menuDesktopState">
    <template #loading>
      <Spinner size="small" />
    </template>
    {{ !data.length && !menuDesktopState ? 'Загрузить меню' : 'Закрыть меню' }}
  </Button>

  <Button @click="invalidState = !invalidState"> Toggle invalid state </Button>

  <component
    v-if="menuDesktopState"
    :is="asyncDesktopMenu"
    :data="data"
    :invalid="invalidState"
    @mounted="onMenuMounted"
    @click:overlay="onClickOverlay"
  >
  </component>
</template>

<script setup lang="ts">
// Vue
import { ref, defineAsyncComponent } from 'vue';

// Components
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
import Spinner from '@iwyfaf-vue-ui/ariadna-ui/Spinner';

// Composables
import useDesktopMenu from './useDesktopMenu';

const asyncDesktopMenu = defineAsyncComponent(
  async () => await import('@iwyfaf-vue-ui/ariadna-ui/DesktopMenu'),
);

const invalidState = ref(false);

const { data, menuDesktopState, loadData, onMenuMounted, onClickOverlay } = useDesktopMenu();
</script>
