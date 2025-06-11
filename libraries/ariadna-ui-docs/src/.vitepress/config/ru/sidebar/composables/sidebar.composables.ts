import { DefaultTheme } from 'vitepress/theme';
import sidebarComposablesElements from './elements/sidebar.composables.elements';
import sidebarComposablesReactivity from './reactivity/sidebar.composables.reactivity';

const sidebarComposables: DefaultTheme.SidebarItem[] | DefaultTheme.SidebarMulti = {
  '/composables/': [sidebarComposablesElements, sidebarComposablesReactivity],
};

export default sidebarComposables;
