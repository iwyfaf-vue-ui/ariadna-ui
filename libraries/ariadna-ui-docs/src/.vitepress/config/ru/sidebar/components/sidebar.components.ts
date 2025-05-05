import { DefaultTheme } from 'vitepress/theme';
import sidebarComponentsButtons from './buttons/sidebar.components.buttons';
import sidebarComponentsIndicators from './indicators/sidebar.components.indicators';
import sidebarComponentsNavigation from './navigation/sidebar.components.navigation';
import sidebarComponentsMisc from './misc/sidebar.components.misc';

const sidebarComponents: DefaultTheme.SidebarItem[] | DefaultTheme.SidebarMulti = {
  '/components/': [
    sidebarComponentsIndicators,
    sidebarComponentsButtons,
    sidebarComponentsNavigation,
    sidebarComponentsMisc,
  ],
};

export default sidebarComponents;
