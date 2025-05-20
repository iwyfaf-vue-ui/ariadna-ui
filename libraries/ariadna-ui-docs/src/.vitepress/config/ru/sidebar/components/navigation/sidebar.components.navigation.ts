import { DefaultTheme } from 'vitepress/theme';

const sidebarComponentsNavigation: DefaultTheme.SidebarItem = {
  text: 'Navigation',
  collapsed: true,
  link: '/components/navigation/',
  items: [
    {
      text: 'SidebarMenu',
      link: '/components/navigation/sidebar-menu/',
    },
  ],
};

export default sidebarComponentsNavigation;
