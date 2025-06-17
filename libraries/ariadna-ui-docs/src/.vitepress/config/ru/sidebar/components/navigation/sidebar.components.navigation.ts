import { DefaultTheme } from 'vitepress/theme';

const sidebarComponentsNavigation: DefaultTheme.SidebarItem = {
  text: 'Navigation',
  collapsed: true,
  link: '/components/navigation/',
  items: [
    {
      text: 'DesktopMenu',
      link: '/components/navigation/desktop-menu/',
    },
    {
      text: 'MobileMenu',
      link: '/components/navigation/mobile-menu/',
    },
    {
      text: 'SidebarMenu',
      link: '/components/navigation/sidebar-menu/',
    },
  ],
};

export default sidebarComponentsNavigation;
