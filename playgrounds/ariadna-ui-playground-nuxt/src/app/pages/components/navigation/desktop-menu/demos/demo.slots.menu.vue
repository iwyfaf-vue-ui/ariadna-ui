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
    :visible-items="visibleItems"
    @mounted="onMenuMounted"
    @click:overlay="onClickOverlay"
  >
    <template #menu="{ data, mapShowMoreState, showMoreHandler, isMenuElementHidden }">
      <div :class="`${cssClass}__menu`">
        <h3 :class="`${cssClass}__menu-title`">
          <a v-if="data.attributes.url" :href="data.attributes.url">
            {{ data.name }}
          </a>

          <span v-else>{{ data.name }}</span>
        </h3>

        <div :class="`${cssClass}__menu-wrapper`">
          <div v-for="col in makeCols(data.children, 3)" :class="`${cssClass}__second-level-col`">
            <div v-for="secondLevel in col" :class="`${cssClass}__menu-items`">
              <h5>
                <a
                  v-if="secondLevel.attributes.url"
                  :href="secondLevel.attributes.url"
                  :rel="secondLevel.attributes.outside ? 'nofollow' : undefined"
                  :target="secondLevel.attributes.outside ? '_blank' : undefined"
                  :title="secondLevel.attributes.title"
                  :class="`${cssClass}__menu-subtitle`"
                >
                  {{ secondLevel.name }}
                </a>

                <span :class="`${cssClass}__menu-subtitle`" v-else>
                  {{ secondLevel.name }}
                </span>
              </h5>

              <div v-if="secondLevel.children" :class="`${cssClass}__submenu`">
                <span
                  v-for="(thirdLevel, thirdLevelIdx) in secondLevel.children"
                  :key="thirdLevelIdx"
                  :class="{
                    [`${cssClass}__submenu-item`]: true,
                    [`${cssClass}__submenu-item--hidden`]: isMenuElementHidden(
                      thirdLevelIdx,
                      secondLevel.children,
                    ),
                  }"
                >
                  <a
                    v-if="thirdLevel.attributes.url"
                    :href="thirdLevel.attributes.url"
                    :rel="thirdLevel.attributes.outside ? 'nofollow' : undefined"
                    :target="thirdLevel.attributes.outside ? '_blank' : undefined"
                    :title="thirdLevel.attributes.title"
                  >
                    {{ thirdLevel.name }}
                  </a>
                </span>

                <div
                  v-if="visibleItems && secondLevel.children.length > visibleItems"
                  :class="`${cssClass}__submenu-more`"
                >
                  <Button size="small" @click="showMoreHandler(secondLevel.children)">
                    {{ mapShowMoreState.get(secondLevel.children) ? 'Свернуть' : 'Ещё' }}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
const visibleItems = 3;

function makeCols<T>(array: T[], groups: number): T[][] {
  const result: T[][] = Array.from({ length: groups }, () => []);

  array.forEach((item, index) => {
    result[index % groups].push(item);
  });

  return result;
}

const { data, menuDesktopState, loadData, onMenuMounted, onClickOverlay } = useDesktopMenu();
</script>
