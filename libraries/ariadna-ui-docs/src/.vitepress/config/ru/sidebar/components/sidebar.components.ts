import { DefaultTheme } from 'vitepress/theme';
import sidebarComponentsButtons from './buttons/sidebar.components.buttons';
import sidebarComponentsIndicators from './indicators/sidebar.components.indicators';
import sidebarComponentsNavigation from './navigation/sidebar.components.navigation';

const sidebarComponents: DefaultTheme.SidebarItem[] | DefaultTheme.SidebarMulti = {
  '/components/': [
    sidebarComponentsIndicators,
    sidebarComponentsButtons,
    sidebarComponentsNavigation,
  ],
};

export default sidebarComponents;
