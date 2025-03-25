<template>
  <div :class="componentClasses.main" :style="containerStyle">
    <h2 :class="componentClasses.title">UIKit Радиусы</h2>

    <div :class="componentClasses.container">
      <div
        v-for="(sizeGroup, groupName) in radius.default"
        :key="groupName"
        :class="componentClasses.card"
      >
        <h3 :class="componentClasses.cardTitle">{{ groupName }}</h3>
        <template v-for="(valueObj, sizeName) in sizeGroup" :key="sizeName">
          <div :class="componentClasses.cardBox" :style="{ borderRadius: valueObj }"></div>
          <div :class="componentClasses.cardValue">{{ valueObj }}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import radius from '~/theme/asana/utilities/radius.js';

const radiiCount = computed(() => {
  return Object.keys(radius.default).length;
});

const containerStyle = computed(() => {
  return { '--count': radiiCount.value };
});

const componentClasses = computed(() => {
  const CLASS_PREFIX = 'showcase-radii';

  return {
    main: `${CLASS_PREFIX}`,
    title: `${CLASS_PREFIX}__title`,
    container: `${CLASS_PREFIX}__container`,
    card: `${CLASS_PREFIX}__card`,
    cardTitle: `${CLASS_PREFIX}__card-title`,
    cardBox: `${CLASS_PREFIX}__card-box`,
    cardValue: `${CLASS_PREFIX}__card-value`,
  };
});
</script>

<style lang="scss">
@use '../../../../../assets/scss/themes/asana/asana' as theme;

.showcase-radii {
  &__title {
    @include theme.text-style-helper(h2);

    padding: 8px;
    text-align: center;
  }

  &__container {
    @include theme.grid(var(--count));

    gap: 16px;
    justify-content: center;
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

    &-box {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      background: var(--color-background-primary);
    }

    &-value {
      @include theme.text-style-helper(t3);

      padding: 8px;
      color: var(--color-text-default-weak);
      text-align: center;
    }
  }
}
</style>
