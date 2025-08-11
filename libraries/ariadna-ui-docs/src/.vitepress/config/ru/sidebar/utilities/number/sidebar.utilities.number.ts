import { DefaultTheme } from 'vitepress/theme';

const sidebarUtilitiesNumber: DefaultTheme.SidebarItem = {
  text: 'Number',
  collapsed: true,
  link: '/utilities/number/',
  items: [
    {
      text: 'Clamp',
      link: '/utilities/number/clamp/',
    },
  ],
};

export default sidebarUtilitiesNumber;
