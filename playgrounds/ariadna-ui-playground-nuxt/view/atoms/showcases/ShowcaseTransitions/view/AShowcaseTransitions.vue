<template>
  <div :class="componentClasses.main">
    <h2 :class="componentClasses.title">UIKit Transition</h2>

    <div :class="componentClasses.container">
      <div
        v-for="(transitionGroup, groupName) in transition"
        :key="groupName"
        :class="componentClasses.group"
      >
        <h3>{{ groupName }}</h3>
        <div
          v-for="(transitionItem, transitionName) in transitionGroup"
          :key="transitionName"
          :class="componentClasses.item"
        >
          <div :class="componentClasses.itemInfo">
            <span :class="componentClasses.itemName">{{ transitionName }}</span>
            <span :class="componentClasses.itemInfo">{{ Object.values(transitionItem)[0] }}</span>
          </div>
          <div :class="componentClasses.itemDemo">
            <div
              :class="componentClasses.itemIndicator"
              :style="{
                transition: `all ${Object.values(transitionItem)[0]}`,
                transform: isAnimating ? 'translateX(calc(20px - 100%))' : 'translateX(0)',
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import transition from '~/theme/asana/utilities/transition.js';

const componentClasses = computed(() => {
  const CLASS_PREFIX = 'showcase-transitions';

  return {
    main: `${CLASS_PREFIX}`,
    title: `${CLASS_PREFIX}__title`,
    container: `${CLASS_PREFIX}__container`,
    group: `${CLASS_PREFIX}__group`,
    item: `${CLASS_PREFIX}__item`,
    itemInfo: `${CLASS_PREFIX}__item-info`,
    itemName: `${CLASS_PREFIX}__item-name`,
    itemValue: `${CLASS_PREFIX}__item-value`,
    itemDemo: `${CLASS_PREFIX}__item-demo`,
    itemIndicator: `${CLASS_PREFIX}__item-indicator`,
  };
});

const isAnimating = ref(false);
let animationInterval;

const toggleAnimation = () => {
  isAnimating.value = !isAnimating.value;
};

onMounted(() => {
  isAnimating.value = true;

  animationInterval = setInterval(toggleAnimation, 1000);
});

onBeforeUnmount(() => {
  clearInterval(animationInterval);
});
</script>

<style lang="scss">
@use '../../../../../assets/scss/themes/asana/asana' as theme;

.showcase-transitions {
  &__title {
    @include theme.text-style-helper(h2);

    padding: 8px;
    text-align: center;
  }

  &__container {
    @include theme.grid(2, 4, 6, 8, 12);

    background: var(--color-background-default-medium);
    border: 1px solid var(--color-border-default);
  }

  &__group {
    @include theme.column-offset('1/ 3', '2/ 4', '3 / 5', '3 / 7', '5 / 9');

    h3 {
      padding: 8px;
      text-align: center;
    }
  }

  &__item {
    margin-bottom: 16px;

    &-info {
      @include theme.text-style-helper(t3);

      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
      color: var(--color-text-default-weak);
    }

    &-demo {
      position: relative;
      height: 40px;
      overflow: hidden;
      background-color: var(--color-background-default-weak);
      border-radius: 4px;
    }

    &-indicator {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--color-background-primary);
      transform: translateX(0);
    }
  }
}
</style>
