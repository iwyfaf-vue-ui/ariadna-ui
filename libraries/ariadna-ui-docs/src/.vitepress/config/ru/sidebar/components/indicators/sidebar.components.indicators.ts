import { DefaultTheme } from 'vitepress/theme';
import sidebarComponentsIndicatorsBadge from './badge/sidebar.components.indicators.badge';
import sidebarComponentsIndicatorsSpinner from './spinner/sidebar.components.indicators.spinner';

const sidebarComponentsIndicators: DefaultTheme.SidebarItem = {
  text: 'Indicators',
  collapsed: true,
  link: '/components/indicators/',
  items: [sidebarComponentsIndicatorsBadge, sidebarComponentsIndicatorsSpinner],
};

export default sidebarComponentsIndicators;
