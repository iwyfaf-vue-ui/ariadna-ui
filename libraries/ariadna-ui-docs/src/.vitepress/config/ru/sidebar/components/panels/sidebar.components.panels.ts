import { DefaultTheme } from 'vitepress/theme';

const sidebarComponentsPanels: DefaultTheme.SidebarItem = {
  text: 'Panels',
  collapsed: true,
  link: '/components/panels/',
  items: [
    {
      text: 'Accordion',
      link: '/components/panels/accordion/',
    },
    {
      text: 'Card',
      link: '/components/panels/card/',
    },
  ],
};

export default sidebarComponentsPanels;
