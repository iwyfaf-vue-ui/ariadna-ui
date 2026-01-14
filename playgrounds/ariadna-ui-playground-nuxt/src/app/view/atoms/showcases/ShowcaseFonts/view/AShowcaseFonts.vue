<template>
  <div :class="componentClasses.main">
    <h2 :class="componentClasses.title">UIKit Шрифты</h2>
    <div :class="componentClasses.container">
      <div v-for="(font, index) in fonts" :key="index" :class="componentClasses.card">
        <div :class="componentClasses.cardInfo">
          <h3 :class="componentClasses.cardName">{{ font.name }}</h3>
          <p :class="componentClasses.cardDetails">
            <span>Семейство: {{ font.family }}</span>
            <span>Вес: {{ font.weight }}</span>
            <span>Размер: {{ font.size }}</span>
            <span>Высота строки: {{ font.lineHeight }}</span>
          </p>
        </div>

        <div :class="componentClasses.cardPreview">
          <component
            :is="font.name.toLowerCase().includes('h') ? font.name.toUpperCase() : 'p'"
            :class="font.name.toLowerCase()"
          >
            {{ font.previewText }}
          </component>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import originalFonts from '~/../../node_modules/@iwyfaf-vue-ui/ariadna-ui/dist/styles/themes/ariadna/theme-settings/utilities/fonts.js';

const componentClasses = computed(() => {
  const CLASS_PREFIX = 'showcase-fonts';

  return {
    main: `${CLASS_PREFIX}`,
    title: `${CLASS_PREFIX}__title`,
    container: `${CLASS_PREFIX}__container`,
    card: `${CLASS_PREFIX}__card`,
    cardInfo: `${CLASS_PREFIX}__card-info`,
    cardName: `${CLASS_PREFIX}__card-name`,
    cardDetails: `${CLASS_PREFIX}__card-details`,
    cardPreview: `${CLASS_PREFIX}__card-preview`,
  };
});

const PREVIEW_TEXT =
  'UIkit предоставляет удобную систему шрифтов для создания красивых интерфейсов. ';

const fonts = Object.keys(originalFonts.size).map((key) => ({
  name: key.toUpperCase(),
  size: originalFonts.size[key][key],
  weight: originalFonts.weight[key][key],
  lineHeight: originalFonts.height[key][key],
  previewText: PREVIEW_TEXT,
}));
</script>

<style lang="scss">
@use '@iwyfaf-vue-ui/ariadna-ui/theme/Ariadna' as theme;

.showcase-fonts {
  &__title {
    @include theme.text-style-helper(h2);

    padding: 8px;
    text-align: center;
  }

  &__container {
    @include theme.grid(1);

    gap: 16px;
  }

  &__card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: var(--color-background-default-strong);
    border: 1px solid var(--color-border-default);
    border-radius: 8px;

    @include theme.lg {
      flex-direction: row;
    }

    &-info {
      flex: 1;
      padding: 16px;
      border-bottom: 1px solid var(--color-border-default);

      @include theme.lg {
        border-right: 1px solid var(--color-border-default);
        border-bottom: none;
      }
    }

    &-name {
      @include theme.text-style-helper(h3);

      margin-bottom: 16px;
    }

    &-details {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    &-preview {
      display: flex;
      flex: 1;
      padding: 32px;
    }
  }
}
</style>

<style lang="scss" scoped>
@use '@iwyfaf-vue-ui/ariadna-ui/theme/Ariadna' as theme;

.t1 {
  @include theme.text-style-helper(t1);
}

.t2 {
  @include theme.text-style-helper(t2);
}

.t3 {
  @include theme.text-style-helper(t3);
}

.t4 {
  @include theme.text-style-helper(t4);
}
</style>
