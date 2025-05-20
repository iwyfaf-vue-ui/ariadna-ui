import { DefaultTheme } from 'vitepress/theme';

const sidebarComponentsControls: DefaultTheme.SidebarItem = {
  text: 'Controls',
  collapsed: true,
  link: '/components/controls/',
  items: [
    {
      text: 'InputText',
      link: '/components/controls/input-text/',
    },
    {
      text: 'Textarea',
      link: '/components/controls/textarea/',
    },
  ],
};

export default sidebarComponentsControls;
