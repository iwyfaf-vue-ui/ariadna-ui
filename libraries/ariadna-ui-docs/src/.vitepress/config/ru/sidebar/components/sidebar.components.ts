import { DefaultTheme } from 'vitepress/theme';
import sidebarComponentsButtons from './buttons/sidebar.components.buttons';
import sidebarComponentsIndicators from './indicators/sidebar.components.indicators';

const sidebarComponents: DefaultTheme.SidebarItem[] | DefaultTheme.SidebarMulti = {
  '/components/': [sidebarComponentsIndicators, sidebarComponentsButtons],
};

export default sidebarComponents;
