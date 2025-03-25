<template>
  <div
    v-for="(themeMainGroup, themeMainGroupName) in themes['light']"
    :class="componentClasses.main"
  >
    <h2>UIKit Цвета</h2>
    <div
      v-for="(themeSubgroup, themeSubgroupName) in themeMainGroup"
      :class="componentClasses.subgroup"
    >
      <div :class="componentClasses.subgroupTitle">{{ themeSubgroupName }}</div>
      <div
        v-for="(themeGroupUtilities, themeGroupUtilityName) in themeSubgroup"
        :class="componentClasses.utility"
      >
        <div :class="componentClasses.utilityTitle">{{ themeGroupUtilityName }}</div>
        <div :class="componentClasses.category">
          <div
            v-for="(themePropertyValue, themeGroupPropertiesName) in themeGroupUtilities"
            :class="componentClasses.properties"
          >
            <div :class="componentClasses.propertyItem">
              {{
                themeCssVar(
                  themeMainGroupName,
                  themeSubgroupName,
                  themeGroupUtilityName,
                  themeGroupPropertiesName,
                )
              }}
            </div>

            <div
              :style="`background-color: var(--${themeCssVar(
                themeMainGroupName,
                themeSubgroupName,
                themeGroupUtilityName,
                themeGroupPropertiesName,
              )}`"
              :class="componentClasses.propertyValue"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import themes from '~/theme/asana/theme/theme';

const themeCssVar = computed(
  () =>
    (
      themeMainGroupName: string,
      themeSubgroupName: string,
      themeGroupUtilityName: string,
      themeGroupPropertiesName: string,
    ) => {
      if (themeGroupPropertiesName === 'default' && themeGroupUtilityName === 'default') {
        return `${themeMainGroupName}-${themeSubgroupName}-${themeGroupPropertiesName}`;
      }

      if (themeGroupPropertiesName === 'default') {
        return `${themeMainGroupName}-${themeSubgroupName}-${themeGroupUtilityName}`;
      }

      return `${themeMainGroupName}-${themeSubgroupName}-${themeGroupUtilityName}-${themeGroupPropertiesName}`;
    },
);

const componentClasses = computed(() => {
  const CLASS_PREFIX = 'showcase-colors';

  return {
    main: `${CLASS_PREFIX}`,
    subgroup: `${CLASS_PREFIX}__subgroup`,
    subgroupTitle: `${CLASS_PREFIX}__subgroup-title`,
    utility: `${CLASS_PREFIX}__utility`,
    utilityTitle: `${CLASS_PREFIX}__utility-title`,
    category: `${CLASS_PREFIX}__category`,
    properties: `${CLASS_PREFIX}__properties`,
    propertyItem: `${CLASS_PREFIX}__properties-item`,
    propertyValue: `${CLASS_PREFIX}__properties-value`,
  };
});
</script>

<style lang="scss">
@use '../../../../../assets/scss/themes/asana/asana' as theme;

.showcase-colors {
  h2 {
    text-align: center;
  }

  &__subgroup {
    @include theme.grid(12);

    padding: 16px;
    text-align: center;

    &-title {
      @include theme.text-style-helper(h3);

      grid-column: span 12;
    }
  }

  &__utility {
    grid-column: span 4;
    border: 1px solid var(--color-border-default);
    border-radius: 8px;

    &-title {
      @include theme.text-style-helper(t1);

      padding: 12px 0;
      background: var(--color-background-default-medium);
    }
  }

  &__category {
    grid-column: span 3;
    text-align: center;
  }

  &__properties {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0.2rem;

    &:not(:last-child) {
      border-bottom: 1px solid var(--color-border-default);
    }

    &-value {
      display: flex;
      align-items: center;
      width: 64px;
      height: 40px;
      border: 1px solid var(--colors-utilitarian-warning-20);
      border-radius: var(--radius-10);
    }
  }
}
</style>
