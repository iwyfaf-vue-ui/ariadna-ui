import { DefaultTheme } from 'vitepress/theme';
import sidebarComponentsButtons from './buttons/sidebar.components.buttons';

const sidebarComponents: DefaultTheme.SidebarItem[] | DefaultTheme.SidebarMulti = {
  '/components/': [sidebarComponentsButtons],
};

export default sidebarComponents;
