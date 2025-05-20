import { DefaultTheme } from 'vitepress/theme';

const sidebarComponentsButtons: DefaultTheme.SidebarItem = {
  text: 'Buttons',
  collapsed: true,
  link: '/components/buttons/',
  items: [
    {
      text: 'Button',
      link: '/components/buttons/button/',
    },
  ],
};

export default sidebarComponentsButtons;
