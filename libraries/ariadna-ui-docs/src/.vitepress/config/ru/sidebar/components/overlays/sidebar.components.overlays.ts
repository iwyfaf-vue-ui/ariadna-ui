import { DefaultTheme } from 'vitepress/theme';

const sidebarComponentsOverlays: DefaultTheme.SidebarItem = {
  text: 'Overlays',
  collapsed: true,
  link: '/components/overlays/',
  items: [
    {
      text: 'Dialog',
      link: '/components/overlays/dialog/',
    },
    {
      text: 'Dropbox',
      link: '/components/overlays/dropbox/',
    },
    {
      text: 'Toast',
      link: '/components/overlays/toast/',
    },
  ],
};

export default sidebarComponentsOverlays;
