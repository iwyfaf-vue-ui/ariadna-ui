<template>
  <div :class="componentClasses.main">
    <h2 :class="componentClasses.title">UIKit Отступы</h2>

    <div :class="componentClasses.card">
      <h3 :class="componentClasses.cardTitle">Paddings</h3>
      <div :class="componentClasses.container">
        <div
          v-for="(value, key) in indents.padding"
          :key="'padding-' + key"
          :class="componentClasses.item"
        >
          <div :class="componentClasses.itemLabel">{{ key }}</div>
          <div
            :class="componentClasses.itemBox"
            :style="{ padding: value[key as keyof typeof value] }"
          >
            <div :class="componentClasses.itemInner"></div>
          </div>
        </div>
      </div>
    </div>

    <div :class="componentClasses.card">
      <h3 :class="componentClasses.cardTitle">Margins</h3>
      <div :class="componentClasses.container">
        <div
          v-for="(value, key) in indents.margin"
          :key="'margin-' + key"
          :class="componentClasses.item"
        >
          <div :class="componentClasses.itemLabel">{{ key }}</div>
          <div :class="componentClasses.itemBox">
            <div :style="{ margin: value[key as keyof typeof value] }">
              <div :class="componentClasses.itemInner"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import indents from '~/../../node_modules/@iwyfaf-vue-ui/ariadna-ui/dist/styles/themes/ariadna/theme-settings/utilities/indents.js';

const componentClasses = computed(() => {
  const CLASS_PREFIX = 'showcase-indents';

  return {
    main: `${CLASS_PREFIX}`,
    title: `${CLASS_PREFIX}__title`,
    card: `${CLASS_PREFIX}__card`,
    cardTitle: `${CLASS_PREFIX}__card-title`,
    container: `${CLASS_PREFIX}__container`,
    item: `${CLASS_PREFIX}__item`,
    itemLabel: `${CLASS_PREFIX}__item-label`,
    itemBox: `${CLASS_PREFIX}__item-box`,
    itemInner: `${CLASS_PREFIX}__item-inner`,
  };
});
</script>

<style lang="scss">
@use '@iwyfaf-vue-ui/ariadna-ui/theme/Ariadna' as theme;

.showcase-indents {
  &__title {
    @include theme.text-style-helper(h2);

    padding: 8px;
    text-align: center;
  }

  &__card {
    padding: 16px;
    margin-bottom: 16px;
    background: var(--color-background-default-medium);
    border: 1px solid var(--color-border-default);
    border-radius: 8px;

    &-title {
      @include theme.text-style-helper(h3);

      margin-bottom: 8px;
      text-align: center;
    }
  }

  &__container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    width: 100px;

    &-label {
      color: var(--color-text-default-weak);
    }

    &-box {
      position: relative;
      background-color: #e0f7fa;
      border: 1px dashed #00838f;
    }

    &-inner {
      width: 50px;
      height: 50px;
      background-color: #b3e5fc;
      border: 1px solid #0288d1;
    }
  }
}
</style>
