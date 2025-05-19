import { DefaultTheme } from 'vitepress/theme';

const sidebarUtilitiesFunctionsDecorators: DefaultTheme.SidebarItem = {
  text: 'Functions decorators',
  collapsed: true,
  link: '/utilities/functions-decorators/',
  items: [
    {
      text: 'Debounce',
      link: '/utilities/functions-decorators/debounce/',
    },
    {
      text: 'Throttle',
      link: '/utilities/functions-decorators/throttle/',
    },
  ],
};

export default sidebarUtilitiesFunctionsDecorators;
