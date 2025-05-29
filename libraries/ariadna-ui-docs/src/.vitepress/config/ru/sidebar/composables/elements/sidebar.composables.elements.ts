import { DefaultTheme } from 'vitepress/theme';

const sidebarComposablesElements: DefaultTheme.SidebarItem = {
  text: 'Elements',
  collapsed: true,
  link: '/composables/elements/',
  items: [
    {
      text: 'usePosition',
      link: '/composables/elements/use-position/',
    },
  ],
};

export default sidebarComposablesElements;
