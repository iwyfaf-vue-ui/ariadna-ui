import { DefaultTheme } from 'vitepress/theme';

const sidebarComposablesReactivity: DefaultTheme.SidebarItem = {
  text: 'Reactivity',
  collapsed: true,
  link: '/composables/reactivity/',
  items: [
    {
      text: 'useDelayedValue',
      link: '/composables/reactivity/use-delayed-value/',
    },
  ],
};

export default sidebarComposablesReactivity;
