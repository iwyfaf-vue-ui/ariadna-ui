import { DefaultTheme } from 'vitepress/theme';
import sidebarComponentsIndicatorsSidebarMenu from './sidebar-menu/sidebar.components.indicators.sidebar-menu';

const sidebarComponentsNavigation: DefaultTheme.SidebarItem = {
  text: 'Navigation',
  collapsed: true,
  link: '/components/navigation/',
  items: [sidebarComponentsIndicatorsSidebarMenu],
};

export default sidebarComponentsNavigation;
