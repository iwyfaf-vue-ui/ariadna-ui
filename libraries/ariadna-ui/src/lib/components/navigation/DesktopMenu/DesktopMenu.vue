<template>
  <nav :class="componentClasses">
    <div :class="`${props.cssClass}__wrapper`">
      <div :class="`${props.cssClass}__container`">
        <template v-if="isDataExist">
          <div :class="`${props.cssClass}__rubricator`">
            <slot
              name="rubricator"
              :data="props.data"
              :secondLevelVisibleHandler="secondLevelVisibleHandler"
              :activeMenu="activeMenu"
            >
              <template v-for="rubricator in props.data" :key="rubricator">
                <a
                  v-if="rubricator.attributes.url"
                  :href="rubricator.attributes.url"
                  :title="rubricator.attributes.title"
                  :rel="rubricator.attributes.outside ? 'nofollow' : undefined"
                  :target="rubricator.attributes.outside ? '_blank' : undefined"
                  :class="{
                    [`${props.cssClass}__rubricator-item`]: true,
                    [`${props.cssClass}__rubricator-item--active`]: rubricator === activeMenu,
                  }"
                  @mouseover="secondLevelVisibleHandler(rubricator)"
                >
                  <span
                    v-if="rubricator.icon.before"
                    :class="`${props.cssClass}__rubricator-icon-before`"
                  >
                    <i :class="rubricator.icon.before" />
                  </span>

                  <span :class="`${props.cssClass}__rubricator-text`">
                    {{ rubricator.name }}
                  </span>

                  <span
                    v-if="rubricator.icon.after"
                    :class="`${props.cssClass}__rubricator-icon-after`"
                  >
                    <i :class="rubricator.icon.after" />
                  </span>
                </a>

                <span
                  v-else
                  :title="rubricator.attributes.title"
                  :class="`${props.cssClass}__rubricator-item`"
                  @[eventType]="secondLevelVisibleHandler(rubricator)"
                >
                  <span
                    v-if="rubricator.icon.before"
                    :class="`${props.cssClass}__rubricator-icon-before`"
                  >
                    <i :class="rubricator.icon.before" />
                  </span>

                  <span :class="`${props.cssClass}__rubricator-text`">
                    {{ rubricator.name }}
                  </span>

                  <span
                    v-if="rubricator.icon.after"
                    :class="`${props.cssClass}__rubricator-icon-after`"
                  >
                    <i :class="rubricator.icon.after" />
                  </span>
                </span>
              </template>
            </slot>
          </div>

          <slot
            v-if="activeMenu && activeMenu.children"
            name="menu"
            :data="activeMenu"
            :mapShowMoreState="mapShowMoreState"
            :showMoreHandler="showMoreHandler"
            :isMenuElementHidden="isMenuElementHidden"
          >
            <div :class="`${props.cssClass}__menu`">
              <div :class="`${props.cssClass}__menu-title`">
                {{ activeMenu.name }}
              </div>

              <div :class="`${props.cssClass}__menu-wrapper`">
                <div
                  v-for="secondLevel in activeMenu.children"
                  :class="`${props.cssClass}__menu-items`"
                >
                  <a
                    v-if="secondLevel.attributes.url"
                    :href="secondLevel.attributes.url"
                    :title="secondLevel.attributes.title"
                    :rel="secondLevel.attributes.outside ? 'nofollow' : undefined"
                    :target="secondLevel.attributes.outside ? '_blank' : undefined"
                    :class="`${props.cssClass}__menu-subtitle`"
                  >
                    {{ secondLevel.name }}
                  </a>

                  <div v-if="secondLevel.children" :class="`${props.cssClass}__submenu`">
                    <span
                      v-for="(thirdLevel, thirdLevelIdx) in secondLevel.children"
                      :key="thirdLevelIdx"
                    >
                      <a
                        v-if="thirdLevel.attributes.url"
                        :href="thirdLevel.attributes.url"
                        :title="thirdLevel.attributes.title"
                        :rel="thirdLevel.attributes.outside ? 'nofollow' : undefined"
                        :target="thirdLevel.attributes.outside ? '_blank' : undefined"
                        :class="{
                          [`${props.cssClass}__submenu-item`]: true,
                          [`${props.cssClass}__submenu-item--hidden`]: isMenuElementHidden(
                            thirdLevelIdx,
                            secondLevel.children,
                          ),
                        }"
                      >
                        {{ thirdLevel.name }}
                      </a>
                    </span>

                    <div
                      v-if="props.visibleItems && secondLevel.children.length > props.visibleItems"
                      :class="`${props.cssClass}__submenu-more`"
                    >
                      <span @click="showMoreHandler(secondLevel.children)">
                        {{
                          mapShowMoreState.get(secondLevel.children) ? 'Свернуть' : 'Развернуть все'
                        }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </slot>
        </template>

        <div v-else :class="`${props.cssClass}__loading`">
          <slot name="loading"> </slot>
        </div>
      </div>

      <div v-if="props.invalid" :class="`${props.cssClass}__error`">
        <slot name="error"> </slot>
      </div>
    </div>

    <div :class="`${props.cssClass}__overlay`" v-if="props.overlay" @click="onOverlayClick"></div>
  </nav>
</template>

<script setup lang="ts">
// Types
import type {
  TDesktopMenuProps,
  TDesktopMenuSlots,
  TDesktopMenuEmits,
} from '../DesktopMenu/DesktopMenu';
import { EDesktopMenuPropsDefault } from '../DesktopMenu/types/DesktopMenu.enums';

// Composables
import useDesktopMenu from './composables/useDesktopMenu/useDesktopMenu';

const props = withDefaults(defineProps<TDesktopMenuProps>(), {
  data: () => [],
  expandMode: EDesktopMenuPropsDefault.EXPAND_MODE,
  visibleItems: 0,
  overlay: true,
  cssClass: EDesktopMenuPropsDefault.CSS_CLASS,
});
const slots = defineSlots<TDesktopMenuSlots>();
const emits = defineEmits<TDesktopMenuEmits>();

const {
  mapShowMoreState,
  activeMenu,
  isDataExist,
  componentClasses,
  isMenuElementHidden,
  eventType,
  secondLevelVisibleHandler,
  showMoreHandler,
  onOverlayClick,
} = useDesktopMenu(props, emits);
</script>
