// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import HomeLayout from '../layouts/HomeLayout.vue';
import CategoriesLayout from '../layouts/CategoriesLayout.vue';
import './styles/styles.scss';
import './styles/components/index.scss';

export default {
  extends: DefaultTheme,
  Layout: HomeLayout,

  enhanceApp({ app, router, siteData }) {
    app.component('categories', CategoriesLayout);
  },
} satisfies Theme;