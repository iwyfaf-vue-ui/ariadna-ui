// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { AntdTheme } from 'vite-plugin-vitepress-demo/theme';
import HomeLayout from '../layouts/HomeLayout.vue';
import CategoriesLayout from '../layouts/CategoriesLayout.vue';
import './styles/styles.scss';

export default {
  extends: DefaultTheme,
  Layout: HomeLayout,

  enhanceApp({ app, router, siteData }) {
    app.component('categories', CategoriesLayout);
    app.component('Demo', AntdTheme);
  },
} satisfies Theme;
