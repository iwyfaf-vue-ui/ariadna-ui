import { DefaultTheme } from 'vitepress/theme';
import sidebarComponentsIndicatorsBadge from './badge/sidebar.components.indicators.badge';

const sidebarComponentsIndicators: DefaultTheme.SidebarItem = {
  text: 'Indicators',
  collapsed: true,
  link: '/components/indicators/',
  items: [sidebarComponentsIndicatorsBadge],
};

export default sidebarComponentsIndicators;
