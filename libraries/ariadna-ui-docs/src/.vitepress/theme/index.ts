// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { AntdTheme } from 'vite-plugin-vitepress-demo/theme';
import ViewerService from '@iwyfaf-vue-ui/ariadna-ui/ViewerService';
import ToastService from '@iwyfaf-vue-ui/ariadna-ui/ToastService';
import HomeLayout from '../layouts/HomeLayout.vue';
import CategoriesLayout from '../layouts/CategoriesLayout.vue';
import './styles/styles.scss';
import './fonts/icons/icons.css';

export default {
  extends: DefaultTheme,
  Layout: HomeLayout,

  enhanceApp({ app, router, siteData }) {
    app.use(ViewerService);
    app.use(ToastService);

    app.component('categories', CategoriesLayout);
    app.component('Demo', AntdTheme);
  },
} satisfies Theme;
