import { DefaultTheme } from 'vitepress/theme';

const sidebarComponentsPanels: DefaultTheme.SidebarItem = {
  text: 'Panels',
  collapsed: true,
  link: '/components/panels/',
  items: [
    {
      text: 'Card',
      link: '/components/panels/card/',
    },
  ],
};

export default sidebarComponentsPanels;
