import { DefaultTheme } from 'vitepress/theme';

const sidebarComponentsData: DefaultTheme.SidebarItem = {
  text: 'Data',
  collapsed: true,
  link: '/components/data/',
  items: [
    {
      text: 'Timeline',
      link: '/components/data/timeline/',
    },
  ],
};

export default sidebarComponentsData;
