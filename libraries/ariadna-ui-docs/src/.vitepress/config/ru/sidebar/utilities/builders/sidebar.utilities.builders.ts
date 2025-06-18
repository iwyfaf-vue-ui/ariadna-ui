import { DefaultTheme } from 'vitepress/theme';

const sidebarUtilitiesBuilders: DefaultTheme.SidebarItem = {
  text: 'Builders',
  collapsed: true,
  link: '/utilities/builders/',
  items: [
    {
      text: 'QueryBuilder',
      link: '/utilities/builders/query-builder/',
    },
  ],
};

export default sidebarUtilitiesBuilders;
