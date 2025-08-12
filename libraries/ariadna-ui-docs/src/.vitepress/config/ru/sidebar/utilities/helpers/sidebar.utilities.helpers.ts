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
      text: 'ToKebab',
      link: '/utilities/helpers/to-kebab/',
    },
    {
      text: 'IframeVideoHelper',
      link: '/utilities/helpers/iframe-video-helper/',
    },
  ],
};

export default sidebarUtilitiesHelpers;
