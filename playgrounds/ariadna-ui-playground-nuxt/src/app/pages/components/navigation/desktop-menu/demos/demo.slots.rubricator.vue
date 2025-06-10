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
    @mounted="onMenuMounted"
    @click:overlay="onClickOverlay"
  >
    <template #rubricator="{ data, secondLevelVisibleHandler, activeMenu }">
      <template v-for="rubricator in data" :key="rubricator">
        <a
          v-if="rubricator.attributes.url"
          :href="rubricator.attributes.url"
          :title="rubricator.attributes.title"
          :rel="rubricator.attributes.outside ? 'nofollow' : undefined"
          :target="rubricator.attributes.outside ? '_blank' : undefined"
          :class="{
            [`${cssClass}__rubricator-item`]: true,
            [`${cssClass}__rubricator-item--active`]: rubricator === activeMenu,
          }"
          @mouseover="secondLevelVisibleHandler(rubricator)"
        >
          <span v-if="rubricator.icon.before" :class="`${cssClass}__rubricator-icon-before`">
            <i :class="rubricator.icon.before" />
          </span>

          <span :class="`${cssClass}__rubricator-text`"> {{ rubricator.name }} 💩 </span>

          <span v-if="rubricator.icon.after" :class="`${cssClass}__rubricator-icon-after`">
            <i :class="rubricator.icon.after" />
          </span>
        </a>

        <span
          v-else
          :title="rubricator.attributes.title"
          :class="`${cssClass}__rubricator-item`"
          @mouseover="secondLevelVisibleHandler(rubricator)"
        >
          <span v-if="rubricator.icon.before" :class="`${cssClass}__rubricator-icon-before`">
            <i :class="rubricator.icon.before" />
          </span>

          <span :class="`${cssClass}__rubricator-text`"> {{ rubricator.name }} 💩 </span>

          <span v-if="rubricator.icon.after" :class="`${cssClass}__rubricator-icon-after`">
            <i :class="rubricator.icon.after" />
          </span>
        </span>
      </template>
    </template>
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

const cssClass = 'ar-desktop-menu';

const { data, menuDesktopState, loadData, onMenuMounted, onClickOverlay } = useDesktopMenu();
</script>
