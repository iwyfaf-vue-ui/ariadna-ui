<template>
  <nav :class="componentClasses" :aria-label="props.ariaLabel">
    <Transition :name="`${props.cssClass}__reveal`">
      <div v-if="opened" :class="`${props.cssClass}__overlay`">
        <div :class="`${props.cssClass}__header`">
          <slot
            name="fullHeader"
            :close="close"
            :label="currentMenuItem?.label || 'Header'"
            :opened="opened"
            :back="backStack"
            :backVisible="pageStackWithoutDelay.length > 1"
          >
            <div :class="backClasses" @click="backStack">
              <slot name="backIcon" :opened="opened" :back="backStack">Назад</slot>
            </div>

            <div :class="`${props.cssClass}__header-label`">
              <slot name="headerLabel" :opened="opened" :item="currentMenuItem">
                {{ currentMenuItem?.label || 'Хедер' }}
              </slot>
            </div>

            <div :class="`${props.cssClass}__header-close`" @click="onClickClose">
              <slot name="closeIcon" :opened="opened" :close="close">Закрыть</slot>
            </div>
          </slot>
        </div>

        <div :class="menuClasses" :style="`transform: translateX(-${pageTranslateX}px)`">
          <div
            ref="pages"
            v-if="currentMenuItem"
            v-for="(page, index) in pageStackWithoutDelay"
            :key="page.level"
            :class="`${props.cssClass}__page`"
          >
            <slot
              name="allContent"
              :opened="opened"
              :menu="props.menu"
              :currentMenuItem="currentMenuItem"
              :on-click="onClickPageItem"
            >
              <slot
                :name="`menu-${currentMenuItem.key}`"
                :opened="opened"
                :item="currentMenuItem"
                :on-click="onClickPageItem"
              >
                <div v-if="currentMenuItem.loading" :class="`${props.cssClass}__page-loading`">
                  <slot name="loading" :opened="opened" :item="currentMenuItem">Loading</slot>
                </div>

                <template v-else>
                  <div
                    v-if="page.item?.attributes.url && page.item"
                    :class="`${props.cssClass}__page-title`"
                  >
                    <slot
                      name="pageStackTitle"
                      :level="index + 1"
                      :opened="opened"
                      :item="page.item"
                    >
                      <a :href="page.item.attributes.url">{{ page.item?.name }}</a>
                    </slot>
                  </div>

                  <div
                    v-for="item in page.item?.children ||
                    page.menuItem?.items ||
                    currentMenuItem.items"
                    :class="`${props.cssClass}__page-item`"
                    :key="item.name"
                    @click="onClickPageItem(item)"
                  >
                    <slot name="item" :item="item" :opened="opened">
                      <slot
                        v-if="item.icon.before"
                        name="itemBeforeIcon"
                        :icon="item.icon.before"
                        :opened="opened"
                      >
                        <i :class="`${props.cssClass}__item-before-icon ${item.icon.before}`" />
                      </slot>

                      <a
                        v-if="item.attributes.url && item.children.length <= 0"
                        :href="item.attributes.url"
                        :title="item.attributes.title"
                        :target="item.attributes.outside ? '_blank' : undefined"
                        :rel="item.attributes.outside ? 'nofollow' : undefined"
                        :class="`${props.cssClass}__item-label`"
                        @click.prevent
                      >
                        <slot name="itemLabel" :label="item.name" :opened="opened">
                          {{ item.name }}
                        </slot>
                      </a>
                      <span
                        v-else
                        :class="`${props.cssClass}__item-label`"
                        :title="item.attributes.title"
                      >
                        <slot name="itemLabel" :label="item.name" :opened="opened">
                          {{ item.name }}
                        </slot>
                      </span>

                      <slot
                        v-if="item.icon.after"
                        name="itemAfterIcon"
                        :opened="opened"
                        :icon="item.icon.after"
                      >
                        <i :class="`${props.cssClass}__item-after-icon ${item.icon.after}`" />
                      </slot>
                    </slot>
                  </div>
                </template>
              </slot>
            </slot>
          </div>
        </div>
      </div>
    </Transition>

    <div :class="`${props.cssClass}__navbar`">
      <div
        v-for="menuItem in props.menu"
        :class="{
          [`${props.cssClass}__navbar-item`]: true,
          [`${props.cssClass}__navbar-item--${menuItem.class}`]: menuItem.class,
          [`${props.cssClass}__navbar-item--active`]: currentMenuItem?.key === menuItem.key,
        }"
        :key="menuItem.key"
        @click="onClickMenuItem(menuItem)"
      >
        <slot name="navbarItem" :item="menuItem" :opened="currentMenuItem?.key === menuItem.key">
          <i
            v-if="menuItem.icon"
            :class="`${props.cssClass}__navbar-item-icon ${menuItem.icon}`"
          ></i>
          <span :class="`${props.cssClass}__navbar-item-label`">{{ menuItem.label }}</span>
        </slot>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
