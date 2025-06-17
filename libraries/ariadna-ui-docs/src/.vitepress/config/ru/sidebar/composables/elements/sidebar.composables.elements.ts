import { DefaultTheme } from 'vitepress/theme';

const sidebarComposablesElements: DefaultTheme.SidebarItem = {
  text: 'Elements',
  collapsed: true,
  link: '/composables/elements/',
  items: [
    {
      text: 'useDragViewport',
      link: '/composables/elements/use-drag-viewport/',
    },
    {
      text: 'useElementSize',
      link: '/composables/elements/use-element-size/',
    },
    {
      text: 'useOrderedElements',
      link: '/composables/elements/use-ordered-elements/',
    },
    {
      text: 'usePosition',
      link: '/composables/elements/use-position/',
    },
  ],
};

export default sidebarComposablesElements;
