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
    {
      text: 'CamelToKebab',
      link: '/utilities/helpers/camel-to-kebab/',
    },
  ],
};

export default sidebarUtilitiesHelpers;
