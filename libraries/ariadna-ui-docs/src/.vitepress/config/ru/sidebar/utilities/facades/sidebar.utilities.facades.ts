import { DefaultTheme } from 'vitepress/theme';

const sidebarUtilitiesFacades: DefaultTheme.SidebarItem = {
  text: 'Facades',
  collapsed: true,
  link: '/utilities/facades/',
  items: [
    {
      text: 'ThemeBuilder',
      link: '/utilities/facades/theme-builder/',
    },
  ],
};

export default sidebarUtilitiesFacades;
