import { DefaultTheme } from 'vitepress/theme';

const sidebarUtilitiesHelpers: DefaultTheme.SidebarItem = {
  text: 'Helpers',
  collapsed: true,
  link: '/utilities/helpers/',
  items: [
    {
      text: 'Capitalize',
      link: '/utilities/helpers/capitalize/',
    },
  ],
};

export default sidebarUtilitiesHelpers;