// Vue
import { ref, useTemplateRef, onMounted, onUnmounted } from 'vue';

// Types
import type {
  TMobileMenuProps,
  TMobileMenuSlots,
  TMobileMenuEmits,
  TSharedMenu,
} from '../MobileMenu/MobileMenu';
import type { TMobileMenuItem } from './types/MobileMenu.types';
import { EMobileMenuPropsDefault } from '../MobileMenu/types/MobileMenu.enums';

// Composables
import useMobileMenu from './composables/useMobileMenu/useMobileMenu';
import useMobileMenuStack from './composables/useMobileMenuStack/useMobileMenuStack';
import useDelayedValue from '@/lib/composables/reactivity/useDelayedValue/useDelayedValue';

const props = withDefaults(defineProps<TMobileMenuProps>(), {
  animationTime: 300,
  cssClass: EMobileMenuPropsDefault.CSS_CLASS,
});
const slots = defineSlots<TMobileMenuSlots>();
const emits = defineEmits<TMobileMenuEmits>();

const pagesRef = useTemplateRef<Array<HTMLDivElement> | null>('pages');

const currentMenuItem = ref<TMobileMenuItem | null>(null);

const { delayedValue: menuResizeWithDelay, immediateValue: menuResizeWithoutDelay } =
  useDelayedValue<boolean>(false, 20);

const {
  pageTranslateX,
  pageStackWithoutDelay,
  isBackWithoutDelay,
  calculateTranslateX,
  clearStack,
  toHome,
  addToStack,
  addToStackMenuItem,
  backStack,
} = useMobileMenuStack(props, pagesRef, currentMenuItem);

const { opened, componentClasses, menuClasses, backClasses, open, close, toggle } = useMobileMenu(
  props,
  emits,
  currentMenuItem,
  menuResizeWithoutDelay,
  pageStackWithoutDelay,
);

function onClickClose() {
  close();
  clearStack();
}

function onClickMenuItem(item: TMobileMenuItem) {
  const prevMenuItem = currentMenuItem.value || null;
  currentMenuItem.value = item;

  let isPreventDefault = false;
  const preventDefault = () => (isPreventDefault = true);

  item.command?.({
    back: backStack,
    close,
    home: toHome,
    open,
    toggle,
    preventDefault,
    clearStack,
    addToStack: () => addToStackMenuItem(item, prevMenuItem),
    opened: opened.value,
    menuItem: item,
    previousMenuItem: prevMenuItem,
  });

  if (isPreventDefault) {
    return;
  }

  if (opened.value && item.key !== prevMenuItem?.key) {
    clearStack();
    addToStackMenuItem(item, null);
    return;
  }

  if (opened.value) {
    clearStack();
    close();
    return;
  }

  clearStack();
  open();
  addToStackMenuItem(item, null);
}

function onClickPageItem(item: TSharedMenu) {
  if (!(item.children.length <= 0)) {
    return addToStack(item);
  }

  if (item.attributes.outside && item.attributes?.url) {
    window.open(item.attributes?.url);
    return;
  }

  if (item.attributes.url) {
    window.location.href = item.attributes.url;
  } else {
    return;
  }

  clearStack();
  close();
}

function onWindowResize() {
  menuResizeWithoutDelay.value = true;
  calculateTranslateX(isBackWithoutDelay.value ? 1 : 0);
  menuResizeWithDelay.value = false;
}

onMounted(() => {
  window.addEventListener('resize', onWindowResize);
  window.addEventListener('orientationchange', onWindowResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize);
  window.removeEventListener('orientationchange', onWindowResize);
});
</script>
