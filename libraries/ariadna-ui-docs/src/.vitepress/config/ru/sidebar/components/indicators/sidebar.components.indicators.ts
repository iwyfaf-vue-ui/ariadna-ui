import { DefaultTheme } from 'vitepress/theme';

const sidebarComponentsIndicators: DefaultTheme.SidebarItem = {
  text: 'Indicators',
  collapsed: true,
  link: '/components/indicators/',
  items: [
    {
      text: 'Badge',
      link: '/components/indicators/badge/',
    },
    {
      text: 'Spinner',
      link: '/components/indicators/spinner/',
    },
  ],
};

export default sidebarComponentsIndicators;
