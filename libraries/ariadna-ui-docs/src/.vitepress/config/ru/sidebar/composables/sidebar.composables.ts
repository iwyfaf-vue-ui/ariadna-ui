import { DefaultTheme } from 'vitepress/theme';
import sidebarComposablesElements from './elements/sidebar.composables.elements';

const sidebarComposables: DefaultTheme.SidebarItem[] | DefaultTheme.SidebarMulti = {
  '/composables/': [sidebarComposablesElements],
};

export default sidebarComposables;
